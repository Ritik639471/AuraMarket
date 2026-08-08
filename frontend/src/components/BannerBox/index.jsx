import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const BannerBox = ({ img, link, title, price, info }) => {
  return (
    <div className={`overflow-hidden group/banner ${title ? 'w-full h-[235px] rounded-[5px] relative mx-auto' : 'rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.408)] transition-transform duration-300 ease-in-out m-2.5'}`}>
      <Link to={link} className="block w-full h-full relative">
        <img src={img} alt="banner" className={`w-full block transition-transform ease-in-out object-cover ${title ? 'h-full duration-150 group-hover/banner:scale-105' : 'h-auto duration-400 group-hover/banner:scale-105 group-hover/banner:rotate-2'}`} loading="lazy" />
        {title && (
            <div className={`absolute top-0 w-[56%] h-full flex flex-col z-10 items-center justify-center ${info === 'left' ? 'left-0 pl-[15px]' : 'right-0'}`}>
                <h2 className="text-[18px] font-semibold text-black mb-1">{title}</h2>
                <span className="text-[25px] font-semibold w-full text-[#ff5252]">{price}</span> 
                <div className="w-full mt-2">
                    <span className="text-[16px] font-semibold text-black underline hover:text-[#ff5252]">SHOP NOW</span>
                </div>
            </div>
        )}
      </Link>
    </div>
  );
};

export default memo(BannerBox);
