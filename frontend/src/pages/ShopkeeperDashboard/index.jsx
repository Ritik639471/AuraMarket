import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Tabs, Tab, Button, Table, TableBody,
  TableCell, TableHead, TableRow, Paper, TextField, Dialog, DialogTitle,
  DialogContent, DialogActions, Grid, Card, CardContent, Chip, Select,
  MenuItem, FormControl, InputLabel
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import {
  ShoppingBag, Receipt, AttachMoney, HourglassEmpty, Add,
  Edit, Delete, CheckCircle, LocalShipping, DoneAll, Inventory, Campaign
} from '@mui/icons-material';
import ImageUpload, { FALLBACK_IMAGE } from '../../components/ImageUpload';
import { useToast } from '../../context/ToastContext';

const API_URL = import.meta.env.VITE_API_URL || '';

const StatCard = ({ icon, title, value, color }) => (
  <Card elevation={0} sx={{ border: '1px solid #e8ecf0', borderRadius: '16px', flex: 1 }}>
    <CardContent sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ width: 52, height: 52, borderRadius: '12px', background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {React.cloneElement(icon, { sx: { color, fontSize: 26 } })}
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>{title}</Typography>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#2b3445' }}>{value}</Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const STATUS_COLORS = { Pending: 'warning', Shipped: 'info', Delivered: 'success', Cancelled: 'error' };

const ShopkeeperDashboard = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [tab, setTab] = useState(0);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '', description: '', price: '', category: '', subCategory: '',
    division: '', images: '', stock: ''
  });
  const [promoteOpen, setPromoteOpen] = useState(false);
  const [productToPromote, setProductToPromote] = useState(null);

  const fetchProducts = () => {
    fetch(`${API_URL}/api/products/shopkeeper`, {
      headers: { 'Authorization': `Bearer ${user.token}` }
    })
      .then(res => res.ok ? res.json() : [])
      .then(data => setProducts(Array.isArray(data) ? data : []))
      .catch(err => console.error("Error fetching products:", err));
  };

  const fetchOrders = () => {
    fetch(`${API_URL}/api/orders/shopkeeper`, {
      headers: { 'Authorization': `Bearer ${user.token}` }
    })
      .then(res => res.ok ? res.json() : [])
      .then(data => setOrders(Array.isArray(data) ? data : []))
      .catch(err => console.error("Error fetching orders:", err));
  };

  useEffect(() => {
    if (user) { fetchProducts(); fetchOrders(); }
  }, [user]);

  const handlePromoteSubmit = async () => {
    if (!productToPromote) return;
    try {
      const res = await fetch(`${API_URL}/api/banners/promote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          title: `Featured: ${productToPromote.name}`,
          description: productToPromote.description,
          image: productToPromote.images?.[0] || productToPromote.image || '',
          link: `/product/${productToPromote._id}`
        })
      });
      if (res.ok) {
        showToast('🎉 Payment successful! Your ad is now live on the homepage!', 'success');
        setPromoteOpen(false);
        setProductToPromote(null);
      } else {
        const errorData = await res.json();
        showToast(`Failed to submit promotion request: ${errorData.message || 'Unknown error'}`, 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Error submitting promotion request', 'error');
    }
  };

  const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    const method = editMode ? 'PUT' : 'POST';
    const url = editMode ? `${API_URL}/api/products/${selectedProduct._id}` : `${API_URL}/api/products`;
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` },
      body: JSON.stringify(newProduct)
    });
    if (res.ok) {
      setOpen(false);
      setEditMode(false);
      setSelectedProduct(null);
      setNewProduct({ name: '', description: '', price: '', category: '', subCategory: '', division: '', images: [], stock: '' });
      fetchProducts();
      showToast(editMode ? '✅ Product updated!' : '✅ Product added!');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    const res = await fetch(`${API_URL}/api/products/${id}`, {
      method: 'DELETE', headers: { 'Authorization': `Bearer ${user.token}` }
    });
    if (res.ok) { fetchProducts(); showToast('🗑️ Product deleted', 'info'); }
  };

  const handleEditClick = (p) => {
    setSelectedProduct(p);
    setNewProduct({
      name: p.name, description: p.description, price: p.price,
      category: p.category, subCategory: p.subCategory || '', division: p.division || '',
      images: Array.isArray(p.images) ? p.images : (p.images ? [p.images] : []),
      stock: p.stock
    });
    setEditMode(true);
    setOpen(true);
  };

  const handleStatusUpdate = async (id, status) => {
    const res = await fetch(`${API_URL}/api/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` },
      body: JSON.stringify({ status })
    });
    if (res.ok) { fetchOrders(); showToast(`📦 Order marked as ${status}`); }
  };

  return (
    <Box sx={{ minHeight: '80vh', background: '#f8f9fa', py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#2b3445', mb: 4 }}>Shopkeeper Dashboard</Typography>

        {/* Stats Row */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
          <StatCard icon={<ShoppingBag />} title="My Products" value={products.length} color="#ff5252" />
          <StatCard icon={<Receipt />} title="Total Orders" value={orders.length} color="#2196f3" />
          <StatCard icon={<AttachMoney />} title="Revenue" value={`$${totalRevenue.toFixed(0)}`} color="#4caf50" />
          <StatCard icon={<HourglassEmpty />} title="Pending" value={pendingOrders} color="#ff9800" />
        </Box>

        <Paper elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e8ecf0', overflow: 'hidden' }}>
          <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ borderBottom: '1px solid #e8ecf0', px: 2 }}>
            <Tab icon={<Inventory fontSize="small" />} iconPosition="start" label="My Products" />
            <Tab icon={<Receipt fontSize="small" />} iconPosition="start" label="Orders" />
          </Tabs>

          <Box sx={{ p: 3 }}>
            {tab === 0 && (
              <Box>
                <Button variant="contained" startIcon={<Add />}
                  onClick={() => { setEditMode(false); setNewProduct({ name: '', description: '', price: '', category: '', subCategory: '', division: '', images: [], stock: '' }); setOpen(true); }}
                  sx={{ mb: 3, borderRadius: '10px', px: 4, backgroundColor: '#ff5252', '&:hover': { backgroundColor: '#e34e4e' } }}>
                  Add New Product
                </Button>
                <Table>
                  <TableHead sx={{ backgroundColor: '#f8f9fa' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Product</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Price</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Stock</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.map((p) => (
                      <TableRow key={p._id} hover>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <img
                              src={p.images?.[0] || FALLBACK_IMAGE}
                              alt={p.name}
                              onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
                              style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, border: '1px solid #eee' }}
                            />
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{p.name}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            <Typography variant="body2">{p.category}</Typography>
                            {p.subCategory && <Chip label={p.subCategory} size="small" variant="outlined" />}
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#ff5252' }}>${p.price}</TableCell>
                        <TableCell>
                          <Chip label={p.stock > 0 ? `${p.stock} left` : 'Out of stock'} color={p.stock > 0 ? 'success' : 'error'} size="small" />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button size="small" variant="outlined" startIcon={<Campaign />} color="secondary" onClick={() => { setProductToPromote(p); setPromoteOpen(true); }}>Promote</Button>
                            <Button size="small" variant="outlined" onClick={() => handleEditClick(p)}>Edit</Button>
                            <Button size="small" variant="outlined" color="error" onClick={() => handleDeleteProduct(p._id)}>Delete</Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                    {products.length === 0 && (
                      <TableRow><TableCell colSpan={5} align="center" sx={{ py: 4, color: 'text.secondary' }}>No products yet. Add your first product!</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </Box>
            )}

            {tab === 1 && (
              <Box>
                <Table>
                  <TableHead sx={{ backgroundColor: '#f8f9fa' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Order ID</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Customer & Items</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Address</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Total</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map((o) => (
                      <TableRow key={o._id} hover>
                        <TableCell sx={{ fontWeight: 600, color: '#555' }}>#{o._id.substring(18)}</TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>{o.customer?.name}</Typography>
                          {o.items?.map((item, idx) => (
                            <Typography key={idx} variant="caption" display="block" color="text.secondary">
                              • {item.product?.name} ×{item.quantity}
                            </Typography>
                          ))}
                        </TableCell>
                        <TableCell>
                          <Typography variant="caption" color="text.secondary">{o.shippingAddress || '—'}</Typography>
                        </TableCell>
                        <TableCell>
                          <Chip label={o.status} color={STATUS_COLORS[o.status] || 'default'} size="small" sx={{ fontWeight: 700 }} />
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>${o.totalAmount}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            {o.status === 'Pending' && <Button size="small" variant="outlined" startIcon={<LocalShipping />} onClick={() => handleStatusUpdate(o._id, 'Shipped')}>Ship</Button>}
                            {o.status === 'Shipped' && <Button size="small" variant="outlined" color="success" startIcon={<DoneAll />} onClick={() => handleStatusUpdate(o._id, 'Delivered')}>Deliver</Button>}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                    {orders.length === 0 && (
                      <TableRow><TableCell colSpan={6} align="center" sx={{ py: 4, color: 'text.secondary' }}>No orders yet.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </Box>
            )}
          </Box>
        </Paper>
      </Container>

      {/* Add/Edit Product Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>{editMode ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField id="prod-name" label="Product Name *" fullWidth value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} />
            <TextField id="prod-desc" label="Description *" fullWidth multiline rows={3} value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField id="prod-price" label="Price ($) *" type="number" fullWidth value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} />
              </Grid>
              <Grid item xs={6}>
                <TextField id="prod-stock" label="Stock *" type="number" fullWidth value={newProduct.stock} onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })} />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField id="prod-cat" label="Category" fullWidth value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })} />
              </Grid>
              <Grid item xs={4}>
                <TextField id="prod-subcat" label="Sub Category" fullWidth value={newProduct.subCategory} onChange={e => setNewProduct({ ...newProduct, subCategory: e.target.value })} />
              </Grid>
              <Grid item xs={4}>
                <TextField id="prod-div" label="Division" fullWidth value={newProduct.division} onChange={e => setNewProduct({ ...newProduct, division: e.target.value })} />
              </Grid>
            </Grid>
            <ImageUpload
              images={newProduct.images}
              onChange={(updatedImages) => setNewProduct({ ...newProduct, images: updatedImages })}
              multiple={true}
              label="Product Images"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveProduct} variant="contained" sx={{ backgroundColor: '#ff5252', '&:hover': { backgroundColor: '#e34e4e' } }}>
            {editMode ? 'Update Product' : 'Add Product'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Ad Promotion Dialog */}
      <Dialog open={promoteOpen} onClose={() => setPromoteOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Promote Product</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <Campaign color="secondary" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Want to feature <strong>{productToPromote?.name}</strong> on the homepage?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Reach thousands of shoppers by placing this product in the featured carousel.
            </Typography>
            <Paper elevation={0} sx={{ p: 3, backgroundColor: '#fff5f5', border: '1px solid #ffcdd2', borderRadius: 2, display: 'inline-block' }}>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#ff5252' }}>$5.00 <span style={{ fontSize: '1rem', fontWeight: 500 }}>/ day</span></Typography>
            </Paper>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setPromoteOpen(false)} sx={{ color: '#888' }}>Cancel</Button>
          <Button onClick={handlePromoteSubmit} variant="contained" sx={{ backgroundColor: '#ff5252', '&:hover': { backgroundColor: '#e34e4e' }, fontWeight: 600 }}>
            Pay & Submit Request
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ShopkeeperDashboard;
