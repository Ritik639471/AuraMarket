import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

const HomeSlider = () => {
  return (
    <div className='py-4'>
      <div className="w-[95%] h-[30rem] mx-auto">
        <Swiper
          spaceBetween={10}
          navigation={true}
          loop={true}
          modules={[Navigation, Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          className="w-full h-full rounded-[20px] overflow-hidden [&_.swiper-button-prev]:w-[45px] [&_.swiper-button-prev]:h-[45px] [&_.swiper-button-prev]:min-w-[45px] [&_.swiper-button-prev]:after:text-[29px] [&_.swiper-button-next]:w-[45px] [&_.swiper-button-next]:h-[45px] [&_.swiper-button-next]:min-w-[45px] [&_.swiper-button-next]:after:text-[29px]"
        >
          <SwiperSlide>
            <div className='rounded-[20px] overflow-hidden'>
              <Link to="/products" className="block w-full h-full">
                <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8" alt="Banner slide" className='w-full h-auto block object-cover rounded-[20px]' loading="lazy" decoding="async" />
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='rounded-[20px] overflow-hidden'>
              <Link to="/products" className="block w-full h-full">
                <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da" alt="Banner slide" className='w-full h-auto block object-cover rounded-[20px]' loading="lazy" decoding="async" />
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='rounded-[20px] overflow-hidden'>
              <Link to="/products" className="block w-full h-full">
                <img src="https://images.unsplash.com/photo-1491933382434-500287f9b54b" alt="Banner slide" className='w-full h-auto block object-cover rounded-[20px]' loading="lazy" decoding="async" />
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='rounded-[20px] overflow-hidden'>
              <Link to="/products" className="block w-full h-full">
                <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348" alt="Banner slide" className='w-full h-auto block object-cover rounded-[20px]' loading="lazy" decoding="async" />
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='rounded-[20px] overflow-hidden'>
              <Link to="/products" className="block w-full h-full">
                <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7" alt="Banner slide" className='w-full h-auto block object-cover rounded-[20px]' loading="lazy" decoding="async" />
              </Link>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}

export default HomeSlider;