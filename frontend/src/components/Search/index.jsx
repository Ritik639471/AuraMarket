import React from 'react';
import Button from '@mui/material/Button';
import { FaSearch } from "react-icons/fa";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Search = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/products?search=${query.trim()}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="searchBox">
      <input
        type="text"
        placeholder="Search for products..."
        className="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <Button className="search-btn" onClick={handleSearch}>
        <FaSearch className="search-icon" />
      </Button>
    </div>
  );
};

export default Search;
