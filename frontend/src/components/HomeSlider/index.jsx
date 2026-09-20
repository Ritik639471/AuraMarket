import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { FALLBACK_IMAGE } from '../ImageUpload';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HomeSlider = ({ ads = [] }) => {
  const slides = ads.length > 0 ? ads : [
    {
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
      link: "/products?category=Fashion",
      title: "Discover Aura Collections",
      description: "Exclusive designer fashion and modern luxury apparel with worldwide shipping."
    },
    {
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80",
      link: "/products?category=Fashion",
      title: "Season Launch Sale",
      description: "Up to 50% discount on new seasonal arrivals and trending fashion essentials."
    },
    {
      image: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&w=1200&q=80",
      link: "/products?category=Electronics",
      title: "Tech Week Deals",
      description: "Cutting-edge gadgets, headphones, and verified smart accessories."
    }
  ];

  return (
    <div className='py-3 sm:py-5'>
      <div className="w-[95%] max-w-[1550px] h-[220px] sm:h-[300px] md:h-[380px] lg:h-[420px] mx-auto">
        <Swiper
          spaceBetween={12}
          navigation={true}
          pagination={{ clickable: true, dynamicBullets: true }}
          loop={slides.length > 1}
          modules={[Navigation, Autoplay, Pagination]}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          className="w-full h-full rounded-[20px] overflow-hidden [&_.swiper-button-prev]:!hidden sm:[&_.swiper-button-prev]:!flex [&_.swiper-button-prev]:!w-[36px] [&_.swiper-button-prev]:!h-[36px] [&_.swiper-button-prev]:after:!text-[18px] [&_.swiper-button-prev]:!bg-white/90 [&_.swiper-button-prev]:!rounded-full [&_.swiper-button-prev]:!shadow-md [&_.swiper-button-prev]:!text-slate-900 [&_.swiper-button-next]:!hidden sm:[&_.swiper-button-next]:!flex [&_.swiper-button-next]:!w-[36px] [&_.swiper-button-next]:!h-[36px] [&_.swiper-button-next]:after:!text-[18px] [&_.swiper-button-next]:!bg-white/90 [&_.swiper-button-next]:!rounded-full [&_.swiper-button-next]:!shadow-md [&_.swiper-button-next]:!text-slate-900"
        >
          {slides.map((slide, idx) => (
            <SwiperSlide key={slide._id || idx}>
              <div className='rounded-[20px] overflow-hidden w-full h-full relative bg-gradient-to-r from-slate-950 via-slate-900 to-[#111c30] shadow-md border border-slate-800/80 flex flex-row items-center justify-between'>
                {/* Ambient Soft Mesh Glow */}
                <div
                  className="absolute inset-0 bg-cover bg-center blur-3xl opacity-25 scale-125 pointer-events-none"
                  style={{ backgroundImage: `url(${slide.image || FALLBACK_IMAGE})` }}
                />

                {/* Left Side: Rich Hero Messaging & CTAs */}
                <div className='w-[60%] sm:w-[55%] h-full flex flex-col justify-center items-start pl-5 pr-2 sm:px-8 md:px-14 py-4 sm:py-6 md:py-8 z-20'>
                  <span className='inline-flex items-center gap-1 text-[9px] sm:text-[11px] font-black uppercase tracking-wider text-white bg-[#ff5252] px-2.5 py-0.5 sm:py-1 rounded-full shadow-sm mb-1.5 sm:mb-2.5'>
                    🔥 Special Spotlight
                  </span>
                  <h1 className="text-base sm:text-2xl md:text-3xl lg:text-[38px] font-black text-white leading-tight mb-1.5 sm:mb-2 drop-shadow-md line-clamp-2">
                    {slide.title || "Elevate Your Lifestyle & Tech"}
                  </h1>
                  <p className="hidden sm:block text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed mb-4 line-clamp-2 max-w-lg">
                    {slide.description || "Discover verified premium products with exclusive promotional discounts and express global shipping."}
                  </p>
                  <div className="flex items-center gap-2 sm:gap-3 mt-1 sm:mt-0">
                    <Link
                      to={slide.link || "/products"}
                      className="bg-[#ff5252] hover:bg-[#e34e4e] text-white text-[11px] sm:text-xs md:text-sm font-extrabold px-3.5 sm:px-5 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl shadow-md shadow-red-500/25 transition-all no-underline inline-flex items-center gap-1"
                    >
                      Shop Now →
                    </Link>
                    <Link
                      to="/products"
                      className="hidden md:inline-flex bg-white/10 hover:bg-white/20 text-white text-xs md:text-sm font-bold px-4 py-2.5 rounded-xl backdrop-blur-md border border-white/20 transition-all no-underline"
                    >
                      All Deals
                    </Link>
                  </div>
                </div>

                {/* Right Side: 100% Full Uncropped Hero Visual */}
                <div className='w-[40%] sm:w-[45%] h-full flex items-center justify-center p-3 sm:p-6 md:p-8 relative z-20'>
                  <div className="absolute w-[140px] h-[140px] sm:w-[220px] sm:h-[220px] rounded-full bg-red-500/10 blur-2xl pointer-events-none" />
                  <Link to={slide.link || "/products"} className="w-full h-full flex items-center justify-center">
                    <img
                      src={slide.image || FALLBACK_IMAGE}
                      alt={slide.title || "Banner"}
                      onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
                      className='max-h-[160px] sm:max-h-[240px] md:max-h-[320px] max-w-[95%] w-auto h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] transition-transform duration-500 hover:scale-105'
                      loading="lazy"
                    />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HomeSlider;