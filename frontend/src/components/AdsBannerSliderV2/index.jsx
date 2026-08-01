import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import BannerBoxV2 from '../BannerBoxV2';

import 'swiper/css';
import 'swiper/css/navigation';

const AdsBannerSliderV2 = ({ items = 4 }) => {
  return (
    <div className="py-5 w-full">
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
        className="[&_.swiper-button-prev]:w-[30px] [&_.swiper-button-prev]:h-[30px] [&_.swiper-button-prev]:min-w-[30px] [&_.swiper-button-prev]:after:text-[22px] [&_.swiper-button-next]:w-[30px] [&_.swiper-button-next]:h-[30px] [&_.swiper-button-next]:min-w-[30px] [&_.swiper-button-next]:after:text-[22px]"
      >
        <SwiperSlide >
          <BannerBoxV2
            img="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80"
            link="/"
            title="Buy Men's Footwear with low price"
            price="$10"
            info="right"
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBoxV2
            img="https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80"
            link="/"
            title="Buy Apple Iphone with low price"
            price="$499"
            info="left"
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBoxV2
            img="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80"
            link="/"
            title="Buy Men's Footwear with low price"
            price="$10"
            info="right"
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBoxV2
            img="https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80"
            link="/"
            title="Buy Apple Iphone with low price"
            price="$499"
            info="left"
          />
        </SwiperSlide>
        <SwiperSlide >
          <BannerBoxV2
            img="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80"
            link="/"
            title="Buy Men's Footwear with low price"
            price="$10"
            info="right"
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBoxV2
            img="https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80"
            link="/"
            title="Buy Apple Iphone with low price"
            price="$499"
            info="left"
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBoxV2
            img="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80"
            link="/"
            title="Buy Men's Footwear with low price"
            price="$10"
            info="right"
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBoxV2
            img="https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80"
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
