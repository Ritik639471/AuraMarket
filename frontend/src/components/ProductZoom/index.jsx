import React, { useState, useEffect, useRef } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/navigation';
import 'react-inner-image-zoom/lib/styles.min.css';

const ProductZoom = ({ images: productImages }) => {
    const images = productImages && productImages.length > 0 ? productImages : [
        "https://images.unsplash.com/photo-1517336714468-450583ad716?auto=format&fit=crop&q=80d?auto=format&fit=crop&q=80&w=300",
        "https://images.unsplash.com/photo-1517336714468-450583ad716?auto=format&fit=crop&q=80d?auto=format&fit=crop&q=80&w=300",
        "https://images.unsplash.com/photo-1517336714468-450583ad716?auto=format&fit=crop&q=80d?auto=format&fit=crop&q=80&w=300"
    ];
    const [selectedImage, setSelectedImage] = useState(images[0]);
    const imgk = useRef(null);

    useEffect(() => {
        if (images && images.length > 0) setSelectedImage(images[0]);
    }, [productImages]);

    return (
        <div className="flex w-full box-border overflow-hidden">
            <div className="w-[18%] h-full rounded-md overflow-hidden gap-[10px]">
                <Swiper
                    direction="vertical"
                    spaceBetween={10}
                    slidesPerView={4}
                    navigation={true}
                    modules={[Navigation]}
                    className="h-[480px] w-[100px] [&_.swiper-slide]:cursor-pointer [&_.swiper-slide]:py-1 [&_.swiper-button-prev]:!w-full [&_.swiper-button-prev]:!h-[25px] [&_.swiper-button-prev]:!rounded-none [&_.swiper-button-prev]:!top-[20px] [&_.swiper-button-prev]:!bottom-auto [&_.swiper-button-prev]:!left-0 [&_.swiper-button-prev]:after:font-semibold [&_.swiper-button-prev]:after:text-[20px] [&_.swiper-button-next]:!w-full [&_.swiper-button-next]:!h-[25px] [&_.swiper-button-next]:!rounded-none [&_.swiper-button-next]:!top-[478px] [&_.swiper-button-next]:!bottom-[20px] [&_.swiper-button-next]:!right-0 [&_.swiper-button-next]:after:font-semibold [&_.swiper-button-next]:after:text-[20px]"
                >
                    {images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className={`w-[100px] p-1 border box-border flex items-center justify-center rounded-[5px] transition-all duration-300 hover:opacity-100 hover:border-[#888] ${selectedImage === img ? 'border-[#ff5252] border-2 shadow-[0_0_10px_rgba(255,82,82,0.5)] opacity-100 bg-white' : 'border-[#ddd] bg-[#f9f9f9] opacity-70'}`}
                                onClick={() => {
                                    setSelectedImage(img);
                                    imgk.current?.click();
                                }}
                            >
                                <img src={img} alt={`product-thumb-${index}`} className="max-w-full max-h-full object-contain" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="m-5 w-[72%] h-[600px] [&_img]:rounded-[5px]">
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
