import React, { useState, useEffect, useRef } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/navigation';
import 'react-inner-image-zoom/lib/styles.min.css';
import "./style.css";

const ProductZoom = ({ image }) => {
    const images = image ? [image, image, image, image] : [
        "https://images.unsplash.com/photo-1517336714468-450583ad716d?auto=format&fit=crop&q=80&w=300",
        "https://images.unsplash.com/photo-1517336714468-450583ad716d?auto=format&fit=crop&q=80&w=300",
        "https://images.unsplash.com/photo-1517336714468-450583ad716d?auto=format&fit=crop&q=80&w=300"
    ];
    const [selectedImage, setSelectedImage] = useState(images[0]);
    const imgk = useRef(null);

    useEffect(() => {
        if (image) setSelectedImage(image);
    }, [image]);

    return (
        <div className="image-zoom-container">
            <div className="side-image-swiper">
                <Swiper
                    direction="vertical"
                    spaceBetween={10}
                    slidesPerView={4}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                >
                    {images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className={`thumbnail-wrapper ${selectedImage === img ? 'selected' : ''}`}
                                onClick={() => {
                                    setSelectedImage(img);
                                    imgk.current?.click();
                                }}
                            >
                                <img src={img} alt={`product-thumb-${index}`} />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="main-image-zoom">
                <InnerImageZoom
                    src={selectedImage}
                    zoomSrc={selectedImage}
                    zoomType="hover"
                    zoomScale={1.1}
                />
            </div>
        </div>
    );
};

export default ProductZoom;
