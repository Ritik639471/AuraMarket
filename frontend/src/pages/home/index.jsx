import React, { useState, useEffect } from "react";
import HomeSlider from "../../components/HomeSlider";
import HomeCatSlider from "../../components/HomeCatSlider";
import AdsBannerSlider from "../../components/AdsBannerSlider";
import BannerBox from "../../components/BannerBox";
import ProductsSlider from "../../components/ProductsSlider";
import BlogItem from "../../components/BlogItem";
import HomeSliderV2 from "../../components/HomeSliderV2";
import { FaShippingFast } from "react-icons/fa";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

const API_URL = import.meta.env.VITE_API_URL || '';

const Home = () => {
  const [value, setValue] = useState(0);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [ads, setAds] = useState([]);

  const categoryTabs = ['All', 'Fashion', 'Electronics', 'Bags', 'Footwears', 'Beauty', 'Wellness', 'Jewellery', 'Home Decor'];

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        const productList = Array.isArray(data) ? data : (data.products || []);
        setProducts(productList);
        setFilteredProducts(productList);
      })
      .catch(err => console.error('Home Products Fetch Error:', err));
    
    fetch(`${API_URL}/api/ads`)
      .then(res => res.json())
      .then(data => setAds(data))
      .catch(err => console.error('Home Ads Fetch Error:', err));
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const selectedCategory = categoryTabs[newValue];
    if (selectedCategory === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === selectedCategory));
    }
  };

  return (
    <>
      <HomeSlider />

      <HomeCatSlider />

      <section className="bg-white py-4 px-12">
        <div className="flex items-center">
          <div className="w-[70%]">
            <HomeSliderV2 />
          </div>
          <div className="flex w-[25%] flex-col items-center justify-between">
          <BannerBox 
            img="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80"
            link="/"
            title="Buy Men's Footwear with low price"
            price="$10"
            info="right"
          />
          <BannerBox 
            img="https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80"
            link="/"
            title="Buy Apple Iphone with low price"
            price="$499"
            info="left"
          />
        </div>
        </div>
      </section>

      <section className="bg-white py-5">
        <div className="w-[95%] mx-auto">
          <div className="flex justify-between items-center flex-wrap">
            <div className="left">
              <h2 className="text-[20px] font-semibold m-0">Popular Products</h2>
              <p className="text-[14px] font-normal mt-[5px]">Do not miss the current offers until the end of March.</p>
            </div>

            <div className="w-[60%]">
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="product categories"
                sx={{
                  '& .MuiTabs-indicator': { backgroundColor: '#ff5252' },
                  '& .MuiTab-root.Mui-selected': { color: '#ff5252' }
                }}
              >
                <Tab label="All" />
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

          <ProductsSlider items={6} products={filteredProducts} />
        </div>
      </section>

      <section className="bg-white p-0">
        <div className="w-[95%] mx-auto">
          <div className="w-[85%] p-4 mx-auto border-2 border-[#ff5252] flex items-center justify-between rounded-lg gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <FaShippingFast className="text-[50px] text-[#ff5252]" />
              <span className="text-[20px] font-semibold uppercase">Free Shipping</span>
            </div>

            <div className="shipping-middle">
              <p className="m-0 font-medium">Free Delivery Now On Your First Order and over $200</p>
            </div>

            <p className="text-[25px] font-bold text-black m-0">- Only $200</p>
          </div>

          <AdsBannerSlider items={4} ads={ads} />
        </div>
      </section>

      <section className="bg-white py-0">
         <div className="w-[95%] mx-auto">
            <div className="flex justify-between items-center flex-wrap">
              <h2 className="text-[20px] font-semibold m-0">Latest Products</h2>
            </div>
          
          <ProductsSlider items={6} products={products} />
         </div>
      </section>


      <section className="bg-white py-0">
         <div className="w-[95%] mx-auto">
            <div className="flex justify-between items-center flex-wrap">
              <h2 className="text-[20px] font-semibold m-0">Featured Products</h2>
            </div>

          <ProductsSlider items={6} products={products} />
          <AdsBannerSlider items={4} autoplay={true}>
            <SwiperSlide><BannerBox img="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80" link="/" title="Buy Men's Footwear with low price" price="$10" info="right" /></SwiperSlide>
            <SwiperSlide><BannerBox img="https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80" link="/" title="Buy Apple Iphone with low price" price="$499" info="left" /></SwiperSlide>
            <SwiperSlide><BannerBox img="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80" link="/" title="Buy Men's Footwear with low price" price="$10" info="right" /></SwiperSlide>
            <SwiperSlide><BannerBox img="https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80" link="/" title="Buy Apple Iphone with low price" price="$499" info="left" /></SwiperSlide>
          </AdsBannerSlider>
         </div>
      </section>
      

      <section className="bg-white pt-0 pb-8">
        <div className="w-[95%] mx-auto">
          <div className="flex justify-between items-center flex-wrap">
              <h2 className="text-[20px] font-semibold m-0 mb-4">From The Blog</h2>
          </div>
          <Swiper
                    slidesPerView={4}
                    spaceBetween={20}
                    navigation={true}
                    modules={[Navigation]}
                    className="BlogSlider [&_.swiper-button-prev]:w-8 [&_.swiper-button-prev]:h-8 [&_.swiper-button-prev]:min-w-[32px] [&_.swiper-button-prev]:after:text-[23px] [&_.swiper-button-next]:w-8 [&_.swiper-button-next]:h-8 [&_.swiper-button-next]:min-w-[32px] [&_.swiper-button-next]:after:text-[23px]"
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
