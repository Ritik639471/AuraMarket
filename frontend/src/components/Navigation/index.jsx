import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { HiMenuAlt1 } from "react-icons/hi";
import { LiaAngleDownSolid } from "react-icons/lia";
import { Link } from 'react-router-dom';
import { SlRocket } from "react-icons/sl";
import CategoryPanel from './CategoryPanel';

const API_URL = import.meta.env.VITE_API_URL || '';

const Navigation = () => {
  const [isOpenCategoryPanel, setIsOpenCategoryPanel] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/categories`)
      .then(res => res.json())
      .then(data => setCategories(Array.isArray(data) ? data : []))
      .catch(err => console.error("Error fetching categories for navigation:", err));
  }, []);

  const openCategoryPanel = () => {
    setIsOpenCategoryPanel(true);
  };

  return (
    <>
      {/* 1. Desktop Navigation Bar (Visible only on lg+ screens: 1024px and up) */}
      <nav className="bg-white dark:bg-slate-900 py-2 hidden lg:block border-t border-gray-100 dark:border-slate-800/80 relative z-10 transition-colors duration-250">
        <div className="container mx-auto max-w-[1500px] px-4 flex items-center justify-between gap-6">
          
          {/* Shop By Categories Button */}
          <div className="shrink-0">
            <Button 
              className="!flex !items-center !gap-2 !text-[13.5px] !font-bold !capitalize !text-slate-800 dark:!text-slate-200 hover:!bg-red-50 dark:hover:!bg-slate-800 !py-1.5 !px-3.5 !rounded-full !border !border-slate-200 dark:!border-slate-700" 
              onClick={openCategoryPanel}
            >
              <HiMenuAlt1 className="text-[17px] text-[#ff5252]" />
              SHOP BY CATEGORIES
              <LiaAngleDownSolid className="text-[13px] text-slate-500 dark:text-slate-400 ml-1" />
            </Button>
          </div>

          {/* Category Links with Hover Flyout Menus */}
          <div className="flex-1 px-2 overflow-hidden">
            <ul className="flex items-center gap-6 list-none p-0 m-0">
              {categories.slice(0, 7).map((category, idx) => (
                <li key={idx} className="relative group/nav">
                  <Link 
                    to={`/products?category=${encodeURIComponent(category.name)}`} 
                    className="text-[13.5px] font-semibold text-slate-700 dark:text-slate-300 hover:text-[#ff5252] dark:hover:text-[#ff5252] no-underline transition-colors py-2 block whitespace-nowrap"
                  >
                    {category.name}
                  </Link>

                  {/* Multi-level Dropdown Menu */}
                  {category.subcategories && category.subcategories.length > 0 && (
                    <ul className="absolute top-[100%] left-0 min-w-[200px] bg-white dark:bg-slate-800 py-2 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.12)] border border-slate-100 dark:border-slate-700 hidden z-20 group-hover/nav:block">
                      {category.subcategories.map((sub, subIdx) => (
                        <li key={subIdx} className="relative py-2 px-4 cursor-pointer whitespace-nowrap group/sub hover:bg-slate-50 dark:hover:bg-slate-700/60">
                          <Link 
                            to={`/products?category=${encodeURIComponent(sub.name)}`} 
                            className="text-slate-700 dark:text-slate-200 text-[13px] font-medium group-hover/sub:text-[#ff5252] no-underline block"
                          >
                            {sub.name}
                          </Link>

                          {sub.items && sub.items.length > 0 && (
                            <ul className="absolute top-0 left-[100%] min-w-[170px] bg-white dark:bg-slate-800 py-2 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.12)] border border-slate-100 dark:border-slate-700 hidden group-hover/sub:block">
                              {sub.items.map((item, itemIdx) => (
                                <li key={itemIdx} className="py-1.5 px-4 cursor-pointer whitespace-nowrap hover:bg-slate-50 dark:hover:bg-slate-700/60">
                                  <Link 
                                    to={`/products?category=${encodeURIComponent(item)}`} 
                                    className="text-slate-600 dark:text-slate-300 text-[13px] hover:text-[#ff5252] dark:hover:text-[#ff5252] no-underline block"
                                  >
                                    {item}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Delivery perk badge */}
          <div className="shrink-0">
            <p className="text-[13px] font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2 m-0">
              <SlRocket className="text-[15px] text-[#ff5252]" />
              Free Worldwide Delivery
            </p>
          </div>
        </div>
      </nav>

      {/* 2. Mobile / Tablet Category Quick Strip (Visible only on < 1024px screens) */}
      <div className="lg:hidden bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar relative z-10 transition-colors duration-250">
        <button
          type="button"
          onClick={openCategoryPanel}
          className="shrink-0 flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 cursor-pointer"
        >
          <HiMenuAlt1 className="text-sm text-[#ff5252]" />
          Categories
        </button>
        <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap no-scrollbar py-0.5">
          {categories.slice(0, 8).map((cat, idx) => (
            <Link
              key={idx}
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-[#ff5252] dark:hover:text-[#ff5252] bg-slate-50 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-slate-700 border border-slate-200/60 dark:border-slate-700 px-3 py-1 rounded-full no-underline transition-colors shrink-0"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      <CategoryPanel isOpenCategoryPanel={isOpenCategoryPanel} setIsOpenCategoryPanel={setIsOpenCategoryPanel} />
    </>
  );
};

export default Navigation;