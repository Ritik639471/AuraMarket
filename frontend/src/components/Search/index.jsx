import React from 'react';
import Button from '@mui/material/Button';
import { FaSearch } from "react-icons/fa";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="w-[80%] h-[50px] bg-[#e5e5e5] rounded-[5px] relative p-2 box-border">
      <input
        type="text"
        placeholder="Search for products..."
        className="w-full h-[35px] p-2 text-[15px] bg-transparent border-none outline-none box-border placeholder-[#1f1f1f]"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <Button className="!absolute !top-2 !right-[5px] z-50 !w-[37px] !min-w-[37px] !h-[37px] !rounded-full !text-black" onClick={handleSearch}>
        <FaSearch className="text-[22px] text-[#4e4e4e]" />
      </Button>
    </div>
  );
};

export default Search;
