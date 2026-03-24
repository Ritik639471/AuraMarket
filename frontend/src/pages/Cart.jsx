import React from 'react';
import { Container, Typography, Grid, Box, Paper, Button, IconButton, Divider } from '@mui/material';
import { Delete, Add, Remove } from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, removeFromCart, addToCart, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleCheckout = async () => {
        const orderData = {
            items: cart.map(item => ({
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.price
            })),
            totalAmount: total,
            shippingAddress: 'Update your address in profile' // Placholder
        };

        const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(orderData)
        });

        if (res.ok) {
            alert('Order placed successfully! 🚀');
            clearCart();
            navigate('/');
        }
    };

    const total = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

    return (
        <Box>
            <Container sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom>My Shopping Cart</Typography>
                {cart.length === 0 ? (
                    <Box sx={{ textAlign: 'center', mt: 8 }}>
                        <Typography variant="h6">Your cart is empty.</Typography>
                        <Button component={Link} to="/products" variant="contained" sx={{ mt: 2 }}>
                            Start Shopping
                        </Button>
                    </Box>
                ) : (
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={8}>
                            {cart.map((item) => (
                                <Paper key={item.product._id} elevation={1} sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Box sx={{ width: 100, height: 100, borderRadius: '8px', overflow: 'hidden' }}>
                                        <img src={item.product.image} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </Box>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant="h6">{item.product.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">{item.product.category}</Typography>
                                        <Typography variant="h6" color="primary">${item.product.price}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <IconButton size="small" onClick={() => addToCart(item.product, -1)} disabled={item.quantity <= 1}>
                                            <Remove />
                                        </IconButton>
                                        <Typography>{item.quantity}</Typography>
                                        <IconButton size="small" onClick={() => addToCart(item.product, 1)}>
                                            <Add />
                                        </IconButton>
                                    </Box>
                                    <IconButton color="error" onClick={() => removeFromCart(item.product._id)}>
                                        <Delete />
                                    </IconButton>
                                </Paper>
                            ))}
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper elevation={3} sx={{ p: 3, borderRadius: '16px', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)' }}>
                                <Typography variant="h6" gutterBottom>Order Summary</Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography>Subtotal</Typography>
                                    <Typography>${total.toFixed(2)}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography>Shipping</Typography>
                                    <Typography>Free</Typography>
                                </Box>
                                <Divider sx={{ my: 2 }} />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                    <Typography variant="h6">Total</Typography>
                                    <Typography variant="h6" color="primary">${total.toFixed(2)}</Typography>
                                </Box>
                                <Button 
                                    variant="contained" 
                                    fullWidth size="large" 
                                    sx={{ borderRadius: '12px', py: 1.5 }}
                                    onClick={handleCheckout}
                                >
                                    Proceed to Checkout
                                </Button>
                            </Paper>
                        </Grid>
                    </Grid>
                )}
            </Container>
        </Box>
    );
};

export default Cart;
