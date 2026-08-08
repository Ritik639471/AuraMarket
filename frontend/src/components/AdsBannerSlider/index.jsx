import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import BannerBox from '../BannerBox';

import 'swiper/css';
import 'swiper/css/navigation';

const AdsBannerSlider = ({ items = 4, ads = [], autoplay = false, children }) => {
  return (
    <div className="py-5 w-full">
      <Swiper
        slidesPerView={items}
        spaceBetween={10}
        navigation={true}
        loop={autoplay}
        modules={autoplay ? [Navigation, Autoplay] : [Navigation]}
        {...(autoplay && {
          autoplay: {
            delay: 2500,
            disableOnInteraction: false,
          }
        })}
        className="[&_.swiper-button-prev]:w-[30px] [&_.swiper-button-prev]:h-[30px] [&_.swiper-button-prev]:min-w-[30px] [&_.swiper-button-prev]:after:text-[22px] [&_.swiper-button-next]:w-[30px] [&_.swiper-button-next]:h-[30px] [&_.swiper-button-next]:min-w-[30px] [&_.swiper-button-next]:after:text-[22px]"
      >
        {children ? children : ads.map((ad) => (
          <SwiperSlide key={ad._id}>
            <BannerBox img={ad.image} link={ad.link} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AdsBannerSlider;
