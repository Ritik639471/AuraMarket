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
          .then(data => setCategories(data))
          .catch(err => console.error("Error fetching categories for navigation:", err));
  }, []);

  const openCategoryPanel=()=>{
    setIsOpenCategoryPanel(true);
  }

  return (
    <>
      <nav className="bg-white py-2 [&_ul]:list-none [&_li]:list-none">
        <div className="flex justify-between items-center flex-row w-[90%] mx-auto gap-8">
          <div className="w-[20%]">
            <Button className="!flex !items-center !gap-2 !w-full !text-[15px] !capitalize !text-black" onClick={openCategoryPanel}>
              <HiMenuAlt1 className="text-[18px]" />
              SHOP BY CATEGORIES
              <LiaAngleDownSolid className="text-[17px] ml-auto font-bold" />
            </Button>
          </div>

          <div className="w-[60%]">
            <ul className="flex items-center gap-[1.2rem] list-none p-0 m-0">
              {categories.slice(0, 7).map((category, idx) => (
                <li key={idx} className="relative list-none group/nav z-[1000]">
                  <span className="text-[16px] font-medium capitalize text-black/80 bg-transparent transition-colors hover:text-[#ff5252]"><Link to={`/products?category=${category.name}`} className="text-inherit no-underline">{category.name}</Link></span>
                  {category.subcategories && category.subcategories.length > 0 && (
                    <ul className="absolute top-[100%] left-0 min-w-[180px] bg-white py-2 shadow-[0_2px_8px_rgba(0,0,0,0.1)] hidden z-[1000] group-hover/nav:block">
                      {category.subcategories.map((sub, subIdx) => (
                        <li key={subIdx} className="relative py-2 px-3 cursor-pointer whitespace-nowrap group/sub">
                          <span className="block text-black text-[15px] font-medium group-hover/sub:text-[#ff5252]">
                            <Link to={`/products?category=${sub.name}`} className="text-inherit no-underline block w-full h-full">{sub.name}</Link>
                          </span>
                          {sub.items && sub.items.length > 0 && (
                            <ul className="absolute top-0 left-[100%] min-w-[150px] bg-white py-2 text-[14px] shadow-[0_2px_8px_rgba(0,0,0,0.1)] hidden group-hover/sub:block">
                              {sub.items.map((item, itemIdx) => (
                                <li key={itemIdx} className="py-1.5 px-3 cursor-pointer whitespace-nowrap hover:text-[#ff5252]">
                                    <Link to={`/products?category=${item}`} className="text-inherit no-underline block w-full h-full">{item}</Link>
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


          <div className="w-[20%]">
            <p className="text-[14px] font-medium flex items-center gap-3 m-0">
              <SlRocket className="text-[18px]" />
              Free International Delivery
            </p>
          </div>
        </div>
      </nav>

      <CategoryPanel isOpenCategoryPanel={isOpenCategoryPanel} setIsOpenCategoryPanel={setIsOpenCategoryPanel} />
      <hr/>
    </>
  );
};

export default Navigation;