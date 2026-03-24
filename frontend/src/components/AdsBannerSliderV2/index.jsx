import React from 'react';
import './style.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import BannerBoxV2 from '../BannerBoxV2';

import 'swiper/css';
import 'swiper/css/navigation';

const AdsBannerSliderV2 = ({ items = 4 }) => {
  return (
    <div className="ads-banner-slider">
      <Swiper
        slidesPerView={items}
        spaceBetween={10}
        navigation={true}
        loop={true}
        modules={[Navigation, Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="ads-swiper"
      >
        <SwiperSlide >
          <BannerBoxV2
            img="https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg"
            link="/"
            title="Buy Men's Footwear with low price"
            price="$10"
            info="right"
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBoxV2
            img="https://serviceapi.spicezgold.com/download/1741664496923_1737020250515_New_Project_47.jpg"
            link="/"
            title="Buy Apple Iphone with low price"
            price="$499"
            info="left"
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBoxV2
            img="https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg"
            link="/"
            title="Buy Men's Footwear with low price"
            price="$10"
            info="right"
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBoxV2
            img="https://serviceapi.spicezgold.com/download/1741664496923_1737020250515_New_Project_47.jpg"
            link="/"
            title="Buy Apple Iphone with low price"
            price="$499"
            info="left"
          />
        </SwiperSlide>
        <SwiperSlide >
          <BannerBoxV2
            img="https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg"
            link="/"
            title="Buy Men's Footwear with low price"
            price="$10"
            info="right"
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBoxV2
            img="https://serviceapi.spicezgold.com/download/1741664496923_1737020250515_New_Project_47.jpg"
            link="/"
            title="Buy Apple Iphone with low price"
            price="$499"
            info="left"
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBoxV2
            img="https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg"
            link="/"
            title="Buy Men's Footwear with low price"
            price="$10"
            info="right"
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBoxV2
            img="https://serviceapi.spicezgold.com/download/1741664496923_1737020250515_New_Project_47.jpg"
            link="/"
            title="Buy Apple Iphone with low price"
            price="$499"
            info="left"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default AdsBannerSliderV2;
