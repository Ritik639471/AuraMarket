import React from 'react';
import Button from '@mui/material/Button';
import { FaSearch } from "react-icons/fa";
import './style.css';

const Search = () => {
  return (
    <div className="searchBox">
      <input
        type="text"
        placeholder="Search for products..."
        className="search-input"
      />
      <Button className="search-btn">
        <FaSearch className="search-icon" />
      </Button>
    </div>
  );
};

export default Search;
