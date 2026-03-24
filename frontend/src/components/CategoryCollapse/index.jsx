// CategoryList.jsx
import React from 'react';
import { Button } from '@mui/material';
import { FaRegSquarePlus, FaRegSquareMinus } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import './style.css'

const CategoryCollapse = () => {
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

  const [submenuIndex, setSubmenuIndex] = React.useState(null);
  const [innerSubmenu, setInnerSubmenu] = React.useState({});

  const openSubmenu = (index) => {
    setSubmenuIndex(submenuIndex === index ? null : index);
    setInnerSubmenu({});
  };

  const openInnerSubmenu = (catIdx, subIdx) => {
    setInnerSubmenu((prev) => ({
      ...prev,
      [catIdx]: prev[catIdx] === subIdx ? null : subIdx
    }));
  };

  return (
    <ul className="category-list">
      {categoryData.map((category, index) => (
        <li className="category-item" key={index}>
          <div className="category-header">
            <Button className="category-button link" onClick={() => openSubmenu(index)}>
              {category.name}
            </Button>
            {submenuIndex === index ? (
              <FaRegSquareMinus className="toggle-icon" onClick={() => openSubmenu(index)} />
            ) : (
              <FaRegSquarePlus className="toggle-icon" onClick={() => openSubmenu(index)} />
            )}
          </div>

          {submenuIndex === index && category.subcategories.length > 0 && (
            <ul className="submenu">
              {category.subcategories.map((sub, subIdx) => (
                <li key={subIdx} className="subcategory-item">
                  <div className="subcategory-header">
                    <Button className="subcategory-button link" onClick={() => openInnerSubmenu(index, subIdx)}>
                      {sub.name}
                    </Button>
                    {sub.items.length > 0 && (
                      innerSubmenu[index] === subIdx ? (
                        <FaRegSquareMinus
                          className="toggle-icon"
                          onClick={() => openInnerSubmenu(index, subIdx)}
                        />
                      ) : (
                        <FaRegSquarePlus
                          className="toggle-icon"
                          onClick={() => openInnerSubmenu(index, subIdx)}
                        />
                      )
                    )}
                  </div>

                  {innerSubmenu[index] === subIdx && sub.items.length > 0 && (
                    <ul className="inner_submenu">
                      {sub.items.map((item, itemIdx) => (
                        <li key={itemIdx}>
                          <Link to="/" className="link">{item}</Link>
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
  );
};

export default CategoryCollapse;
