import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const API_URL = import.meta.env.VITE_API_URL || '';

const Search = ({ id = 'site-search' }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query.trim()) {
        setSuggestions([]);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/products/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setSuggestions(Array.isArray(data) ? data.slice(0, 5) : []); // show top 5 suggestions
        }
      } catch (err) {
        console.error("Search error:", err);
      }
      setLoading(false);
    };

    const delayDebounce = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (query.trim()) {
      setShowDropdown(false);
      navigate(`/products?search=${query.trim()}`);
    }
  };

  const handleSuggestionClick = (productId) => {
    setShowDropdown(false);
    navigate(`/product/${productId}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div ref={searchRef} className="w-full max-w-[540px] h-[46px] bg-slate-100/90 dark:bg-slate-800/90 hover:bg-slate-100 dark:hover:bg-slate-800 focus-within:bg-white dark:focus-within:bg-slate-900 rounded-full relative px-4 flex items-center border border-slate-200 dark:border-slate-700 focus-within:border-[#ff5252] focus-within:ring-4 focus-within:ring-red-500/10 transition-all duration-200 z-[100] shadow-sm">
      <input
        type="text"
        id={id}
        name={id}
        placeholder="Search for luxury watches, sneakers, phones..."
        className="w-full h-full pr-11 text-[13.5px] font-medium text-slate-800 dark:text-slate-100 bg-transparent border-none outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
        onKeyDown={handleKeyPress}
      />
      <button
        type="button"
        className="absolute right-1 w-9 h-9 rounded-full bg-[#ff5252] hover:bg-[#e34e4e] text-white flex items-center justify-center transition-all hover:scale-105 shadow-sm cursor-pointer border-none"
        onClick={handleSearch}
      >
        <FaSearch className="text-[13px]" />
      </button>

      {showDropdown && query.trim() && (
        <div className="absolute top-[52px] left-0 w-full bg-white dark:bg-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.18)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] rounded-2xl overflow-hidden flex flex-col z-[9999] border border-slate-200 dark:border-slate-800">
          {loading ? (
            <div className="p-5 flex justify-center bg-white dark:bg-slate-900"><CircularProgress size={24} sx={{ color: '#ff5252' }} /></div>
          ) : suggestions.length > 0 ? (
            suggestions.map((p) => (
              <div
                key={p._id}
                className="p-3 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3.5 cursor-pointer transition-colors"
                onClick={() => handleSuggestionClick(p._id)}
              >
                <img 
                  src={p.images && p.images.length > 0 ? p.images[0] : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=100&q=80'} 
                  alt={p.name} 
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=100&q=80'; }}
                  className="w-[44px] h-[44px] object-contain rounded-lg p-1 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shrink-0" 
                />
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-[13.5px] font-semibold text-slate-800 dark:text-slate-100 line-clamp-1 group-hover:text-[#ff5252] transition-colors">{p.name}</span>
                  <span className="text-[13px] text-[#ff5252] font-black">${p.price}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 bg-white dark:bg-slate-900 text-center text-slate-500 dark:text-slate-400 text-[13.5px] font-medium">No products found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
