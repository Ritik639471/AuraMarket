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
import SideBar from "../../components/SideBar";
import { Button, capitalize } from "@mui/material";
import { useSearchParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || '';
const ITEMS_PER_PAGE = 12;

const ProductListing = () => {
    const [ItemView, setItemView] = useState('grid');
    const [anchorEl, setAnchorEl] = useState(null);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sort, setSort] = useState('Name, A-Z');
    const [filters, setFilters] = useState({ categories: [], priceRange: [0, 10000], rating: null });
    const [searchParams] = useSearchParams();
    const [page, setPage] = useState(1);
    const searchQuery = searchParams.get('search');

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (sortOption) => {
        setAnchorEl(null);
        if (typeof sortOption === 'string') {
            setSort(sortOption);
        }
    };
    
    useEffect(() => {
        // Always fetch all products so client-side sidebar filters can work across all categories
        fetch(`${API_URL}/api/products`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setFilteredProducts(data);
            })
            .catch(err => console.error('ProductListing Fetch Error:', err));
    }, []);

    React.useEffect(() => {
        let result = [...products];

        // Apply text search filter if it exists
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(p => 
                p.name.toLowerCase().includes(query) || 
                p.category.toLowerCase().includes(query)
            );
        }

        if (filters.categories.length > 0) {
            result = result.filter(p => filters.categories.includes(p.category));
        }
        result = result.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);
        if (filters.rating) {
            result = result.filter(p => p.rating >= filters.rating);
        }

        // Apply sorting
        switch (sort) {
            case 'Name, A-Z':
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'Name, Z-A':
                result.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'Price Low to High':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'Price High to Low':
                result.sort((a, b) => b.price - a.price);
                break;
        }

        setFilteredProducts(result);
        setPage(1);
    }, [filters, products, sort]);

    const handleCategoryChange = (category) => {
        setFilters(prev => ({
            ...prev,
            categories: prev.categories.includes(category) 
                ? prev.categories.filter(c => c !== category) 
                : [...prev.categories, category]
        }));
    };

    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const paginatedProducts = filteredProducts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    return (
        <section className="pt-[10px]">
            <div className="breadcrumbs ">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/" className="link">
                        Home
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/products"
                        className="link"
                    >
                        {searchQuery ? searchQuery : 'All Products'}
                    </Link>
                </Breadcrumbs>
            </div>

            <div className="bg-white p-2 mt-4">
                <div className="container mx-auto max-w-[1300px] flex gap-3 px-4">
                    <div className="w-[20%] h-full bg-white">
                        <SideBar 
                            onCategoryChange={handleCategoryChange} 
                            onPriceChange={(range) => setFilters(prev => ({ ...prev, priceRange: range }))}
                            onRatingChange={(rating) => setFilters(prev => ({ ...prev, rating }))}
                        />
                    </div>

                    <div className="w-[80%] px-3">

                        <div className="bg-[#f1f1f1] p-2 w-[98.5%] mb-3 rounded-md flex justify-between items-center">
                            <div className="flex gap-5 items-center ml-2.5">
                                <Button className="!w-10 !h-10 !min-w-[40px] !rounded-full !text-black !text-lg" onClick={() => setItemView('grid')}>
                                    {
                                        ItemView === 'list' ?<TfiLayoutGrid2Alt style={{ color: 'rgba(0,0,0,0.7)', fontSize: '18px'}} />
                                        : <TfiLayoutGrid2Alt style={{ color:'#ff5252', fontSize: '20px' }} />
                                    }
                                </Button>
                                <Button className="!w-10 !h-10 !min-w-[40px] !rounded-full !text-black !text-lg" onClick={() => setItemView('list')}>
                                    {ItemView === 'grid' ?<TbListDetails style={{ color: 'rgba(0,0,0,0.7)', fontSize: '20px'}} />
                                    : <TbListDetails style={{ color:'#ff5252', fontSize: '24px' }} />}
                                </Button>

                                <span style={{ fontSize: '16px', fontWeight: 500, paddingLeft: '10px', color: 'rgba(0,0,0,0.7)' }}>
                                    There are {filteredProducts.length} products
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
                                    style={{ backgroundColor: 'white', border: '1px solid rgba(0,0,0,0.2)', borderRadius: '5px', color: 'black', textTransform: 'capitalize' }}

                                >
                                    {sort}
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={() => handleClose()}
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
                                        <div className="grid grid-cols-4 gap-3">
                                        {paginatedProducts.map(product => (
                                            <ProductItem key={product._id} product={product} />
                                        ))}
                                    </div>
                                    :
                                    <div className="grid grid-cols-1 gap-3">
                                        {paginatedProducts.map(product => (
                                            <ProductItemListView key={product._id} product={product} />
                                        ))}
                                    </div>
                                }
                            </div>
                        <div className="flex justify-center items-center mt-5">
                            <Pagination 
                                count={totalPages} 
                                page={page}
                                onChange={(e, value) => setPage(value)}
                                showFirstButton 
                                showLastButton 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductListing;