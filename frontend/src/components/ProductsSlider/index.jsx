import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ProductItem from '../ProductItem/index.jsx';

import 'swiper/css';
import 'swiper/css/navigation';

const ProductsSlider = (props) => {
    return (
        <div className="py-4">
            <Swiper
                slidesPerView={props.items}
                spaceBetween={10}
                navigation={true}
                modules={[Navigation]}
                className="w-full [&_.swiper-wrapper]:px-0 [&_.swiper-wrapper]:-mx-[15px] [&_.swiper-wrapper]:mb-2.5 [&_.swiper-button-prev]:w-10 [&_.swiper-button-prev]:h-10 [&_.swiper-button-prev]:min-w-10 [&_.swiper-button-prev]:after:text-[27px] [&_.swiper-button-next]:w-10 [&_.swiper-button-next]:h-10 [&_.swiper-button-next]:min-w-10 [&_.swiper-button-next]:after:text-[27px]"
            >
                {Array.isArray(props.products) && props.products.map((product) => (
                    <SwiperSlide key={product._id}>
                        <ProductItem product={product} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ProductsSlider;
