import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Table, TableBody, TableCell, TableHead, TableRow, Chip } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';

const API_URL = import.meta.env.VITE_API_URL || '';

const MyOrders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user) {
            fetch(`${API_URL}/api/orders/myorders`, {
                headers: { 'Authorization': `Bearer ${user.token}` }
            })
            .then(res => res.json())
            .then(data => setOrders(data))
            .catch(err => console.error('MyOrders Fetch Error:', err));
        }
    }, [user]);

    return (
        <Box>
            <Header />
            <Container sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>My Orders</Typography>
                <Table component={Paper} elevation={3} sx={{ borderRadius: '16px', overflow: 'hidden' }}>
                    <TableHead sx={{ backgroundColor: 'rgba(255, 82, 82, 0.05)' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 700 }}>Order ID</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Items</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Total</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center">No orders found.</TableCell>
                            </TableRow>
                        ) : (
                            orders.map((order) => (
                                <TableRow key={order._id} sx={{ '&:hover': { backgroundColor: 'rgba(0,0,0,0.02)' } }}>
                                    <TableCell sx={{ fontWeight: 500 }}>#{order._id.substring(18)}</TableCell>
                                    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        {order.items.map(item => (
                                            <Typography key={item.product?._id} variant="body2">
                                                {item.product?.name} (x{item.quantity})
                                            </Typography>
                                        ))}
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>${order.totalAmount}</TableCell>
                                    <TableCell>
                                        <Chip 
                                            label={order.status} 
                                            size="small"
                                            color={order.status === 'Delivered' ? 'success' : order.status === 'Shipped' ? 'info' : 'warning'}
                                            sx={{ fontWeight: 700 }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </Container>
        </Box>
    );
};

export default MyOrders;
