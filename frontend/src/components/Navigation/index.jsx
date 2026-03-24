import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { HiMenuAlt1 } from "react-icons/hi";
import { LiaAngleDownSolid } from "react-icons/lia";
import { Link } from 'react-router-dom';
import { SlRocket } from "react-icons/sl";
import './nav.css';
import CategoryPanel from './CategoryPanel';

const categoryData = [
  {
    name: "Fashion",
    subcategories: [
      { name: "Women", items: ["Sarees", "Tops", "Jeans"] },
      { name: "Girls", items: ["Kurtas & Suits", "Tops"] },
      { name: "Children", items: ["T-shirt", "Jeans", "Kurtis", "Lower & Pants"] },
      { name: "Men", items: ["Jeans", "Formal", "T-shirt"] },
    ]
  },
  {
    name: "Electronics",
    subcategories: [
      { name: "Laptops", items: ["Lenovo", "Asus", "Dell", "MAC"] },
      { name: "Smart Watch", items: ["Samsung", "Apple", "OnePlus", "Fitbit"] },
      { name: "Mobile", items: ["Apple", "Samsung", "OPPO", "Vivo", "OnePlus"] },
    ]
  },
  {
    name: "Bags",
    subcategories: [
      { name: "Men Bags", items: [] },
      { name: "Women Bags", items: [] },
      { name: "Kids Bags", items: [] },
    ]
  },
  {
    name: "Footwears",
    subcategories: [
      { name: "Men", items: [] },
      { name: "Women", items: [] },
      { name: "Kids", items: [] },
    ]
  },
  { name: "Groceries", subcategories: [] },
  { name: "Beauty", subcategories: [] },
  { name: "Wellness", subcategories: [] },
  { name: "Jewellery", subcategories: [] },
  { name: "Home Decor", subcategories: [] },
];

const Navigation = () => {
  const [isOpenCategoryPanel, setIsOpenCategoryPanel] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredSubcategory, setHoveredSubcategory] = useState(null);
  const openCategoryPanel=()=>{
    setIsOpenCategoryPanel(true);
  }

  return (
    <>
      <nav className="navigation">
        <div className="col">
          <div className="col1">
            <Button className="category-btn" onClick={openCategoryPanel}>
              <HiMenuAlt1 className="icon" />
              SHOP BY CATEGORIES
              <LiaAngleDownSolid className="dropdown-icon" />
            </Button>
          </div>

          <div className="col2">
            <ul className="nav-list">
              {categoryData.map((category, idx) => (
                <li key={idx} className="nav-item dropdown">
                  <span className="nav-button">{category.name}</span>
                  {category.subcategories.length > 0 && (
                    <ul className="submenu">
                      {category.subcategories.map((sub, subIdx) => (
                        <li key={subIdx} className="submenu-item">
                          <span className="submenu-title">{sub.name}</span>
                          {sub.items.length > 0 && (
                            <ul className="inner-submenu">
                              {sub.items.map((item, itemIdx) => (
                                <li key={itemIdx} className="inner-submenu-item">{item}</li>
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


          <div className="col3">
            <p className="delivery-note">
              <SlRocket className="icon" />
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