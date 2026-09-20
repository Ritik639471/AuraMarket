import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { FALLBACK_IMAGE } from '../ImageUpload';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HomeSliderV2 = ({ featuredProducts = [] }) => {
  const items = featuredProducts.length > 0 ? featuredProducts : [];

  if (items.length === 0) {
    return null;
  }

  return (
    <Swiper
      spaceBetween={20}
      effect={'fade'}
      navigation={true}
      loop={items.length > 1}
      pagination={{ clickable: true, dynamicBullets: true }}
      modules={[EffectFade, Navigation, Pagination, Autoplay]}
      autoplay={{
        delay: 4500,
        disableOnInteraction: false,
      }}
      className="w-full rounded-[20px] overflow-hidden [&_.swiper-button-prev]:!hidden sm:[&_.swiper-button-prev]:!flex [&_.swiper-button-prev]:!w-[34px] [&_.swiper-button-prev]:!h-[34px] [&_.swiper-button-prev]:after:!text-[16px] [&_.swiper-button-prev]:!bg-white/90 [&_.swiper-button-prev]:!rounded-full [&_.swiper-button-prev]:!shadow-sm [&_.swiper-button-next]:!hidden sm:[&_.swiper-button-next]:!flex [&_.swiper-button-next]:!w-[34px] [&_.swiper-button-next]:!h-[34px] [&_.swiper-button-next]:after:!text-[16px] [&_.swiper-button-next]:!bg-white/90 [&_.swiper-button-next]:!rounded-full [&_.swiper-button-next]:!shadow-sm"
    >
      {items.map((prod) => (
        <SwiperSlide key={prod._id}>
          <div className='rounded-[20px] overflow-hidden relative w-full h-[280px] sm:h-[340px] md:h-[420px] bg-gradient-to-r from-slate-50 via-white to-gray-50 border border-slate-200/90 shadow-sm flex flex-row items-center'>
            
            {/* Left Side: Product Details */}
            <div className='w-[60%] sm:w-[55%] h-full flex flex-col items-start justify-center pl-5 pr-2 sm:px-8 md:px-12 py-4 sm:py-8 z-20'>
              <span className='inline-flex items-center gap-1 text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-[#ff5252] bg-red-50 border border-red-200/60 px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full mb-1.5 sm:mb-3'>
                ★ Featured {prod.category || 'Deal'}
              </span>
              <h2 className="w-full m-0 text-base sm:text-2xl md:text-[30px] font-black mb-1 sm:mb-2 text-slate-900 leading-tight line-clamp-2">
                {prod.name}
              </h2>
              <p className="hidden sm:block text-slate-600 text-xs sm:text-[13px] md:text-[14px] leading-relaxed mb-3 sm:mb-4 line-clamp-2 max-w-md">
                {prod.description}
              </p>
              <div className="flex items-baseline gap-2 sm:gap-3 mb-2.5 sm:mb-5">
                <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-slate-400">Price</span>
                <span className="text-[#ff5252] text-xl sm:text-2xl md:text-[30px] font-black">${prod.price}</span>
                {prod.oldPrice && (
                  <span className="text-slate-400 line-through text-xs sm:text-[15px] font-medium">${prod.oldPrice}</span>
                )}
              </div>
              <Button
                component={Link}
                to={`/product/${prod._id}`}
                variant="contained"
                sx={{
                  backgroundColor: '#ff5252',
                  '&:hover': { backgroundColor: '#e34e4e' },
                  borderRadius: '9px',
                  px: { xs: 2.5, sm: 3.5, md: 4 },
                  py: { xs: 0.8, sm: 1, md: 1.2 },
                  fontWeight: 700,
                  textTransform: 'none',
                  fontSize: { xs: '12px', sm: '14px' },
                  boxShadow: '0 4px 12px rgba(255, 82, 82, 0.25)'
                }}
              >
                Shop Now
              </Button>
            </div>

            {/* Right Side: Product Image (100% full uncropped image) */}
            <div className='w-[40%] sm:w-[45%] h-full flex items-center justify-center p-3 sm:p-6 md:p-8 relative'>
              <div className="absolute w-[140px] h-[140px] sm:w-[220px] sm:h-[220px] md:w-[280px] md:h-[280px] rounded-full bg-slate-100 blur-2xl pointer-events-none" />
              <Link to={`/product/${prod._id}`} className="w-full h-full flex items-center justify-center relative z-10">
                <img
                  src={prod.images?.[0] || FALLBACK_IMAGE}
                  alt={prod.name}
                  onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
                  className="max-h-[160px] sm:max-h-[220px] md:max-h-[300px] max-w-[90%] w-auto h-auto object-contain drop-shadow-sm transition-all duration-500 hover:scale-105"
                  width="300"
                  height="300"
                  loading="lazy"
                />
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HomeSliderV2;
