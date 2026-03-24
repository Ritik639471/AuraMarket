import React from "react";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { Collapse } from 'react-collapse';
import { LiaAngleDownSolid , LiaAngleUpSolid } from "react-icons/lia";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import Rating from '@mui/material/Rating';
import {Button} from "@mui/material";

import "./style.css";

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

const SideBar = ({ onCategoryChange, onPriceChange, onRatingChange }) => {
    const [isOpenedCategory, setIsOpenedCategory] = React.useState(true);
    const [isOpenedAvail, setIsOpenedAvail] = React.useState(false);
    const [isOpenedSize, setIsOpenedSize] = React.useState(false);
    const [priceRange, setPriceRange] = React.useState([0, 5000]);

    const handleCategoryToggle = (category) => {
        if (onCategoryChange) onCategoryChange(category);
    };

    const handlePriceEnd = (value) => {
        setPriceRange(value);
        if (onPriceChange) onPriceChange(value);
    };


    return (
        <aside className="sidebar">
            <div className="siebar-header">
                <h3 className="sidebar-title">
                    Shop By Category
                    <button className="close-btn" onClick={()=> setIsOpenedCategory(!isOpenedCategory)}>
                        {!isOpenedCategory ? <LiaAngleDownSolid  />:
                        <LiaAngleUpSolid />}
                    </button>
                </h3>
                <Collapse isOpened={isOpenedCategory}>
                    <div className="category-scroll">
                        {["Fashion", "Electronics", "Bags", "Footwears", "Groceries", "Beauty", "Wellness", "Jewellery", "Home Decor"].map(cat => (
                            <FormControlLabel 
                                key={cat}
                                control={<Checkbox size="small" onChange={() => handleCategoryToggle(cat)} />} 
                                label={cat} 
                            />
                        ))}
                    </div>
                </Collapse>
            </div>
            <div className="siebar-header">
                <h3 className="sidebar-title">
                    Availability
                    <button className="close-btn" onClick={()=> setIsOpenedAvail(!isOpenedAvail)}>
                        {!isOpenedAvail ? <LiaAngleDownSolid  />:
                        <LiaAngleUpSolid />}
                    </button>
                </h3>
                <Collapse isOpened={isOpenedAvail}>
                    <div className="category-scroll">
                        <FormControlLabel control={<Checkbox size="small" />} label="Available" />
                        <FormControlLabel control={<Checkbox size="small" />} label="Out of Stock" />
                        <FormControlLabel control={<Checkbox size="small" />} label="Coming Soon" />
                    </div>
                </Collapse>
            </div>
            <div className="siebar-header">
                <h3 className="sidebar-title">
                    Size
                    <button className="close-btn" onClick={()=> setIsOpenedSize(!isOpenedSize)}>
                        {!isOpenedSize ? <LiaAngleDownSolid  />:
                        <LiaAngleUpSolid />}
                    </button>
                </h3>
                <Collapse isOpened={isOpenedSize}>
                    <div className="category-scroll">
                        <FormControlLabel control={<Checkbox size="small" />} label="Small" />
                        <FormControlLabel control={<Checkbox size="small" />} label="Medium" />
                        <FormControlLabel control={<Checkbox size="small" />} label="Large" />
                        <FormControlLabel control={<Checkbox size="small" />} label="Extra Large" />
                        <FormControlLabel control={<Checkbox size="small" />} label="XXL" />
                    </div>
                </Collapse>
            </div>
            <div className="siebar-header">
                <h3 className="sidebar-title">
                    Filter By Price
                </h3>
                <RangeSlider onInput={setPriceRange} onThumbDragEnd={() => onPriceChange && onPriceChange(priceRange)} />
                <div className="filter-detail">
                    <span className="price-min">
                        From: <strong className="text-dark">Rs:{priceRange[0]}</strong>
                    </span>
                    <span className="price-max">
                        To: <strong className="text-dark">Rs:{priceRange[1]}</strong>
                    </span>
                </div>
            </div>
            <div className="siebar-header">
                <h3 className="sidebar-title">
                    Filter By Rating
                </h3>
                <div className="rating-wrapper">
                    {[5, 4, 3, 2, 1].map(r => (
                        <div key={r} style={{ cursor: 'pointer' }} onClick={() => onRatingChange && onRatingChange(r)}>
                            <Rating name={`rating-${r}`} defaultValue={r} size="small" readOnly />
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    )
}

export default SideBar;