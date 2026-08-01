import React from "react";
import { Link } from "react-router-dom";

const BannerBoxV2 = ({img,link,title,price,info}) => {
    return(
        <div className="w-[90%] h-[235px] rounded-[5px] overflow-hidden relative group/banner">
            <img className="w-full h-full transition-transform duration-150 group-hover/banner:scale-105" src={img} alt="banner" loading="lazy" />
            <div className={`absolute top-0 w-[56%] h-full flex flex-col z-50 items-center justify-center ${info === 'left' ? 'left-0 pl-[15px]' : 'right-0'}`}>
                <h2 className="text-[18px] font-semibold animate-subtitle">{title}</h2>
                <span className="text-[25px] font-semibold w-full text-[#ff5252] animate-price">{price}</span> 
                <div className="w-full animate-btn">
                    <Link className="text-[16px] font-semibold text-black !underline hover:!text-[#ff5252]" to={link}>SHOP NOW</Link>
                </div>
            </div>
        </div>
    )
}

export default BannerBoxV2;