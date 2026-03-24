import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation,Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import './style.css';

const HomeSlider = () => {
    return (
        <div className='homeslider'>
            <div className="container">
                <Swiper 
                  spaceBetween={10}
                  navigation={true}
                  loop={true}
                  modules={[Navigation,Autoplay]}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  className="sliderHome"
                >
                    <SwiperSlide>
                        <div className='item'>
                        <img src="https://serviceapi.spicezgold.com/download/1751685144346_NewProject(11).jpg" alt="Banner slide" className='banner-img' />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='item'>
                        <img src="https://serviceapi.spicezgold.com/download/1751685130717_NewProject(8).jpg" alt="Banner slide" className='banner-img' />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='item'>
                        <img src="https://serviceapi.spicezgold.com/download/1748955932914_NewProject(1).jpg" alt="Banner slide" className='banner-img' />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='item'>
                        <img src="https://serviceapi.spicezgold.com/download/1748955908049_NewProject(13).jpg" alt="Banner slide" className='banner-img' />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='item'>
                        <img src="https://github.com/rinkuv37/fullstack-ecommerce/blob/main/images/slideBanner1.jpg?raw=true" alt="Banner slide" className='banner-img' />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    )
}

export default HomeSlider;