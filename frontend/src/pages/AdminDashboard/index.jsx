import React, { useState, useEffect } from 'react';
import {
    Container, Typography, Box, Button, Table, TableBody, TableCell, TableHead, TableRow,
    Paper, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Tabs, Tab,
    MenuItem, Select, Chip, IconButton, FormControl, InputLabel, Divider, Autocomplete
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { Campaign, Add, Delete, CheckCircle, Warning, People, ShoppingBag, ListAlt, Category, Close } from '@mui/icons-material';
import ImageUpload, { FALLBACK_IMAGE } from '../../components/ImageUpload';

const API_URL = import.meta.env.VITE_API_URL || '';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [tab, setTab] = useState(0);
    const [ads, setAds] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [categories, setCategories] = useState([]);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedEntity, setSelectedEntity] = useState(null);
    const [productSearch, setProductSearch] = useState('');
    const [newAd, setNewAd] = useState({ title: '', description: '', image: '', link: '' });
    const [editProduct, setEditProduct] = useState({ name: '', description: '', price: '', category: '', image: '', stock: '' });
    const [editCategory, setEditCategory] = useState({ name: '', image: '', subcategories: [] });

    const fetchData = async () => {
        if (!user) return;
        try {
            // Always fetch categories & ALL products in background so selectors in Ad Dialog are fully populated
            fetch(`${API_URL}/api/categories`).then(r => r.json()).then(d => setCategories(Array.isArray(d) ? d : []));
            fetch(`${API_URL}/api/products/all`).then(r => r.json()).then(d => setProducts(Array.isArray(d) ? d : (d.products || [])));

            if (tab === 0) {
                const res = await fetch(`${API_URL}/api/banners`);
                if (res.ok) {
                    const data = await res.json();
                    setAds(Array.isArray(data) ? data : []);
                }
            } else if (tab === 1) {
                const res = await fetch(`${API_URL}/api/products/all`);
                if (res.ok) {
                    const data = await res.json();
                    setProducts(Array.isArray(data) ? data : (data.products || []));
                }
            } else if (tab === 2) {
                const res = await fetch(`${API_URL}/api/auth/users`, {
                    headers: { 'Authorization': `Bearer ${user.token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setUsersList(Array.isArray(data) ? data : []);
                }
            } else if (tab === 3) {
                const res = await fetch(`${API_URL}/api/orders/shopkeeper`, {
                    headers: { 'Authorization': `Bearer ${user.token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setOrders(Array.isArray(data) ? data : []);
                }
            } else if (tab === 4) {
                const res = await fetch(`${API_URL}/api/categories`);
                if (res.ok) {
                    const data = await res.json();
                    setCategories(Array.isArray(data) ? data : []);
                }
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
        if (tab === 0) { // Banners
            const res = await fetch(`${API_URL}/api/banners`, {
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
        } else if (tab === 4) { // Categories
            const isEditing = !!selectedEntity;
            const url = isEditing ? `${API_URL}/api/categories/${selectedEntity._id}` : `${API_URL}/api/categories`;
            const method = isEditing ? 'PUT' : 'POST';

            const payload = {
                name: editCategory.name,
                image: editCategory.image,
                subcategories: editCategory.subcategories.map(sub => ({
                    name: sub.name,
                    items: typeof sub.items === 'string' ? sub.items.split(',').map(i => i.trim()).filter(i => i) : sub.items
                }))
            };

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(payload)
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
        setEditProduct({
            name: p.name,
            description: p.description,
            price: p.price,
            category: p.category,
            images: p.images || (p.image ? [p.image] : []),
            stock: p.stock
        });
        setEditMode(true);
        setOpen(true);
    };

    const handleCategoryClick = (c = null) => {
        setSelectedEntity(c);
        if (c) {
            setEditCategory({ 
                name: c.name, 
                image: c.image || '', 
                subcategories: c.subcategories ? c.subcategories.map(s => ({
                    name: s.name,
                    items: s.items ? s.items.join(', ') : ''
                })) : []
            });
            setEditMode(true);
        } else {
            setEditCategory({ name: '', image: '', subcategories: [] });
            setEditMode(false);
        }
        setOpen(true);
    };

    const handleAddSubcategory = () => {
        setEditCategory(prev => ({
            ...prev,
            subcategories: [...prev.subcategories, { name: '', items: '' }]
        }));
    };

    const handleRemoveSubcategory = (index) => {
        setEditCategory(prev => ({
            ...prev,
            subcategories: prev.subcategories.filter((_, i) => i !== index)
        }));
    };

    const handleSubcategoryChange = (index, field, value) => {
        setEditCategory(prev => {
            const newSubs = [...prev.subcategories];
            newSubs[index][field] = value;
            return { ...prev, subcategories: newSubs };
        });
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

            <Container sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 800 }}>Admin Dashboard</Typography>

                <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 3 }}>
                    <Tab icon={<Campaign />} label="Advertisements" />
                    <Tab icon={<ShoppingBag />} label="Products" />
                    <Tab icon={<People />} label="Users" />
                    <Tab icon={<ListAlt />} label="Orders" />
                    <Tab icon={<Category />} label="Categories" />
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
                                {ads?.map((ad) => (
                                    <TableRow key={ad._id}>
                                        <TableCell>{ad.title}</TableCell>
                                        <TableCell>{ad.active ? 'Active' : 'Inactive'}</TableCell>
                                        <TableCell>
                                            <Button size="small" color="error" onClick={() => handleDelete('banners', ad._id)}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                )}

                {tab === 1 && (
                    <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5, flexWrap: 'wrap', gap: 2 }}>
                            <TextField
                                size="small"
                                placeholder="Search all products by name, category, or seller..."
                                value={productSearch}
                                onChange={(e) => setProductSearch(e.target.value)}
                                sx={{ width: 380, backgroundColor: '#fff' }}
                            />
                            <Chip 
                                label={`Total: ${products.length} products ${productSearch ? `(Matches: ${products.filter(p => p.name.toLowerCase().includes(productSearch.toLowerCase()) || (p.category && p.category.toLowerCase().includes(productSearch.toLowerCase())) || (p.shopkeeper?.name && p.shopkeeper.name.toLowerCase().includes(productSearch.toLowerCase()))).length})` : ''}`} 
                                color="primary" 
                                variant="outlined" 
                                sx={{ fontWeight: 600 }}
                            />
                        </Box>
                        <Table component={Paper} elevation={3}>
                            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableRow>
                                    <TableCell>Product</TableCell>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Seller / Merchant</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Stock</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products
                                    .filter(p => 
                                        p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                                        (p.category && p.category.toLowerCase().includes(productSearch.toLowerCase())) ||
                                        (p.shopkeeper?.name && p.shopkeeper.name.toLowerCase().includes(productSearch.toLowerCase()))
                                    )
                                    .map((p) => (
                                        <TableRow key={p._id}>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                    <img
                                                        src={p.images?.[0] || p.image || FALLBACK_IMAGE}
                                                        alt={p.name}
                                                        onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
                                                        style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 6, border: '1px solid #eee' }}
                                                    />
                                                    <Box>
                                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{p.name}</Typography>
                                                        <Typography variant="caption" color="text.secondary">{p.division || 'Generic'}</Typography>
                                                    </Box>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Chip label={p.category || 'General'} size="small" variant="outlined" />
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                    {p.shopkeeper?.name || 'Aura Direct'}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ fontWeight: 700, color: '#ff5252' }}>${p.price}</TableCell>
                                            <TableCell>
                                                <Chip 
                                                    label={p.stock > 0 ? `${p.stock} in stock` : 'Out of Stock'} 
                                                    size="small" 
                                                    color={p.stock > 10 ? 'success' : p.stock > 0 ? 'warning' : 'error'} 
                                                />
                                            </TableCell>
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
                    </Box>
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
                            {usersList?.map((u) => (
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
                            {orders?.map((o) => (
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

                {tab === 4 && (
                    <Box>
                        <Button variant="contained" startIcon={<Add />} onClick={() => handleCategoryClick()} sx={{ mb: 3 }}>Add New Category</Button>
                        <Table component={Paper} elevation={3}>
                            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableRow>
                                    <TableCell>Image</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Subcategories</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {categories?.map((c) => (
                                    <TableRow key={c._id}>
                                        <TableCell>
                                            {c.image && (
                                                <img src={c.image} alt={c.name} style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }} />
                                            )}
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>{c.name}</TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                                {c.subcategories?.map((sub, idx) => (
                                                    <Chip 
                                                        key={idx} 
                                                        label={`${sub.name} ${sub.items?.length ? `(${sub.items.length})` : ''}`} 
                                                        size="small" 
                                                        variant="outlined" 
                                                    />
                                                ))}
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <Button size="small" onClick={() => handleCategoryClick(c)}>Edit</Button>
                                                <Button size="small" color="error" onClick={() => handleDelete('categories', c._id)}>Delete</Button>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                )}
            </Container>

            <Dialog open={open} onClose={() => setOpen(false)} maxWidth={tab === 4 ? "md" : "sm"} fullWidth>
                <DialogTitle>{tab === 0 ? 'Add New Advertisement' : tab === 4 ? (selectedEntity ? 'Edit Category' : 'Add Category') : 'Edit Product'}</DialogTitle>
                <DialogContent dividers>
                    {tab === 0 ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                                Link this banner to an existing Product, a Category, or enter a custom link:
                            </Typography>

                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                {/* Category Picker */}
                                <FormControl fullWidth size="small">
                                    <InputLabel id="ad-cat-select-label">Choose Category to Link</InputLabel>
                                    <Select
                                        labelId="ad-cat-select-label"
                                        label="Choose Category to Link"
                                        value=""
                                        onChange={(e) => {
                                            const catName = e.target.value;
                                            const catObj = categories.find(c => c.name === catName);
                                            setNewAd({
                                                ...newAd,
                                                title: newAd.title || `Explore ${catName} Collection`,
                                                link: `/products?category=${encodeURIComponent(catName)}`,
                                                image: newAd.image || (catObj?.image || '')
                                            });
                                        }}
                                    >
                                        {categories.map((c) => (
                                            <MenuItem key={c._id} value={c.name}>
                                                {c.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                {/* Product Picker */}
                                <Autocomplete
                                    fullWidth
                                    size="small"
                                    options={products}
                                    getOptionLabel={(option) => typeof option === 'string' ? option : `${option.name} — $${option.price} (${option.category})`}
                                    isOptionEqualToValue={(option, value) => option?._id === value?._id}
                                    onChange={(event, prod) => {
                                        if (prod) {
                                            setNewAd({
                                                ...newAd,
                                                title: prod.name,
                                                description: prod.description?.substring(0, 100) + '...',
                                                link: `/product/${prod._id}`,
                                                image: prod.images?.[0] || prod.image || ''
                                            });
                                        }
                                    }}
                                    renderInput={(params) => (
                                        <TextField 
                                            {...params} 
                                            label={`Search & Link from All Products (${products.length} Available)`}
                                            placeholder="Type product name or category..."
                                        />
                                    )}
                                />
                            </Box>

                            <Divider sx={{ my: 0.5 }} />

                            <TextField
                                label="Banner Title *"
                                fullWidth
                                value={newAd.title}
                                onChange={(e) => setNewAd({ ...newAd, title: e.target.value })}
                            />
                            <TextField
                                label="Subtitle / Description"
                                fullWidth
                                multiline
                                rows={2}
                                value={newAd.description}
                                onChange={(e) => setNewAd({ ...newAd, description: e.target.value })}
                            />
                            <ImageUpload
                                images={newAd.image}
                                onChange={(url) => setNewAd({ ...newAd, image: Array.isArray(url) ? url[0] : url })}
                                multiple={false}
                                label="Banner Image *"
                            />
                            <TextField
                                label="Redirect URL / Route *"
                                fullWidth
                                placeholder="/products?category=Electronics or /product/ID"
                                value={newAd.link}
                                onChange={(e) => setNewAd({ ...newAd, link: e.target.value })}
                            />
                        </Box>
                    ) : tab === 1 ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                            <TextField label="Name" fullWidth value={editProduct.name} onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })} />
                            <TextField label="Description" fullWidth multiline rows={3} value={editProduct.description} onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })} />
                            <TextField label="Price" type="number" fullWidth value={editProduct.price} onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })} />
                            <TextField label="Category" fullWidth value={editProduct.category} onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })} />
                            <ImageUpload
                                images={editProduct.images || editProduct.image}
                                onChange={(imgs) => setEditProduct({ ...editProduct, images: imgs, image: Array.isArray(imgs) ? imgs[0] : imgs })}
                                multiple={true}
                                label="Product Images"
                            />
                            <TextField label="Stock" type="number" fullWidth value={editProduct.stock} onChange={(e) => setEditProduct({ ...editProduct, stock: e.target.value })} />
                        </Box>
                    ) : tab === 4 ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
                            <TextField label="Category Name" fullWidth value={editCategory.name} onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })} />
                            <ImageUpload
                                images={editCategory.image}
                                onChange={(url) => setEditCategory({ ...editCategory, image: Array.isArray(url) ? url[0] : url })}
                                multiple={false}
                                label="Category Icon/Image"
                            />
                            
                            <Box sx={{ mt: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                    <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 600 }}>Subcategories</Typography>
                                    <Button size="small" variant="outlined" startIcon={<Add />} onClick={handleAddSubcategory}>Add Subcategory</Button>
                                </Box>
                                
                                {editCategory.subcategories.length === 0 ? (
                                    <Typography variant="body2" color="text.secondary">No subcategories added yet.</Typography>
                                ) : (
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        {editCategory.subcategories.map((sub, idx) => (
                                            <Paper key={idx} variant="outlined" sx={{ p: 2, position: 'relative', backgroundColor: '#fafafa' }}>
                                                <IconButton 
                                                    size="small" 
                                                    onClick={() => handleRemoveSubcategory(idx)}
                                                    sx={{ position: 'absolute', top: 4, right: 4, color: 'error.main' }}
                                                >
                                                    <Close fontSize="small" />
                                                </IconButton>
                                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                                                    <TextField 
                                                        label="Subcategory Name (e.g. Men)" 
                                                        size="small"
                                                        value={sub.name} 
                                                        onChange={(e) => handleSubcategoryChange(idx, 'name', e.target.value)} 
                                                    />
                                                    <TextField 
                                                        label="Items/Divisions (comma separated, e.g. Jeans, Formal)" 
                                                        size="small"
                                                        fullWidth 
                                                        multiline 
                                                        rows={2} 
                                                        value={sub.items} 
                                                        onChange={(e) => handleSubcategoryChange(idx, 'items', e.target.value)} 
                                                    />
                                                </Box>
                                            </Paper>
                                        ))}
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    ) : null}
                </DialogContent>
                <DialogActions sx={{ p: 2, pt: 1 }}>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleAction} variant="contained" disableElevation>{tab === 0 ? 'Create Ad' : tab === 4 ? (selectedEntity ? 'Update Category' : 'Create Category') : 'Update'}</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AdminDashboard;
