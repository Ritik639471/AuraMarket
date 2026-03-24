import React, { useState, useEffect } from "react";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import ProductItem from "../../components/ProductItem";
import ProductItemListView from "../../components/ProductItemListView";
import { TfiLayoutGrid2Alt } from "react-icons/tfi";
import { TbListDetails } from "react-icons/tb";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Pagination from '@mui/material/Pagination';

import "./style.css";
import SideBar from "../../components/SideBar";
import { Button, capitalize } from "@mui/material";
import { useSearchParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || '';

const ProductListing = () => {
    const [ItemView, setItemView] = useState('grid');
    const [anchorEl, setAnchorEl] = useState(null);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sort, setSort] = useState('Name, A-Z');
    const [filters, setFilters] = useState({ categories: [], priceRange: [0, 10000], rating: null });
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search');
    
    useEffect(() => {
        const url = searchQuery 
            ? `${API_URL}/api/products/search?q=${searchQuery}`
            : `${API_URL}/api/products`;
            
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setFilteredProducts(data);
            })
            .catch(err => console.error('ProductListing Fetch Error:', err));
    }, [searchQuery]);

    React.useEffect(() => {
        let result = [...products];
        if (filters.categories.length > 0) {
            result = result.filter(p => filters.categories.includes(p.category));
        }
        result = result.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);
        if (filters.rating) {
            result = result.filter(p => p.rating >= filters.rating);
        }
        setFilteredProducts(result);
    }, [filters, products]);

    const handleCategoryChange = (category) => {
        setFilters(prev => ({
            ...prev,
            categories: prev.categories.includes(category) 
                ? prev.categories.filter(c => c !== category) 
                : [...prev.categories, category]
        }));
    };
    return (
        <section className="product-listing">
            <div className="breadcrumbs ">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/" className="link">
                        Home
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/"
                        className="link"
                    >
                        Fashion
                    </Link>
                </Breadcrumbs>
            </div>

            <div className="product-listing-wrapper">
                <div className="container">
                    <div className="sidebar-wrapper">
                        <SideBar 
                            onCategoryChange={handleCategoryChange} 
                            onPriceChange={(range) => setFilters(prev => ({ ...prev, priceRange: range }))}
                            onRatingChange={(rating) => setFilters(prev => ({ ...prev, rating }))}
                        />
                    </div>

                    <div className="product-listing-content">

                        <div className="product-listing-header">
                            <div className="product-listing-icon">
                                <Button className="product-header-icon" onClick={() => setItemView('grid')}>
                                    {
                                        ItemView === 'list' ?<TfiLayoutGrid2Alt style={{ color: 'rgba(0,0,0,0.7)', fontSize: '18px'}} />
                                        : <TfiLayoutGrid2Alt style={{ color:'#ff5252', fontSize: '20px' }} />
                                    }
                                </Button>
                                <Button className="product-header-icon" onClick={() => setItemView('list')}>
                                    {ItemView === 'grid' ?<TbListDetails style={{ color: 'rgba(0,0,0,0.7)', fontSize: '20px'}} />
                                    : <TbListDetails style={{ color:'#ff5252', fontSize: '24px' }} />}
                                </Button>

                                <span style={{ fontSize: '16px', fontWeight: 500, paddingLeft: '10px', color: 'rgba(0,0,0,0.7)' }}>
                                    There are 15 products
                                </span>
                            </div>

                            <div className="product-listing-sort" style={{ display: 'flex', alignItems: 'center', justifyContent: 'end', marginLeft: 'auto', gap: '10px' }}>
                                <span style={{ fontSize: '16px', fontWeight: 500, paddingLeft: '10px', color: 'rgba(0,0,0,0.7)' }}>
                                    Sort by
                                </span>

                                <Button
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    style={{ backgroundColor: 'white', border: '1px solid rgba(0,0,0,0.2)', borderRadius: '5px', color: 'black', text: capitalize }}

                                >
                                    Name, A-Z
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    slotProps={{
                                        list: {
                                            'aria-labelledby': 'basic-button',
                                        },
                                    }}
                                >
                                        <MenuItem onClick={() => handleClose('Name, A-Z')}>Name, A-Z</MenuItem>
                                        <MenuItem onClick={() => handleClose('Name, Z-A')}>Name, Z-A</MenuItem>
                                        <MenuItem onClick={() => handleClose('Price Low to High')}>Price Low to High</MenuItem>
                                        <MenuItem onClick={() => handleClose('Price High to Low')}>Price High to Low</MenuItem>
                                    </Menu>
                                </div>
                            </div>

                            <div className="product-wrapper">
                                {
                                    ItemView === 'grid' ?
                                        <div className="product-grid">
                                        {filteredProducts.map(product => (
                                            <ProductItem key={product._id} product={product} />
                                        ))}
                                    </div>
                                    :
                                    <div className="product-list">
                                        {filteredProducts.map(product => (
                                            <ProductItemListView key={product._id} product={product} />
                                        ))}
                                    </div>
                                }
                            </div>
                        <div className="pagination-wrapper">
                            <Pagination count={10} showFirstButton showLastButton />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductListing;