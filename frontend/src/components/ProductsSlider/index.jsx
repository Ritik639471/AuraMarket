import React from 'react';
import './style.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ProductItem from '../ProductItem/index.jsx';

import 'swiper/css';
import 'swiper/css/navigation';

const ProductsSlider = (props) => {
    return (
        <div className="product-slider-container">
            <Swiper
                slidesPerView={props.items}
                spaceBetween={10}
                navigation={true}
                modules={[Navigation]}
                className="product-swiper"
            >
                {props.products?.map((product) => (
                    <SwiperSlide key={product._id}>
                        <ProductItem product={product} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ProductsSlider;
