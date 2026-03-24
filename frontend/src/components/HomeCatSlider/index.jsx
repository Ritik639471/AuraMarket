import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';
import './style.css';

// Category data (you can expand with image links later)
const categories = [
  { name: "Fashion", image: "https://serviceapi.spicezgold.com/download/1753475034183_1000013786.png" },
  { name: "Electronics", image: "https://serviceapi.spicezgold.com/download/1741660988059_ele.png" },
  { name: "Bags", image: "https://serviceapi.spicezgold.com/download/1741661045887_bag.png" },
  { name: "Footwears", image: "https://serviceapi.spicezgold.com/download/1741661061379_foot.png" },
  { name: "Groceries", image: "https://serviceapi.spicezgold.com/download/1741661077633_gro.png" },
  { name: "Beauty", image: "https://serviceapi.spicezgold.com/download/1741661092792_beauty.png" },
  { name: "Wellness", image: "https://serviceapi.spicezgold.com/download/1741661105893_well.png" },
  { name: "Jewellery", image: "https://serviceapi.spicezgold.com/download/1749273446706_jw.png" },
  { name: "Home &Decor", image: "https://imgs.search.brave.com/WJjdh_ywXXDhM_COppv41WukDCPRuTu3dM4GwvIFXJI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvcHJldmll/dy0xeC8yNy82Mi9o/b21lLWRlY29yLWNo/YWxrLXdoaXRlLWlj/b24tb24tYmxhY2st/YmFja2dyb3VuZC12/ZWN0b3ItMzMzOTI3/NjIuanBn" }
];

const HomeCatSlider = () => {
  return (
    <div className="homecatslider">
      <div className="container">
        <Swiper
          slidesPerView={8}
          spaceBetween={10}
          navigation={true}
          loop={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {categories.map((category, index) => (
            <SwiperSlide key={index}>
              <Link to="/">
                <div className="cat-item">
                  <img
                    src={
                      category.image ||
                      "https://via.placeholder.com/60?text=No+Image"
                    }
                    alt={category.name}
                    className="cat-img"
                  />
                  <h3 className="cat-title">{category.name}</h3>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HomeCatSlider;
