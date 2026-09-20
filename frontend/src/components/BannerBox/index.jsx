import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { FALLBACK_IMAGE } from '../ImageUpload';

const BannerBox = ({ img, link, title, price, info }) => {
  // If price is provided, render split-layout product card (details on left, uncropped product on right)
  if (price && title) {
    return (
      <div className="w-full h-[200px] rounded-[18px] overflow-hidden relative bg-gradient-to-r from-slate-50 via-white to-gray-50 border border-slate-200/90 p-5 shadow-sm group/banner transition-all duration-300 hover:shadow-md hover:border-slate-300">
        <Link to={link || '/products'} className="w-full h-full flex items-center justify-between gap-3">
          {/* Content Column: Product Details */}
          <div className="w-[56%] flex flex-col justify-center items-start z-10">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#ff5252] mb-1">
              Deal of the Day
            </span>
            <h3 className="text-[14px] md:text-[15px] font-bold text-slate-800 line-clamp-2 leading-tight mb-1">
              {title}
            </h3>
            <span className="text-[20px] font-black text-[#ff5252] mb-2">
              {price}
            </span>
            <div className="mt-1">
              <span className="inline-flex items-center text-[12px] font-bold tracking-wide text-slate-800 group-hover/banner:text-[#ff5252] transition-colors">
                SHOP NOW <span className="ml-1 text-[13px] group-hover/banner:translate-x-1 transition-transform">→</span>
              </span>
            </div>
          </div>

          {/* Product Image: 100% full, uncropped */}
          <div className="w-[44%] h-full flex items-center justify-center relative p-1">
            <div className="absolute w-[90px] h-[90px] rounded-full bg-slate-100 blur-xl pointer-events-none" />
            <img
              src={img || FALLBACK_IMAGE}
              alt={title || "banner"}
              onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
              className="max-h-[145px] max-w-full w-auto h-auto object-contain drop-shadow-sm transition-transform duration-300 group-hover/banner:scale-108"
              loading="lazy"
            />
          </div>
        </Link>
      </div>
    );
  }

  // Pure graphic ad banner: display full image cleanly
  return (
    <div className="w-full h-[200px] rounded-[18px] overflow-hidden shadow-sm transition-all duration-300 ease-in-out hover:shadow-md bg-slate-100 relative group/banner border border-slate-200/80">
      <Link to={link || '/products'} className="block w-full h-full">
        <img
          src={img || FALLBACK_IMAGE}
          alt={title || "banner"}
          onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
          className="w-full h-full object-cover group-hover/banner:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </Link>
    </div>
  );
};

export default memo(BannerBox);
