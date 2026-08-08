import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Breadcrumbs, Link, Rating, Button, Box, IconButton, Typography, Paper, TextField, Divider, Avatar, Chip } from '@mui/material';
import ProductZoom from "../../components/ProductZoom";
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Add, Remove, StarRate } from '@mui/icons-material';

const API_URL = import.meta.env.VITE_API_URL || '';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [reviewRating, setReviewRating] = useState(0);
    const [reviewComment, setReviewComment] = useState('');
    const [submittingReview, setSubmittingReview] = useState(false);
    const [reviewError, setReviewError] = useState('');
    const { addToCart } = useCart();
    const { wishlist, toggleWishlist } = useWishlist();
    const { user } = useAuth();
    const { showToast } = useToast();

    const fetchProduct = () => {
        fetch(`${API_URL}/api/products/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data));
    };

    useEffect(() => { fetchProduct(); }, [id]);

    if (!product) return <div className="container mx-auto max-w-[1300px] mt-10">Loading product details...</div>;

    const isInWishlist = wishlist.some(item => (item._id || item) === product._id);
    const averageRating = product.reviews?.length
        ? product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length
        : 0;

    const handleSubmitReview = async () => {
        if (!user) { setReviewError('Please log in to leave a review.'); return; }
        if (!reviewRating) { setReviewError('Please select a star rating.'); return; }
        if (!reviewComment.trim()) { setReviewError('Please write a comment.'); return; }
        setSubmittingReview(true);
        setReviewError('');
        try {
            const res = await fetch(`${API_URL}/api/products/${id}/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` },
                body: JSON.stringify({ rating: reviewRating, comment: reviewComment })
            });
            const data = await res.json();
            if (res.ok) {
                showToast('⭐ Review submitted!');
                setReviewRating(0);
                setReviewComment('');
                fetchProduct(); // reload to show new review
            } else {
                setReviewError(data.message || 'Could not submit review.');
            }
        } catch (err) {
            setReviewError('Network error. Try again.');
        }
        setSubmittingReview(false);
    };

    return (
        <>
            <Helmet>
                <title>{product.name} - AuraMarket</title>
                <meta name="description" content={product.description} />
                <meta property="og:title" content={product.name} />
                <meta property="og:description" content={product.description} />
                <meta property="og:image" content={product.images && product.images[0]} />
            </Helmet>
            <div className="py-5">
                <div className="container mx-auto max-w-[1300px] px-4">
                    <div className="breadcrumbs">
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link underline="hover" color="inherit" href="/" className="link">Home</Link>
                            <Link underline="hover" color="inherit" href={`/products?search=${product.category}`} className="link">
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
                        <Rating name="product-rating" value={averageRating} precision={0.5} size="small" readOnly />
                        <span className="text-[13px] text-gray-500">
                            ({product.numReviews || 0} {product.numReviews === 1 ? 'review' : 'reviews'})
                        </span>
                    </div>

                    {/* Category breadcrumbs */}
                    <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                        <Chip label={product.category} size="small" variant="outlined" onClick={() => window.location.href = `/products?search=${product.category}`} />
                        {product.subCategory && <Chip label={product.subCategory} size="small" variant="outlined" color="primary" onClick={() => window.location.href = `/products?search=${product.subCategory}`} />}
                        {product.division && <Chip label={product.division} size="small" variant="outlined" color="secondary" onClick={() => window.location.href = `/products?search=${product.division}`} />}
                    </Box>

                    <div className="flex items-center gap-6 ml-2 mb-4">
                        <span className="text-[#ff5252] text-[18px] font-semibold">${product.price}</span>
                    </div>
                    <p className="text-[16px] leading-[25px] mb-5">{product.description}</p>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Typography variant="body1" sx={{ fontWeight: 500, mr: 1 }}>Quantity:</Typography>
                        <IconButton size="small" onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={quantity <= 1}><Remove /></IconButton>
                        <Typography sx={{ minWidth: '30px', textAlign: 'center', fontWeight: 600 }}>{quantity}</Typography>
                        <IconButton size="small" onClick={() => setQuantity(q => q + 1)}><Add /></IconButton>
                    </Box>

                    {product.stock > 0 ? (
                        <Typography variant="body2" sx={{ color: 'green', fontWeight: 600, mb: 2 }}>In Stock ({product.stock} available)</Typography>
                    ) : (
                        <Typography variant="body2" sx={{ color: 'red', fontWeight: 600, mb: 2 }}>Out of Stock</Typography>
                    )}

                    <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                        <Button variant="contained" size="large"
                            sx={{ backgroundColor: '#ff5252', '&:hover': { backgroundColor: '#e34e4e' }, px: 4, py: 1.5, borderRadius: '12px', fontWeight: 700 }}
                            onClick={() => { addToCart(product, quantity); showToast('🛒 Added to Cart!'); }}
                            disabled={product.stock === 0}>
                            Add to Cart
                        </Button>
                        <Button variant="outlined" size="large"
                            sx={{ borderColor: isInWishlist ? '#ff5252' : 'rgba(0,0,0,0.2)', color: isInWishlist ? '#ff5252' : 'inherit', px: 3, py: 1.5, borderRadius: '12px' }}
                            onClick={() => { toggleWishlist(product._id); showToast(isInWishlist ? 'Removed from Wishlist' : '❤️ Added to Wishlist', isInWishlist ? 'info' : 'success'); }}
                            startIcon={isInWishlist ? <FaHeart style={{ color: '#ff5252' }} /> : <FaRegHeart />}>
                            {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                        </Button>
                    </Box>
                </div>
            </section>

            {/* ===== Reviews Section ===== */}
            <section className="container mx-auto max-w-[1300px] px-4 py-8">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                    <StarRate sx={{ color: '#ff5252', fontSize: 28 }} />
                    <Typography variant="h5" sx={{ fontWeight: 800, color: '#2b3445' }}>
                        Customer Reviews
                    </Typography>
                    {product.reviews?.length > 0 && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
                            <Rating value={averageRating} precision={0.5} size="small" readOnly />
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{averageRating.toFixed(1)} / 5</Typography>
                            <Typography variant="body2" color="text.secondary">({product.numReviews} reviews)</Typography>
                        </Box>
                    )}
                </Box>

                <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {/* Existing Reviews */}
                    <Box sx={{ flex: 2, minWidth: 300 }}>
                        {product.reviews?.length === 0 ? (
                            <Paper elevation={0} sx={{ p: 4, textAlign: 'center', border: '1px dashed #ddd', borderRadius: '16px' }}>
                                <Typography color="text.secondary">No reviews yet. Be the first to review!</Typography>
                            </Paper>
                        ) : (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {product.reviews?.map((review, idx) => (
                                    <Paper key={idx} elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #e8ecf0' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                            <Avatar sx={{ width: 36, height: 36, backgroundColor: '#ff5252', fontSize: '0.9rem', fontWeight: 700 }}>
                                                {review.name?.charAt(0).toUpperCase()}
                                            </Avatar>
                                            <Box>
                                                <Typography variant="body2" sx={{ fontWeight: 700 }}>{review.name}</Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {new Date(review.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                </Typography>
                                            </Box>
                                            <Rating value={review.rating} size="small" readOnly sx={{ ml: 'auto' }} />
                                        </Box>
                                        <Typography variant="body2" color="text.secondary">{review.comment}</Typography>
                                    </Paper>
                                ))}
                            </Box>
                        )}
                    </Box>

                    {/* Write a Review */}
                    <Paper elevation={0} sx={{ flex: 1, minWidth: 280, p: 3, borderRadius: '16px', border: '1px solid #e8ecf0', alignSelf: 'flex-start' }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Write a Review</Typography>
                        {!user ? (
                            <Typography variant="body2" color="text.secondary">
                                <Link href="/login" color="primary">Log in</Link> to write a review.
                            </Typography>
                        ) : (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Box>
                                    <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>Your Rating *</Typography>
                                    <Rating
                                        name="review-rating"
                                        value={reviewRating}
                                        onChange={(_, newValue) => setReviewRating(newValue)}
                                        size="large"
                                    />
                                </Box>
                                <TextField
                                    id="review-comment"
                                    label="Your Review *"
                                    name="comment"
                                    multiline rows={4}
                                    fullWidth
                                    value={reviewComment}
                                    onChange={e => setReviewComment(e.target.value)}
                                    placeholder="Share your experience with this product..."
                                />
                                {reviewError && <Typography variant="body2" color="error">{reviewError}</Typography>}
                                <Button variant="contained" onClick={handleSubmitReview} disabled={submittingReview}
                                    sx={{ borderRadius: '10px', backgroundColor: '#ff5252', '&:hover': { backgroundColor: '#e34e4e' } }}>
                                    {submittingReview ? 'Submitting...' : 'Submit Review'}
                                </Button>
                            </Box>
                        )}
                    </Paper>
                </Box>
            </section>
        </>
    );
};

export default ProductDetails;