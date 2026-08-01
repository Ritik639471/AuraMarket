import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Button from '@mui/material/Button';

import { EffectFade, Navigation, Pagination ,Autoplay} from 'swiper/modules';

const HomeSliderV2 = () => {
    return (
        <Swiper
            spaceBetween={30}
            effect={'fade'}
            navigation={true}
            loop={true}
            pagination={{ clickable: true }}
            modules={[EffectFade, Navigation, Pagination,Autoplay]}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            className="w-full [&_.swiper-button-prev]:w-[35px] [&_.swiper-button-prev]:h-[35px] [&_.swiper-button-prev]:min-w-[35px] [&_.swiper-button-prev]:after:text-[26px] [&_.swiper-button-next]:w-[35px] [&_.swiper-button-next]:h-[35px] [&_.swiper-button-next]:min-w-[35px] [&_.swiper-button-next]:after:text-[26px]"
        >
            <SwiperSlide>
                <div className='rounded-[5px] overflow-hidden relative w-full h-[450px]'>
                    <img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80" alt="slide1" className="w-full h-full object-cover block" loading="lazy" decoding="async" />
                    <div className='w-[44%] h-full flex flex-col items-center justify-center absolute top-0 right-0 px-8 z-50'>
                        <h4 className='w-full m-0 text-[20px] font-medium mb-3 animate-title text-white bg-black/50 p-2 rounded'>Big Saving Days Sale</h4>
                        <h2 className="w-full m-0 text-[45px] font-bold mb-3 animate-subtitle text-white bg-black/50 p-2 rounded">Women solid Round Green T-Shirt</h2>
                        <h3 className="w-full m-0 text-[20px] font-medium mb-3 flex items-center animate-price text-white bg-black/50 p-2 rounded">
                            Starting at Only
                            <span className="text-[#ff5252] text-[30px] font-bold ml-3">$59.00</span>
                        </h3>
                        <div className="mt-3 w-full animate-btn">
                            <Button className="btn" variant="contained">
                                Shop Now
                            </Button>
                        </div>
                    </div>
                </div>
            </SwiperSlide>

            <SwiperSlide>
                <div className='rounded-[5px] overflow-hidden relative w-full h-[450px]'>
                    <img src="https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80" alt="slide2" className="w-full h-full object-cover block" loading="lazy" decoding="async" />
                    <div className='w-[44%] h-full flex flex-col items-center justify-center absolute top-0 right-0 px-8 z-50'>
                        <h4 className='w-full m-0 text-[20px] font-medium mb-3 animate-title text-white bg-black/50 p-2 rounded'>Big Saving Days Sale</h4>
                        <h2 className="w-full m-0 text-[45px] font-bold mb-3 animate-subtitle text-white bg-black/50 p-2 rounded">Apple iPhone 13 128 GB, Grey</h2>
                        <h3 className="w-full m-0 text-[20px] font-medium mb-3 flex items-center animate-price text-white bg-black/50 p-2 rounded">
                            Starting at Only
                            <span className="text-[#ff5252] text-[30px] font-bold ml-3">$559.00</span>
                        </h3>
                        <div className="mt-3 w-full animate-btn">
                            <Button className="btn" variant="contained">
                                Shop Now
                            </Button>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    );
};

export default HomeSliderV2;
