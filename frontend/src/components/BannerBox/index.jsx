import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const BannerBox = ({ img, link }) => {
  return (
    <div className="banner-box">
      <Link to={link} className="banner-link">
        <img src={img} alt="banner" className="banner-img" />
      </Link>
    </div>
  );
};

export default BannerBox;
