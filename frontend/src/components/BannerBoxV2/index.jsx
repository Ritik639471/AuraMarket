import React from "react";
import './style.css';
import { Link } from "react-router-dom";

const BannerBoxV2 = ({img,link,title,price,info}) => {
    return(
        <div className="banner-box-v2">
            <img className="banner-img" src={img} />
            <div className={`banner-detail ${info === 'left' ? 'banner-detail-left' : 'banner-detail-right'}`}>
                <h2 className="banner-title">{title}</h2>
                <span className="banner-price">{price}</span> 
                <div className="banner-btn">
                    <Link className="link banner-link" to={link}>SHOP NOW</Link>
                </div>
            </div>
        </div>
    )
}

export default BannerBoxV2;