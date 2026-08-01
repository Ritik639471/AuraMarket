import React from 'react';
import { Link } from 'react-router-dom';

const BannerBox = ({ img, link }) => {
  return (
    <div className="overflow-hidden rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.408)] transition-transform duration-300 ease-in-out m-2.5 group/banner">
      <Link to={link} className="block w-full h-full">
        <img src={img} alt="banner" className="w-full h-auto block transition-transform duration-400 ease-in-out group-hover/banner:scale-105 group-hover/banner:rotate-2" />
      </Link>
    </div>
  );
};

export default BannerBox;
