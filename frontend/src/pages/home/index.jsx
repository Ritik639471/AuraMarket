import React from "react";
import "./style.css";
import HomeSlider from "../../components/HomeSlider";
import HomeCatSlider from "../../components/HomeCatSlider";
import AdsBannerSlider from "../../components/AdsBannerSlider";
import AdsBannerSliderV2 from "../../components/AdsBannerSliderV2";
import ProductsSlider from "../../components/ProductsSlider";
import BlogItem from "../../components/BlogItem";
import HomeSliderV2 from "../../components/HomeSliderV2";
import BannerBoxV2 from "../../components/BannerBoxV2";
import { FaShippingFast } from "react-icons/fa";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

const API_URL = import.meta.env.VITE_API_URL || '';

const Home = () => {
  const [value, setValue] = React.useState(0);
  const [products, setProducts] = React.useState([]);
  const [ads, setAds] = React.useState([]);

  React.useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Home Products Fetch Error:', err));
    
    fetch(`${API_URL}/api/ads`)
      .then(res => res.json())
      .then(data => setAds(data))
      .catch(err => console.error('Home Ads Fetch Error:', err));
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <HomeSlider />

      <HomeCatSlider />

      <section className="home-section-slider2">
        <div className="container-slider2">
          <div className="part1">
            <HomeSliderV2 />
          </div>
          <div className="part2">
            <BannerBoxV2  
            img="https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg"
            link="/"
            title="Buy Men's Footwear with low price"
            price="$10"
            info="right"
            />
            <BannerBoxV2  
            img="https://serviceapi.spicezgold.com/download/1741664496923_1737020250515_New_Project_47.jpg"
            link="/"
            title="Buy Apple Iphone with low price"
            price="$499"
            info="left"
            />
          </div>
        </div>
      </section>

      <section className="product-section">
        <div className="container-fluid">
          <div className="product-header">
            <div className="left">
              <h2 className="section-title">Popular Products</h2>
              <p className="section-desc">Do not miss the current offers until the end of March.</p>
            </div>

            <div className="right">
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="product categories"
              >
                <Tab label="Fashion" />
                <Tab label="Electronics" />
                <Tab label="Bags" />
                <Tab label="Footwears" />
                <Tab label="Beauty" />
                <Tab label="Wellness" />
                <Tab label="Jewellery" />
                <Tab label="Home Decor" />
              </Tabs>
            </div>
          </div>

          <ProductsSlider items={6} products={products} />
        </div>
      </section>

      <section className="home-section">
        <div className="container">
          <div className="shipping-banner">
            <div className="shipping-left">
              <FaShippingFast className="shipping-icon" />
              <span className="shipping-title">Free Shipping</span>
            </div>

            <div className="shipping-middle">
              <p className="shipping-note">Free Delivery Now On Your First Order and over $200</p>
            </div>

            <p className="shipping-price">- Only $200</p>
          </div>

          <AdsBannerSlider items={4} ads={ads} />
        </div>
      </section>

      <section className="product-section latest-products">
         <div className="container-fluid">
            <div className="product-header">
              <h2 className="section-title">Latest Products</h2>
            </div>
          
          <ProductsSlider items={6} products={products} />
         </div>
      </section>


      <section className="product-section featured-products">
         <div className="container-fluid">
            <div className="product-header">
              <h2 className="section-title">Featured Products</h2>
            </div>

          <ProductsSlider items={6} products={products} />
          <AdsBannerSliderV2 items={4} />
         </div>
      </section>
      

      <section className="product-section blog-section">
        <div className="container-fluid">
          <div className="product-header">
              <h2 className="section-title blog-section-title">From The Blog</h2>
          </div>
          <Swiper
                    slidesPerView={4}
                    spaceBetween={20}
                    navigation={true}
                    modules={[Navigation]}
                    className="BlogSlider"
          >
            <SwiperSlide><BlogItem /></SwiperSlide>
            <SwiperSlide><BlogItem /></SwiperSlide>
            <SwiperSlide><BlogItem /></SwiperSlide>
            <SwiperSlide><BlogItem /></SwiperSlide>
            <SwiperSlide><BlogItem /></SwiperSlide>

          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Home;
