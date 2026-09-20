import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HomeSlider from "../../components/HomeSlider";
import HomeCatSlider from "../../components/HomeCatSlider";
import AdsBannerSlider from "../../components/AdsBannerSlider";
import BannerBox from "../../components/BannerBox";
import ProductsSlider from "../../components/ProductsSlider";
import ProductItem from "../../components/ProductItem";
import HomeSliderV2 from "../../components/HomeSliderV2";
import { FiTruck, FiShield, FiRefreshCw, FiHeadphones, FiArrowRight, FiGrid, FiList, FiClock, FiTag } from "react-icons/fi";

const API_URL = import.meta.env.VITE_API_URL || '';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [visibleGridCount, setVisibleGridCount] = useState(10);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ads, setAds] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        const productList = Array.isArray(data) ? data : (Array.isArray(data?.products) ? data.products : []);
        setProducts(productList);
        setFilteredProducts(productList);
      })
      .catch(err => console.error('Home Products Fetch Error:', err));
    
    fetch(`${API_URL}/api/categories`)
      .then(res => res.json())
      .then(data => setCategories(Array.isArray(data) ? data : []))
      .catch(err => console.error('Home Categories Fetch Error:', err));

    fetch(`${API_URL}/api/banners`)
      .then(res => res.json())
      .then(data => setAds(Array.isArray(data) ? data : []))
      .catch(err => console.error('Home Ads Fetch Error:', err));
  }, []);

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    setVisibleGridCount(10);
    if (!categoryName || categoryName === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category?.toLowerCase() === categoryName.toLowerCase()));
    }
  };

  const categoryList = ['All', ...categories.map(c => c.name)];

  return (
    <div className="bg-[#fafbfc] dark:bg-[#090d16] min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-250">
      {/* 1. Hero Carousel - Aspect Ratio Balanced & Uncropped */}
      <HomeSlider ads={ads} />

      {/* 2. Elevated Floating Category Capsules */}
      <HomeCatSlider />

      {/* 3. Featured Showcase: 1 Side Product Details & 1 Side Product Image */}
      {products.length > 0 && (
        <section className="py-5 px-4 md:px-12 max-w-[1550px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4 px-1">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5252] animate-pulse" />
              <h3 className="text-lg md:text-2xl font-black text-slate-900 dark:text-white m-0">
                Today's Featured Deals & Spotlights
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] md:text-xs font-black uppercase tracking-wider text-[#ff5252] bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/40 px-3.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                <FiClock className="text-xs" /> Flash Deals: Limited Stock
              </span>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row items-stretch justify-between gap-6">
            <div className="w-full lg:w-[70%]">
              <HomeSliderV2 featuredProducts={products.slice(0, 5)} />
            </div>
            {/* Responsive tablet 2-column & desktop 1-column layout */}
            <div className="w-full lg:w-[30%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {products.length >= 2 ? (
                products.slice(products.length >= 7 ? 5 : 1, products.length >= 7 ? 7 : 3).map((p, idx) => (
                  <BannerBox
                    key={p._id || idx}
                    img={p.images?.[0]}
                    link={`/product/${p._id}`}
                    title={p.name}
                    price={`$${p.price}`}
                    info={idx % 2 === 0 ? "right" : "left"}
                  />
                ))
              ) : ads.length >= 2 ? (
                ads.slice(0, 2).map((ad, idx) => (
                  <BannerBox
                    key={ad._id || idx}
                    img={ad.image}
                    link={ad.link || '/products'}
                  />
                ))
              ) : null}
            </div>
          </div>
        </section>
      )}

      {/* 4. Popular & Trending Products - Responsive 10-Product Grid & Toggle */}
      <section className="py-8 px-4 md:px-12 max-w-[1550px] mx-auto">
        <div className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-800 shadow-sm transition-colors">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#ff5252] bg-red-50 dark:bg-red-950/40 px-3 py-1 rounded-full border border-red-100 dark:border-red-900/40">
                ★ Handpicked Collection
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mt-2 mb-1">
                Popular & Trending
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 m-0">
                Showing {Math.min(visibleGridCount, filteredProducts.length)} of {filteredProducts.length} verified styles, gadgets, and luxury essentials
              </p>
            </div>

            <div className="flex items-center gap-4 self-start md:self-end">
              {/* Grid vs Slider View Mode Switcher */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-slate-700 text-[#ff5252] shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="Grid View (Show More Products)"
                >
                  <FiGrid className="text-sm" />
                  <span className="hidden sm:inline">Grid (10+)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('slider')}
                  className={`p-1.5 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    viewMode === 'slider'
                      ? 'bg-white dark:bg-slate-700 text-[#ff5252] shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="Carousel Slider View"
                >
                  <FiList className="text-sm" />
                  <span className="hidden sm:inline">Slider</span>
                </button>
              </div>

              <Link
                to="/products"
                className="inline-flex items-center text-sm font-bold text-[#ff5252] hover:text-[#e34e4e] group no-underline"
              >
                Full Catalog
                <FiArrowRight className="ml-1.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-1 scrollbar-none mb-6">
            {categoryList.map((cat) => {
              const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#ff5252] text-white shadow-md shadow-red-500/25 scale-[1.02]'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Dual View Display: High-Density 10-Product Grid or Slider */}
          {viewMode === 'grid' ? (
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 md:gap-5">
                {filteredProducts.slice(0, visibleGridCount).map((product) => (
                  <div key={product._id} className="h-full">
                    <ProductItem product={product} />
                  </div>
                ))}
              </div>

              {/* Load More Button if More Products Available */}
              {filteredProducts.length > visibleGridCount && (
                <div className="flex justify-center mt-8 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setVisibleGridCount(prev => prev + 10)}
                    className="bg-slate-900 dark:bg-slate-800 hover:bg-black dark:hover:bg-slate-700 text-white text-xs md:text-sm font-extrabold px-8 py-3 rounded-xl shadow-md transition-all hover:scale-105 cursor-pointer flex items-center gap-2"
                  >
                    Load More Products ({filteredProducts.length - visibleGridCount} remaining)
                  </button>
                </div>
              )}
            </div>
          ) : (
            <ProductsSlider items={6} products={filteredProducts} />
          )}
        </div>
      </section>

      {/* 5. Curated Category Shelves: Featured Products from Each Category */}
      {categories.map((cat) => {
        const catProducts = products.filter(
          p => p.category?.toLowerCase() === cat.name?.toLowerCase()
        );
        if (catProducts.length === 0) return null;

        return (
          <section key={cat._id || cat.name} className="py-6 px-4 md:px-12 max-w-[1550px] mx-auto">
            <div className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-800 shadow-sm transition-colors">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900/40 flex items-center justify-center text-[#ff5252] text-lg font-bold shadow-sm">
                    <FiTag />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white m-0">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 m-0 mt-0.5">
                      Handpicked styles & verified bestsellers in {cat.name} ({catProducts.length} items)
                    </p>
                  </div>
                </div>

                <Link
                  to={`/products?category=${encodeURIComponent(cat.name)}`}
                  className="inline-flex items-center text-xs md:text-sm font-bold text-[#ff5252] hover:text-[#e34e4e] group no-underline"
                >
                  View All in {cat.name}
                  <FiArrowRight className="ml-1.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              {/* 5 Products Grid for this Category */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 md:gap-5">
                {catProducts.slice(0, 5).map((prod) => (
                  <div key={prod._id} className="h-full">
                    <ProductItem product={prod} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* 6. Luxury VIP Trust & Perks Strip */}
      <section className="py-6 px-4 md:px-12 max-w-[1550px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="bg-white dark:bg-slate-900/90 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-950/40 text-[#ff5252] flex items-center justify-center text-2xl flex-shrink-0">
              <FiTruck />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white m-0">Free Worldwide Delivery</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 m-0">Complimentary on orders over $99</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900/90 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 flex items-center justify-center text-2xl flex-shrink-0">
              <FiShield />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white m-0">100% Authentic Guarantee</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 m-0">Verified certified original goods</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900/90 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-500 flex items-center justify-center text-2xl flex-shrink-0">
              <FiRefreshCw />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white m-0">30-Day Easy Returns</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 m-0">Hassle-free exchanges & refunds</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900/90 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-500 flex items-center justify-center text-2xl flex-shrink-0">
              <FiHeadphones />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white m-0">24/7 VIP Concierge</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 m-0">Instant dedicated personal support</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Promotional Campaign Banners (Only if Ads Exist) */}
      {ads.length > 0 && (
        <section className="py-4 px-4 md:px-12 max-w-[1550px] mx-auto">
          <AdsBannerSlider items={Math.min(4, ads.length)} ads={ads} autoplay={true} />
        </section>
      )}

      {/* 8. New Arrivals Showcase */}
      <section className="py-8 px-4 md:px-12 max-w-[1550px] mx-auto pb-14">
        <div className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-800 shadow-sm transition-colors">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#ff5252] bg-red-50 dark:bg-red-950/40 px-3 py-1 rounded-full border border-red-100 dark:border-red-900/40">
                ★ Just Dropped
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mt-2 mb-1">
                Latest Arrivals
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 m-0">
                Be the first to own our newest handpicked arrivals
              </p>
            </div>

            <Link
              to="/products"
              className="inline-flex items-center text-sm font-bold text-[#ff5252] hover:text-[#e34e4e] group no-underline"
            >
              View All New
              <FiArrowRight className="ml-1.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <ProductsSlider items={6} products={products} />
        </div>
      </section>
    </div>
  );
};

export default Home;
