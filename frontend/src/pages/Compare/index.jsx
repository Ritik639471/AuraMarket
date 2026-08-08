import React from 'react';
import { Container, Typography, Box, Button, IconButton, Rating } from '@mui/material';
import { useCompare } from '../context/CompareContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Compare = () => {
    const { compareList, toggleCompare, clearCompare } = useCompare();
    const { addToCart } = useCart();
    const { showToast } = useToast();

    return (
        <Box sx={{ minHeight: '60vh', py: 6, backgroundColor: '#f9f9f9' }}>
            <Helmet>
                <title>Compare Products | AuraMarket</title>
            </Helmet>
            <Container maxWidth="xl">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#2b3445' }}>
                        Compare Products
                    </Typography>
                    {compareList.length > 0 && (
                        <Button 
                            variant="outlined" 
                            color="error" 
                            startIcon={<DeleteOutlineIcon />}
                            onClick={clearCompare}
                        >
                            Clear All
                        </Button>
                    )}
                </Box>

                {compareList.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 10 }}>
                        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                            Your compare list is empty.
                        </Typography>
                        <Button component={Link} to="/products" variant="contained" sx={{ backgroundColor: '#ff5252', '&:hover': { backgroundColor: '#e34e4e' } }}>
                            Continue Shopping
                        </Button>
                    </Box>
                ) : (
                    <Box sx={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', minWidth: '800px', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                            <tbody>
                                {/* Product Image & Basic Info */}
                                <tr>
                                    <td style={{ padding: '20px', borderRight: '1px solid #eee', borderBottom: '1px solid #eee', width: '20%', fontWeight: 700, color: '#555' }}>
                                        Product
                                    </td>
                                    {compareList.map(product => (
                                        <td key={product._id} style={{ padding: '20px', borderRight: '1px solid #eee', borderBottom: '1px solid #eee', width: `${80 / compareList.length}%`, textAlign: 'center', position: 'relative' }}>
                                            <IconButton 
                                                onClick={() => toggleCompare(product)}
                                                sx={{ position: 'absolute', top: 8, right: 8, color: '#999', '&:hover': { color: '#ff5252' } }}
                                                size="small"
                                            >
                                                <DeleteOutlineIcon fontSize="small" />
                                            </IconButton>
                                            <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
                                                <img 
                                                    src={product.images?.[0] || 'https://via.placeholder.com/200?text=No+Image'} 
                                                    alt={product.name} 
                                                    style={{ width: '150px', height: '150px', objectFit: 'contain', marginBottom: '12px' }}
                                                />
                                                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#2b3445', lineHeight: 1.2, minHeight: '40px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                                    {product.name}
                                                </Typography>
                                            </Link>
                                            <Typography variant="h6" sx={{ color: '#ff5252', fontWeight: 800, mt: 1 }}>
                                                ${product.price}
                                            </Typography>
                                        </td>
                                    ))}
                                </tr>

                                {/* Category */}
                                <tr>
                                    <td style={{ padding: '16px 20px', borderRight: '1px solid #eee', borderBottom: '1px solid #eee', fontWeight: 700, color: '#555', backgroundColor: '#fafafa' }}>
                                        Category
                                    </td>
                                    {compareList.map(product => (
                                        <td key={product._id} style={{ padding: '16px 20px', borderRight: '1px solid #eee', borderBottom: '1px solid #eee', textAlign: 'center', backgroundColor: '#fafafa' }}>
                                            {product.category}
                                        </td>
                                    ))}
                                </tr>

                                {/* Rating */}
                                <tr>
                                    <td style={{ padding: '16px 20px', borderRight: '1px solid #eee', borderBottom: '1px solid #eee', fontWeight: 700, color: '#555' }}>
                                        Rating
                                    </td>
                                    {compareList.map(product => (
                                        <td key={product._id} style={{ padding: '16px 20px', borderRight: '1px solid #eee', borderBottom: '1px solid #eee', textAlign: 'center' }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0.5 }}>
                                                <Rating value={product.rating || 4} readOnly size="small" />
                                                <Typography variant="body2" color="text.secondary">({product.numReviews || 0})</Typography>
                                            </Box>
                                        </td>
                                    ))}
                                </tr>

                                {/* Description */}
                                <tr>
                                    <td style={{ padding: '16px 20px', borderRight: '1px solid #eee', borderBottom: '1px solid #eee', fontWeight: 700, color: '#555', backgroundColor: '#fafafa' }}>
                                        Description
                                    </td>
                                    {compareList.map(product => (
                                        <td key={product._id} style={{ padding: '16px 20px', borderRight: '1px solid #eee', borderBottom: '1px solid #eee', textAlign: 'center', fontSize: '13px', color: '#666', backgroundColor: '#fafafa' }}>
                                            {product.description}
                                        </td>
                                    ))}
                                </tr>

                                {/* Actions */}
                                <tr>
                                    <td style={{ padding: '20px', borderRight: '1px solid #eee' }}></td>
                                    {compareList.map(product => (
                                        <td key={product._id} style={{ padding: '20px', borderRight: '1px solid #eee', textAlign: 'center' }}>
                                            <Button 
                                                variant="contained"
                                                onClick={() => { addToCart(product); showToast('🛒 Added to Cart!'); }}
                                                sx={{ backgroundColor: '#ff5252', '&:hover': { backgroundColor: '#e34e4e' }, fontWeight: 700, textTransform: 'none' }}
                                                fullWidth
                                            >
                                                Add to Cart
                                            </Button>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default Compare;
