import React from 'react';
import './style.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import BannerBox from '../BannerBox';

import 'swiper/css';
import 'swiper/css/navigation';

const AdsBannerSlider = ({ items = 4, ads = [] }) => {
  return (
    <div className="ads-banner-slider">
      <Swiper
        slidesPerView={items}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="ads-swiper"
      >
        {ads.map((ad) => (
          <SwiperSlide key={ad._id}>
            <BannerBox img={ad.image} link={ad.link} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AdsBannerSlider;
