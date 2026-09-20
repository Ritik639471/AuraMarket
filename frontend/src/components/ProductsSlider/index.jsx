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
                slidesPerView={2}
                spaceBetween={12}
                navigation={true}
                modules={[Navigation]}
                breakpoints={{
                    320: { slidesPerView: 2, spaceBetween: 10 },
                    640: { slidesPerView: 3, spaceBetween: 14 },
                    1024: { slidesPerView: 4, spaceBetween: 16 },
                    1280: { slidesPerView: 5, spaceBetween: 18 },
                    1536: { slidesPerView: props.items || 6, spaceBetween: 20 },
                }}
                className="w-full py-2 [&_.swiper-button-prev]:w-10 [&_.swiper-button-prev]:h-10 [&_.swiper-button-prev]:min-w-10 [&_.swiper-button-prev]:after:text-[20px] [&_.swiper-button-next]:w-10 [&_.swiper-button-next]:h-10 [&_.swiper-button-next]:min-w-10 [&_.swiper-button-next]:after:text-[20px]"
            >
                {Array.isArray(props.products) && props.products.map((product) => (
                    <SwiperSlide key={product._id} className="py-2">
                        <ProductItem product={product} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ProductsSlider;
