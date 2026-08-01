import React from "react";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { Collapse } from 'react-collapse';
import { LiaAngleDownSolid , LiaAngleUpSolid } from "react-icons/lia";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import Rating from '@mui/material/Rating';
import {Button} from "@mui/material";

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
        <aside className="w-full">
            <div className="mb-4">
                <h3 className="text-[18px] font-semibold flex items-center gap-2.5 mb-2">
                    Shop By Category
                    <button className="w-[30px] h-[30px] min-w-[30px] text-[18px] border-none bg-white font-semibold text-black cursor-pointer flex items-center justify-center" onClick={()=> setIsOpenedCategory(!isOpenedCategory)}>
                        {!isOpenedCategory ? <LiaAngleDownSolid  />:
                        <LiaAngleUpSolid />}
                    </button>
                </h3>
                <Collapse isOpened={isOpenedCategory}>
                    <div className="flex flex-col max-w-[60%] pl-5 max-h-[200px] overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-thumb]:bg-[#ccc] [&::-webkit-scrollbar-thumb]:rounded-full">
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
            <div className="mb-4">
                <h3 className="text-[18px] font-semibold flex items-center gap-2.5 mb-2">
                    Availability
                    <button className="w-[30px] h-[30px] min-w-[30px] text-[18px] border-none bg-white font-semibold text-black cursor-pointer flex items-center justify-center" onClick={()=> setIsOpenedAvail(!isOpenedAvail)}>
                        {!isOpenedAvail ? <LiaAngleDownSolid  />:
                        <LiaAngleUpSolid />}
                    </button>
                </h3>
                <Collapse isOpened={isOpenedAvail}>
                    <div className="flex flex-col max-w-[60%] pl-5 max-h-[200px] overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-thumb]:bg-[#ccc] [&::-webkit-scrollbar-thumb]:rounded-full">
                        <FormControlLabel control={<Checkbox size="small" />} label="Available" />
                        <FormControlLabel control={<Checkbox size="small" />} label="Out of Stock" />
                        <FormControlLabel control={<Checkbox size="small" />} label="Coming Soon" />
                    </div>
                </Collapse>
            </div>
            <div className="mb-4">
                <h3 className="text-[18px] font-semibold flex items-center gap-2.5 mb-2">
                    Size
                    <button className="w-[30px] h-[30px] min-w-[30px] text-[18px] border-none bg-white font-semibold text-black cursor-pointer flex items-center justify-center" onClick={()=> setIsOpenedSize(!isOpenedSize)}>
                        {!isOpenedSize ? <LiaAngleDownSolid  />:
                        <LiaAngleUpSolid />}
                    </button>
                </h3>
                <Collapse isOpened={isOpenedSize}>
                    <div className="flex flex-col max-w-[60%] pl-5 max-h-[200px] overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-thumb]:bg-[#ccc] [&::-webkit-scrollbar-thumb]:rounded-full">
                        <FormControlLabel control={<Checkbox size="small" />} label="Small" />
                        <FormControlLabel control={<Checkbox size="small" />} label="Medium" />
                        <FormControlLabel control={<Checkbox size="small" />} label="Large" />
                        <FormControlLabel control={<Checkbox size="small" />} label="Extra Large" />
                        <FormControlLabel control={<Checkbox size="small" />} label="XXL" />
                    </div>
                </Collapse>
            </div>
            <div className="mb-4">
                <h3 className="text-[18px] font-semibold flex items-center gap-2.5 mb-2">
                    Filter By Price
                </h3>
                <RangeSlider min={0} max={5000} value={priceRange} onInput={setPriceRange} onThumbDragEnd={() => onPriceChange && onPriceChange(priceRange)} />
                <div className="flex pt-4 pb-2">
                    <span className="text-[14px]">
                        From: <strong className="text-gray-900">Rs:{priceRange[0]}</strong>
                    </span>
                    <span className="ml-auto text-[14px]">
                        To: <strong className="text-gray-900">Rs:{priceRange[1]}</strong>
                    </span>
                </div>
            </div>
            <div className="mb-4">
                <h3 className="text-[18px] font-semibold flex items-center gap-2.5 mb-2">
                    Filter By Rating
                </h3>
                <div className="w-full flex gap-4 flex-col">
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