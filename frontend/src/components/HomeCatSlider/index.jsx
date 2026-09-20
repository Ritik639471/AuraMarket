import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';

const API_URL = import.meta.env.VITE_API_URL || '';

const HomeCatSlider = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/categories`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Failed to load categories", err));
  }, []);

  return (
    <div className="py-4">
      <div className="w-[95%] max-w-[1550px] mx-auto">
        <div className="flex items-center justify-between mb-3 px-1">
          <div>
            <h3 className="text-lg md:text-xl font-black text-slate-900 m-0">
              Shop by Department
            </h3>
            <p className="text-xs text-slate-500 m-0 mt-0.5">Explore our most popular curated collections</p>
          </div>
          <Link to="/products" className="text-xs font-bold text-[#ff5252] hover:underline no-underline">
            All Categories →
          </Link>
        </div>
        {categories.length > 0 && (
          <Swiper
            slidesPerView={2.5}
            spaceBetween={12}
            navigation={categories.length > 7}
            modules={[Navigation]}
            breakpoints={{
              320: { slidesPerView: 2.5, spaceBetween: 10 },
              480: { slidesPerView: 3.5, spaceBetween: 12 },
              640: { slidesPerView: 4.5, spaceBetween: 14 },
              768: { slidesPerView: 5.5, spaceBetween: 14 },
              1024: { slidesPerView: 7, spaceBetween: 16 },
              1280: { slidesPerView: Math.min(8, categories.length), spaceBetween: 16 }
            }}
            className="w-full py-1 [&_.swiper-button-prev]:w-[32px] [&_.swiper-button-prev]:h-[32px] [&_.swiper-button-prev]:min-w-[32px] [&_.swiper-button-prev]:after:text-[18px] [&_.swiper-button-next]:w-[32px] [&_.swiper-button-next]:h-[32px] [&_.swiper-button-next]:min-w-[32px] [&_.swiper-button-next]:after:text-[18px]"
          >
            {categories.map((category, index) => (
              <SwiperSlide key={index} className="py-2">
                <Link to={`/products?category=${encodeURIComponent(category.name)}`} className="no-underline block">
                  <div className="py-4 px-3 bg-white rounded-2xl border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_24px_rgba(255,82,82,0.12)] hover:border-red-100 transition-all duration-300 ease-out hover:-translate-y-1.5 flex flex-col items-center justify-center group/cat">
                    <div className="relative w-[68px] h-[68px] rounded-full p-0.5 bg-gradient-to-tr from-slate-100 via-white to-red-100/60 group-hover/cat:from-[#ff5252]/30 group-hover/cat:to-red-200 transition-all duration-300 shadow-inner">
                      <img
                        src={category.image || "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=200&q=80"}
                        alt={category.name}
                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=200&q=80"; }}
                        className="w-full h-full rounded-full object-cover shadow-sm transition-transform duration-300 ease-in-out group-hover/cat:scale-105"
                        width="68"
                        height="68"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="mt-2.5 text-[12.5px] font-bold text-slate-700 group-hover/cat:text-[#ff5252] transition-colors line-clamp-1">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default HomeCatSlider;
