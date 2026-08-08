import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const API_URL = import.meta.env.VITE_API_URL || '';

const Search = () => {
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
          setSuggestions(data.slice(0, 5)); // show top 5 suggestions
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
    <div ref={searchRef} className="w-[80%] h-[50px] bg-[#e5e5e5] rounded-[5px] relative p-2 box-border z-[100]">
      <input
        type="text"
        id="search"
        name="search"
        placeholder="Search for products..."
        className="w-full h-[35px] p-2 text-[15px] bg-transparent border-none outline-none box-border placeholder-[#1f1f1f]"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
        onKeyDown={handleKeyPress}
      />
      <Button className="!absolute !top-2 !right-[5px] z-50 !w-[37px] !min-w-[37px] !h-[37px] !rounded-full !text-black" onClick={handleSearch}>
        <FaSearch className="text-[22px] text-[#4e4e4e]" />
      </Button>

      {showDropdown && query.trim() && (
        <div className="absolute top-[55px] left-0 w-full bg-white shadow-lg rounded-[5px] overflow-hidden flex flex-col z-[1000] border border-gray-200">
          {loading ? (
            <div className="p-4 flex justify-center"><CircularProgress size={24} /></div>
          ) : suggestions.length > 0 ? (
            suggestions.map((p) => (
              <div
                key={p._id}
                className="p-3 border-b border-gray-100 flex items-center gap-3 cursor-pointer hover:bg-blue-50 transition-colors"
                onClick={() => handleSuggestionClick(p._id)}
              >
                <img src={p.images && p.images.length > 0 ? p.images[0] : 'https://via.placeholder.com/40'} alt={p.name} className="w-[40px] h-[40px] object-cover rounded" />
                <div className="flex flex-col">
                  <span className="text-[14px] font-medium text-gray-800 line-clamp-1">{p.name}</span>
                  <span className="text-[13px] text-blue-600 font-bold">${p.price}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500 text-[14px]">No products found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
