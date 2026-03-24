import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Tabs, Tab, MenuItem, Select, Chip } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { Campaign, Add, Delete, CheckCircle, Warning, People, ShoppingBag, ListAlt } from '@mui/icons-material';
import Header from '../../components/Header';

const API_URL = import.meta.env.VITE_API_URL || '';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [tab, setTab] = useState(0);
    const [ads, setAds] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedEntity, setSelectedEntity] = useState(null);
    const [newAd, setNewAd] = useState({ title: '', description: '', image: '', link: '' });
    const [editProduct, setEditProduct] = useState({ name: '', description: '', price: '', category: '', image: '', stock: '' });

    const fetchData = async () => {
        if (!user) return;
        try {
            if (tab === 0) {
                const res = await fetch(`${API_URL}/api/ads`);
                setAds(await res.json());
            } else if (tab === 1) {
                const res = await fetch(`${API_URL}/api/products`);
                setProducts(await res.json());
            } else if (tab === 2) {
                const res = await fetch(`${API_URL}/api/auth/users`, {
                    headers: { 'Authorization': `Bearer ${user.token}` }
                });
                setUsersList(await res.json());
            } else if (tab === 3) {
                const res = await fetch(`${API_URL}/api/orders/shopkeeper`, {
                    headers: { 'Authorization': `Bearer ${user.token}` }
                });
                setOrders(await res.json());
            }
        } catch (err) {
            console.error('Fetch error:', err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [user, tab]);

    const handleAction = async (e) => {
        e.preventDefault();
        if (tab === 0) { // Ads
            const res = await fetch(`${API_URL}/api/ads`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(newAd)
            });
            if (res.ok) {
                setOpen(false);
                fetchData();
            }
        } else if (tab === 1) { // Products
            const res = await fetch(`${API_URL}/api/products/${selectedEntity._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(editProduct)
            });
            if (res.ok) {
                setOpen(false);
                fetchData();
            }
        }
    };

    const handleDelete = async (endpoint, id) => {
        if (!window.confirm('Are you sure you want to delete this?')) return;
        const res = await fetch(`${API_URL}/api/${endpoint}/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${user.token}` }
        });
        if (res.ok) fetchData();
    };

    const handleEditProductClick = (p) => {
        setSelectedEntity(p);
        setEditProduct({ name: p.name, description: p.description, price: p.price, category: p.category, image: p.image, stock: p.stock });
        setEditMode(true);
        setOpen(true);
    };

    const handleUpdateRole = async (userId, newRole) => {
        const res = await fetch(`${API_URL}/api/auth/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ role: newRole })
        });
        if (res.ok) fetchData();
    };

    return (
        <Box>
            <Header />
            <Container sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 800 }}>Admin Dashboard</Typography>
                
                <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 3 }}>
                    <Tab icon={<Campaign />} label="Advertisements" />
                    <Tab icon={<ShoppingBag />} label="Products" />
                    <Tab icon={<People />} label="Users" />
                    <Tab icon={<ListAlt />} label="Orders" />
                </Tabs>

                {tab === 0 && (
                    <Box>
                        <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)} sx={{ mb: 3 }}>Add New Ad</Button>
                        <Table component={Paper} elevation={3}>
                            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ads.map((ad) => (
                                    <TableRow key={ad._id}>
                                        <TableCell>{ad.title}</TableCell>
                                        <TableCell>{ad.active ? 'Active' : 'Inactive'}</TableCell>
                                        <TableCell>
                                            <Button size="small" color="error" onClick={() => handleDelete('ads', ad._id)}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                )}

                {tab === 1 && (
                    <Table component={Paper} elevation={3}>
                        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Stock</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((p) => (
                                <TableRow key={p._id}>
                                    <TableCell>{p.name}</TableCell>
                                    <TableCell>${p.price}</TableCell>
                                    <TableCell>{p.stock}</TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <Button size="small" onClick={() => handleEditProductClick(p)}>Edit</Button>
                                            <Button size="small" color="error" onClick={() => handleDelete('products', p._id)}>Delete</Button>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}

                {tab === 2 && (
                    <Table component={Paper} elevation={3}>
                        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {usersList.map((u) => (
                                <TableRow key={u._id}>
                                    <TableCell>{u.name}</TableCell>
                                    <TableCell>{u.email}</TableCell>
                                    <TableCell>
                                        <Select 
                                            size="small" 
                                            value={u.role} 
                                            onChange={(e) => handleUpdateRole(u._id, e.target.value)}
                                        >
                                            <MenuItem value="customer">Customer</MenuItem>
                                            <MenuItem value="shopkeeper">Shopkeeper</MenuItem>
                                            <MenuItem value="admin">Admin</MenuItem>
                                        </Select>
                                    </TableCell>
                                    <TableCell>
                                        <Button size="small" color="error" onClick={() => handleDelete('auth/users', u._id)} disabled={u._id === user._id}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}

                {tab === 3 && (
                    <Table component={Paper} elevation={3}>
                        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableRow>
                                <TableCell>Order ID</TableCell>
                                <TableCell>Customer</TableCell>
                                <TableCell>Total</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((o) => (
                                <TableRow key={o._id}>
                                    <TableCell>#{o._id.substring(18)}</TableCell>
                                    <TableCell>{o.customer?.name}</TableCell>
                                    <TableCell>${o.totalAmount}</TableCell>
                                    <TableCell>
                                        <Chip label={o.status} color="primary" size="small" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </Container>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{tab === 0 ? 'Add New Advertisement' : 'Edit Product'}</DialogTitle>
                <DialogContent>
                    {tab === 0 ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                            <TextField label="Title" fullWidth value={newAd.title} onChange={(e) => setNewAd({...newAd, title: e.target.value})} />
                            <TextField label="Description" fullWidth multiline rows={2} value={newAd.description} onChange={(e) => setNewAd({...newAd, description: e.target.value})} />
                            <TextField label="Image URL" fullWidth value={newAd.image} onChange={(e) => setNewAd({...newAd, image: e.target.value})} />
                            <TextField label="Redirect Link" fullWidth value={newAd.link} onChange={(e) => setNewAd({...newAd, link: e.target.value})} />
                        </Box>
                    ) : (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                            <TextField label="Name" fullWidth value={editProduct.name} onChange={(e) => setEditProduct({...editProduct, name: e.target.value})} />
                            <TextField label="Description" fullWidth multiline rows={3} value={editProduct.description} onChange={(e) => setEditProduct({...editProduct, description: e.target.value})} />
                            <TextField label="Price" type="number" fullWidth value={editProduct.price} onChange={(e) => setEditProduct({...editProduct, price: e.target.value})} />
                            <TextField label="Category" fullWidth value={editProduct.category} onChange={(e) => setEditProduct({...editProduct, category: e.target.value})} />
                            <TextField label="Image URL" fullWidth value={editProduct.image} onChange={(e) => setEditProduct({...editProduct, image: e.target.value})} />
                            <TextField label="Stock" type="number" fullWidth value={editProduct.stock} onChange={(e) => setEditProduct({...editProduct, stock: e.target.value})} />
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleAction} variant="contained">{tab === 0 ? 'Create Ad' : 'Update'}</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AdminDashboard;
