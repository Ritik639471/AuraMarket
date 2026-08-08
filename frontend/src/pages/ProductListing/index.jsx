import React, { useState, useEffect, useCallback } from "react";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import MuiLink from '@mui/material/Link';
import ProductItem from "../../components/ProductItem";
import ProductItemListView from "../../components/ProductItemListView";

import { TfiLayoutGrid2Alt } from "react-icons/tfi";
import { TbListDetails } from "react-icons/tb";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Pagination from '@mui/material/Pagination';
import SideBar from "../../components/SideBar";
import { Button, Skeleton } from "@mui/material";
import { useSearchParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || '';
const ITEMS_PER_PAGE = 12;

const SORT_OPTIONS = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Name, A-Z', value: 'name_asc' },
  { label: 'Name, Z-A', value: 'name_desc' },
  { label: 'Price Low to High', value: 'price_asc' },
  { label: 'Price High to Low', value: 'price_desc' },
  { label: 'Top Rated', value: 'rating' },
];

const ProductListing = () => {
  const [ItemView, setItemView] = useState('grid');
  const [anchorEl, setAnchorEl] = useState(null);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState('newest');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [dynamicPriceRange, setDynamicPriceRange] = useState([0, 10000]);
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const searchQuery = searchParams.get('search');
  const categoryQuery = searchParams.get('category');

  const open = Boolean(anchorEl);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page,
        limit: ITEMS_PER_PAGE,
        sort,
        ...(searchQuery && { search: searchQuery }),
        ...(priceRange[0] > 0 && { minPrice: priceRange[0] }),
        ...(priceRange[1] < 10000 && { maxPrice: priceRange[1] }),
        ...(categoryQuery && { category: categoryQuery }),
      });

      const res = await fetch(`${API_URL}/api/products?${params}`);
      const data = await res.json();
      const productList = Array.isArray(data) ? data : (data.products || []);
      setProducts(productList);
      setTotal(data.total || productList.length);
      setTotalPages(data.pages || Math.ceil((data.total || productList.length) / ITEMS_PER_PAGE));

      // Dynamic price range based on returned products
      if (productList.length > 0) {
        const prices = productList.map(p => p.price);
        setDynamicPriceRange([Math.min(...prices), Math.max(...prices)]);
      }
    } catch (err) {
      console.error('ProductListing Fetch Error:', err);
    }
    setLoading(false);
  }, [page, sort, searchQuery, categoryQuery, priceRange]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, categoryQuery, sort]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);



  const handleClose = (sortOption) => {
    setAnchorEl(null);
    if (typeof sortOption === 'string') setSort(sortOption);
  };

  const sortLabel = SORT_OPTIONS.find(o => o.value === sort)?.label || 'Sort';

  return (
    <section className="pt-[10px]">
      <div className="breadcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <MuiLink underline="hover" color="inherit" href="/">Home</MuiLink>
          <MuiLink underline="hover" color="inherit" href="/products">
            {searchQuery ? searchQuery : 'All Products'}
          </MuiLink>
        </Breadcrumbs>
      </div>

      <div className="bg-white p-2 mt-4">
        <div className="container mx-auto max-w-[1300px] flex gap-3 px-4">
          <div className="w-[20%] h-full bg-white">
            <SideBar
              onPriceChange={(range) => setPriceRange(range)}
              onRatingChange={() => {}}
              dynamicPriceRange={dynamicPriceRange}
            />
          </div>

          <div className="w-[80%] px-3">
            <div className="bg-[#f1f1f1] p-2 w-[98.5%] mb-3 rounded-md flex justify-between items-center">
              <div className="flex gap-5 items-center ml-2.5">
                <Button className="!w-10 !h-10 !min-w-[40px] !rounded-full !text-black !text-lg" onClick={() => setItemView('grid')}>
                  {ItemView === 'list' ?
                    <TfiLayoutGrid2Alt style={{ color: 'rgba(0,0,0,0.7)', fontSize: '18px' }} /> :
                    <TfiLayoutGrid2Alt style={{ color: '#ff5252', fontSize: '20px' }} />
                  }
                </Button>
                <Button className="!w-10 !h-10 !min-w-[40px] !rounded-full !text-black !text-lg" onClick={() => setItemView('list')}>
                  {ItemView === 'grid' ?
                    <TbListDetails style={{ color: 'rgba(0,0,0,0.7)', fontSize: '20px' }} /> :
                    <TbListDetails style={{ color: '#ff5252', fontSize: '24px' }} />
                  }
                </Button>
                <span style={{ fontSize: '16px', fontWeight: 500, paddingLeft: '10px', color: 'rgba(0,0,0,0.7)' }}>
                  {loading ? 'Loading...' : `${total} products`}
                </span>
              </div>

              <div className="product-listing-sort" style={{ display: 'flex', alignItems: 'center', justifyContent: 'end', marginLeft: 'auto', gap: '10px' }}>
                <span style={{ fontSize: '16px', fontWeight: 500, paddingLeft: '10px', color: 'rgba(0,0,0,0.7)' }}>Sort by</span>
                <Button
                  id="sort-button"
                  aria-controls={open ? 'sort-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={e => setAnchorEl(e.currentTarget)}
                  style={{ backgroundColor: 'white', border: '1px solid rgba(0,0,0,0.2)', borderRadius: '5px', color: 'black', textTransform: 'capitalize' }}
                >
                  {sortLabel}
                </Button>
                <Menu id="sort-menu" anchorEl={anchorEl} open={open} onClose={() => handleClose()} slotProps={{ list: { 'aria-labelledby': 'sort-button' } }}>
                  {SORT_OPTIONS.map(opt => (
                    <MenuItem key={opt.value} onClick={() => handleClose(opt.value)} selected={sort === opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </div>

            <div className="product-wrapper">
              {loading ? (
                <div className={`grid ${ItemView === 'grid' ? 'grid-cols-4' : 'grid-cols-1'} gap-3`}>
                  {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="flex flex-col gap-2 p-3 bg-white rounded-md shadow-sm border border-gray-100">
                      <Skeleton variant="rectangular" width="100%" height={ItemView === 'grid' ? 250 : 150} sx={{ borderRadius: '10px' }} />
                      <Skeleton variant="text" width="80%" height={24} />
                      <Skeleton variant="text" width="40%" height={20} />
                      <Skeleton variant="rectangular" width="100%" height={40} sx={{ mt: 2, borderRadius: '5px' }} />
                    </div>
                  ))}
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-16 text-gray-500">
                  <p className="text-xl font-semibold">No products found</p>
                  <p className="text-sm mt-1">Try adjusting your filters or search query.</p>
                </div>
              ) : ItemView === 'grid' ? (
                <div className="grid grid-cols-4 gap-3">
                  {products.map(product => <ProductItem key={product._id} product={product} />)}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {products.map(product => <ProductItemListView key={product._id} product={product} />)}
                </div>
              )}
            </div>

            <div className="flex justify-center items-center mt-5">
              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, value) => { setPage(value); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                showFirstButton showLastButton
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductListing;