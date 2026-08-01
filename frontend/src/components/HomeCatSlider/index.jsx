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
    <div className="overflow-visible py-4">
      <div className="w-[90%] mx-auto">
        {categories.length > 0 && (
          <Swiper
            slidesPerView={Math.min(8, categories.length)}
            spaceBetween={10}
            navigation={true}
            loop={categories.length > 8}
            modules={[Navigation]}
            className="[&_.swiper-button-prev]:w-[30px] [&_.swiper-button-prev]:h-[30px] [&_.swiper-button-prev]:min-w-[30px] [&_.swiper-button-prev]:after:text-[21px] [&_.swiper-button-next]:w-[30px] [&_.swiper-button-next]:h-[30px] [&_.swiper-button-next]:min-w-[30px] [&_.swiper-button-next]:after:text-[21px]"
          >
            {categories.map((category, index) => (
              <SwiperSlide key={index}>
                <Link to={`/products?search=${encodeURIComponent(category.name)}`} className="no-underline">
                  <div className="py-7 px-3 bg-white border border-black/10 text-center flex flex-col items-center justify-center rounded transition-transform duration-300 ease-in-out group/cat h-[140px]">
                    <img
                      src={
                        category.image ||
                        "https://via.placeholder.com/60?text=No+Image"
                      }
                      alt={category.name}
                      className="w-[60px] h-[60px] object-contain transition-transform duration-300 ease-in-out group-hover/cat:scale-110"
                      loading="lazy"
                    />
                    <h3 className="mt-3 text-[14px] font-medium text-black line-clamp-1">{category.name}</h3>
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
