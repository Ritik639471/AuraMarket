import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Tabs, Tab, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header';
import { ShoppingBag, Receipt, Add, LocalShipping, DoneAll, Payment } from '@mui/icons-material';

const API_URL = import.meta.env.VITE_API_URL || '';

const ShopkeeperDashboard = () => {
    const { user } = useAuth();
    const [tab, setTab] = useState(0);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', category: '', image: '', stock: '' });

    const fetchProducts = () => {
        fetch(`${API_URL}/api/products/shopkeeper`, {
            headers: { 'Authorization': `Bearer ${user.token}` }
        })
            .then(res => res.json())
            .then(data => setProducts(data));
    };

    useEffect(() => {
        if (user) {
            fetchProducts();

            fetch(`${API_URL}/api/orders/shopkeeper`, {
                headers: { 'Authorization': `Bearer ${user.token}` }
            })
                .then(res => res.json())
                .then(data => setOrders(data));
        }
    }, [user]);

    const handleAddProduct = async (e) => {
        e.preventDefault();
        const method = editMode ? 'PUT' : 'POST';
        const url = editMode ? `${API_URL}/api/products/${selectedProduct._id}` : `${API_URL}/api/products`;
        
        const res = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(newProduct)
        });
        if (res.ok) {
            setOpen(false);
            setEditMode(false);
            setSelectedProduct(null);
            setNewProduct({ name: '', description: '', price: '', category: '', image: '', stock: '' });
            fetchProducts();
        }
    };

    const handleDeleteProduct = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        const res = await fetch(`${API_URL}/api/products/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${user.token}` }
        });
        if (res.ok) fetchProducts();
    };

    const handleEditClick = (p) => {
        setSelectedProduct(p);
        setNewProduct({ name: p.name, description: p.description, price: p.price, category: p.category, image: p.image, stock: p.stock });
        setEditMode(true);
        setOpen(true);
    };

    const handleOpenAdd = () => {
        setEditMode(false);
        setNewProduct({ name: '', description: '', price: '', category: '', image: '', stock: '' });
        setOpen(true);
    };

    const handleStatusUpdate = async (id, status, paymentStatus) => {
        const res = await fetch(`${API_URL}/api/orders/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ status, paymentStatus })
        });
        if (res.ok) {
            // refresh orders
            fetch(`${API_URL}/api/orders/shopkeeper`, {
                headers: { 'Authorization': `Bearer ${user.token}` }
            })
                .then(res => res.json())
                .then(data => setOrders(data));
        }
    };

    return (
        <Box>
            <Header />
            <Container sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>Shopkeeper Dashboard</Typography>
                <Tabs value={tab} onChange={(e, v) => setTab(v)}>
                    <Tab label="My Products" />
                    <Tab label="Orders" />
                </Tabs>

                {tab === 0 && (
                    <Box sx={{ mt: 3 }}>
                        <Button 
                            variant="contained" 
                            startIcon={<Add />} 
                            onClick={handleOpenAdd} 
                            sx={{ mb: 3, borderRadius: '10px', px: 4 }}
                        >
                            Add New Product
                        </Button>
                        <Table component={Paper} sx={{ 
                            background: 'rgba(255, 255, 255, 0.7)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            borderRadius: '16px',
                            overflow: 'hidden'
                        }}>
                            <TableHead sx={{ backgroundColor: 'rgba(43, 190, 249, 0.1)' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Price</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Stock</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.map((p) => (
                                    <TableRow key={p._id} sx={{ '&:hover': { backgroundColor: 'rgba(0,0,0,0.02)' } }}>
                                        <TableCell>{p.name}</TableCell>
                                        <TableCell sx={{ color: 'primary.main', fontWeight: 600 }}>${p.price}</TableCell>
                                        <TableCell>{p.stock}</TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <Button size="small" variant="text" onClick={() => handleEditClick(p)}>Edit</Button>
                                                <Button size="small" variant="text" color="error" onClick={() => handleDeleteProduct(p._id)}>Delete</Button>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                )}

                {tab === 1 && (
                    <Box sx={{ mt: 3 }}>
                        <Table component={Paper} sx={{ 
                            background: 'rgba(255, 255, 255, 0.7)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            borderRadius: '16px',
                            overflow: 'hidden'
                        }}>
                            <TableHead sx={{ backgroundColor: 'rgba(43, 190, 249, 0.1)' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 600 }}>Order ID</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Customer</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Total</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((o) => (
                                    <TableRow key={o._id} sx={{ '&:hover': { backgroundColor: 'rgba(0,0,0,0.02)' } }}>
                                        <TableCell sx={{ fontWeight: 500 }}>#{o._id.substring(18)}</TableCell>
                                        <TableCell>
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{o.customer?.name}</Typography>
                                            <Box sx={{ mt: 1 }}>
                                                {o.items.map((item, idx) => (
                                                    <Typography key={idx} variant="caption" display="block">
                                                        • {item.product?.name} (x{item.quantity})
                                                    </Typography>
                                                ))}
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ 
                                                display: 'inline-block', 
                                                px: 2, py: 0.5, 
                                                borderRadius: '20px', 
                                                fontSize: '0.75rem', 
                                                fontWeight: 700,
                                                backgroundColor: o.status === 'Delivered' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 152, 0, 0.1)',
                                                color: o.status === 'Delivered' ? '#2e7d32' : '#ed6c02'
                                            }}>
                                                {o.status}
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>${o.totalAmount}</TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <Button size="small" variant="outlined" startIcon={<LocalShipping />} onClick={() => handleStatusUpdate(o._id, 'Shipped')}>Ship</Button>
                                                <Button size="small" variant="outlined" color="success" startIcon={<DoneAll />} onClick={() => handleStatusUpdate(o._id, 'Delivered')}>Deliver</Button>
                                                {o.paymentStatus === 'Unpaid' && (
                                                    <Button size="small" variant="contained" color="info" startIcon={<Payment />} onClick={() => handleStatusUpdate(o._id, o.status, 'Paid')}>Paid</Button>
                                                )}
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                )}
            </Container>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{editMode ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                        <TextField label="Name" fullWidth value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} />
                        <TextField label="Description" fullWidth multiline rows={3} value={newProduct.description} onChange={(e) => setNewProduct({...newProduct, description: e.target.value})} />
                        <TextField label="Price" type="number" fullWidth value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} />
                        <TextField label="Category" fullWidth value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})} />
                        <TextField label="Image URL" fullWidth value={newProduct.image} onChange={(e) => setNewProduct({...newProduct, image: e.target.value})} />
                        <TextField label="Stock" type="number" fullWidth value={newProduct.stock} onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})} />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleAddProduct} variant="contained">{editMode ? 'Update' : 'Add'}</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ShopkeeperDashboard;
