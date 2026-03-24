import React from "react";
import "./style.css";
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
            className="home-slider-v2"
        >
            <SwiperSlide>
                <div className='item'>
                    <img src="https://serviceapi.spicezgold.com/download/1742439896581_1737036773579_sample-1.jpg" alt="slide1" />
                    <div className='banner-detail-info'>
                        <h4 className='banner-title-info animate-title'>Big Saving Days Sale</h4>
                        <h2 className="banner-title-main animate-subtitle">Women solid Round Green T-Shirt</h2>
                        <h3 className="banner-title-info price animate-price">
                            Starting at Only
                            <span className="banner-price-info">$59.00</span>
                        </h3>
                        <div className="banner-btn animate-btn">
                            <Button className="btn" variant="contained">
                                Shop Now
                            </Button>
                        </div>
                    </div>
                </div>
            </SwiperSlide>

            <SwiperSlide>
                <div className='item'>
                    <img src="https://serviceapi.spicezgold.com/download/1742441193376_1737037654953_New_Project_45.jpg" alt="slide2" />
                    <div className='banner-detail-info'>
                        <h4 className='banner-title-info animate-title'>Big Saving Days Sale</h4>
                        <h2 className="banner-title-main animate-subtitle">Apple iPhone 13 128 GB, Grey</h2>
                        <h3 className="banner-title-info price animate-price">
                            Starting at Only
                            <span className="banner-price-info">$559.00</span>
                        </h3>
                        <div className="banner-btn animate-btn">
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
