import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { FaRegSquarePlus, FaRegSquareMinus } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || '';

const CategoryCollapse = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [submenuIndex, setSubmenuIndex] = useState(null);
  const [innerSubmenu, setInnerSubmenu] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/api/categories`)
      .then(res => res.json())
      .then(data => setCategoryData(data))
      .catch(err => console.error("Failed to load categories", err));
  }, []);

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

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category.name}`);
  };

  return (
    <ul className="list-none pl-0 m-0 w-full [&_ul]:list-none [&_li]:list-none">
      {categoryData.map((category, index) => (
        <li className="flex flex-col w-full" key={index}>
          <div className="relative flex items-center w-full">
            <Button className="!w-full !capitalize !justify-start !pl-[12px] !text-left !text-[16px] font-[550] !text-black/85 hover:!text-[#ff5252] transition-colors" onClick={() => handleCategoryClick(category)}>
              {category.name}
            </Button>
            {category.subcategories && category.subcategories.length > 0 && (
              submenuIndex === index ? (
                <FaRegSquareMinus className="absolute top-3 right-[15px] cursor-pointer text-gray-600 z-10" onClick={(e) => { e.stopPropagation(); openSubmenu(index); }} />
              ) : (
                <FaRegSquarePlus className="absolute top-3 right-[15px] cursor-pointer text-gray-600 z-10" onClick={(e) => { e.stopPropagation(); openSubmenu(index); }} />
              )
            )}
          </div>

          {submenuIndex === index && category.subcategories && category.subcategories.length > 0 && (
            <ul className="list-none pl-[25px] m-0">
              {category.subcategories.map((sub, subIdx) => (
                <li key={subIdx} className="flex flex-col w-full">
                  <div className="relative flex items-center w-full">
                    <Button className="!w-full !capitalize !justify-start !pl-[12px] !text-left !text-[15px] font-[470] !text-black/75 hover:!text-[#ff5252] transition-colors" onClick={() => navigate(`/products?category=${sub.name}`)}>
                      {sub.name}
                    </Button>
                    {sub.items && sub.items.length > 0 && (
                      innerSubmenu[index] === subIdx ? (
                        <FaRegSquareMinus
                          className="absolute top-3 right-[15px] cursor-pointer text-gray-500 z-10"
                          onClick={(e) => { e.stopPropagation(); openInnerSubmenu(index, subIdx); }}
                        />
                      ) : (
                        <FaRegSquarePlus
                          className="absolute top-3 right-[15px] cursor-pointer text-gray-500 z-10"
                          onClick={(e) => { e.stopPropagation(); openInnerSubmenu(index, subIdx); }}
                        />
                      )
                    )}
                  </div>

                  {innerSubmenu[index] === subIdx && sub.items && sub.items.length > 0 && (
                    <ul className="list-none pl-[25px] m-0">
                      {sub.items.map((item, itemIdx) => (
                        <li key={itemIdx}>
                          <Link to={`/products?category=${item}`} className="block py-[6px] px-[12px] pl-[12px] text-[14px] font-[400] text-black/70 no-underline transition-colors duration-200 hover:!text-[#ff5252]">{item}</Link>
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
