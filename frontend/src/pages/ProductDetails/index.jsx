import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumbs, Link, Rating, Button, Box, IconButton, Typography } from '@mui/material';
import ProductZoom from "../../components/ProductZoom";
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Add, Remove } from '@mui/icons-material';

const API_URL = import.meta.env.VITE_API_URL || '';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const { wishlist, toggleWishlist } = useWishlist();

    useEffect(() => {
        fetch(`${API_URL}/api/products/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data));
    }, [id]);

    if (!product) return <div className="container mx-auto max-w-[1300px] mt-10">Loading product details...</div>;

    const isInWishlist = wishlist.some(item => (item._id || item) === product._id);

    return (
        <>
            <div className="py-5">
                <div className="container mx-auto max-w-[1300px] px-4">
                    <div className="breadcrumbs">
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link underline="hover" color="inherit" href="/" className="link">
                                Home
                            </Link>
                            <Link
                                underline="hover"
                                color="inherit"
                                href={`/products?search=${product.category}`}
                                className="link"
                            >
                                {product.category}
                            </Link>
                        </Breadcrumbs>
                    </div>
                </div>
            </div>

            <section className="px-20 py-5 bg-white flex justify-between gap-4 w-full">
                <div className="container mx-auto max-w-[1300px] flex gap-4 w-[40%]">
                    <div className="w-full">
                        <ProductZoom images={product.images} />
                    </div>
                </div>
                <div className="w-[60%] pt-2.5">
                    <h1 className="text-[32px] font-semibold mb-4">{product.name}</h1>
                    <div className="flex gap-4 items-center justify-items-center mb-2.5">
                        <span className="text-[14px] font-light text-gray-500 mb-2.5">
                            Brands : <span className="font-medium text-black/75">Premium</span>
                        </span>

                        <Rating name="size-small" defaultValue={5} size="small" readOnly />

                        <span className="text-[13px] cursor-pointer">
                            Review (5)
                        </span>
                    </div>

                    <div className="flex items-center gap-6 ml-2 mb-4">
                        <span className="text-[#ff5252] text-[18px] font-semibold">${product.price}</span>
                    </div>

                    <p className="text-[16px] leading-[25px] mb-5">
                        {product.description}
                    </p>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Typography variant="body1" sx={{ fontWeight: 500, mr: 1 }}>Quantity:</Typography>
                        <IconButton size="small" onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={quantity <= 1}>
                            <Remove />
                        </IconButton>
                        <Typography sx={{ minWidth: '30px', textAlign: 'center', fontWeight: 600 }}>{quantity}</Typography>
                        <IconButton size="small" onClick={() => setQuantity(q => q + 1)}>
                            <Add />
                        </IconButton>
                    </Box>

                    {product.stock > 0 ? (
                        <Typography variant="body2" sx={{ color: 'green', fontWeight: 600, mb: 2 }}>
                            In Stock ({product.stock} available)
                        </Typography>
                    ) : (
                        <Typography variant="body2" sx={{ color: 'red', fontWeight: 600, mb: 2 }}>
                            Out of Stock
                        </Typography>
                    )}

                    <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                        <Button 
                            variant="contained" 
                            size="large"
                            sx={{ backgroundColor: '#ff5252', '&:hover': { backgroundColor: '#e34e4e' }, px: 4, py: 1.5, borderRadius: '12px', fontWeight: 700 }}
                            onClick={() => addToCart(product, quantity)}
                            disabled={product.stock === 0}
                        >
                            Add to Cart
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            sx={{ 
                                borderColor: isInWishlist ? '#ff5252' : 'rgba(0,0,0,0.2)', 
                                color: isInWishlist ? '#ff5252' : 'inherit',
                                px: 3, py: 1.5, borderRadius: '12px'
                            }}
                            onClick={() => toggleWishlist(product._id)}
                            startIcon={isInWishlist ? <FaHeart style={{ color: '#ff5252' }} /> : <FaRegHeart />}
                        >
                            {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                        </Button>
                    </Box>
                </div>
            </section>
        </>
    )
}

export default ProductDetails;