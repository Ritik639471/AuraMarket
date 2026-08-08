import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Chip, Button, Stepper, Step,
  StepLabel, Divider, Grid, Skeleton
} from '@mui/material';
import { ShoppingBag, LocalShipping, CheckCircle, Pending, Replay } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || '';

const ORDER_STEPS = ['Pending', 'Shipped', 'Delivered'];

const STATUS_CHIP_COLOR = { Pending: 'warning', Shipped: 'info', Delivered: 'success', Cancelled: 'error' };
const STATUS_ICON = {
  Pending: <Pending sx={{ fontSize: 18 }} />,
  Shipped: <LocalShipping sx={{ fontSize: 18 }} />,
  Delivered: <CheckCircle sx={{ fontSize: 18 }} />,
};

const MyOrders = () => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    if (user) {
      fetch(`${API_URL}/api/orders/myorders`, {
        headers: { 'Authorization': `Bearer ${user.token}` }
      })
        .then(res => res.json())
        .then(data => { setOrders(Array.isArray(data) ? data : []); setLoading(false); })
        .catch(err => { console.error('MyOrders Fetch Error:', err); setLoading(false); });
    }
  }, [user]);

  const handleReorder = async (order) => {
    for (const item of order.items) {
      if (item.product) await addToCart(item.product, item.quantity);
    }
    showToast('🛒 Items added to cart!');
  };

  const getActiveStep = (status) => ORDER_STEPS.indexOf(status);

  if (loading) return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>My Orders</Typography>
      {[1, 2, 3].map(i => (
        <Skeleton key={i} variant="rectangular" height={160} sx={{ borderRadius: '16px', mb: 2 }} />
      ))}
    </Container>
  );

  return (
    <Box sx={{ minHeight: '80vh', background: '#f8f9fa', py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <ShoppingBag sx={{ color: '#ff5252', fontSize: 32 }} />
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#2b3445' }}>My Orders</Typography>
          {orders.length > 0 && (
            <Chip label={`${orders.length} orders`} sx={{ ml: 1, backgroundColor: '#ff5252', color: 'white', fontWeight: 700 }} />
          )}
        </Box>

        {orders.length === 0 ? (
          <Paper elevation={0} sx={{ borderRadius: '20px', border: '1px solid #e8ecf0', p: 8, textAlign: 'center' }}>
            <ShoppingBag sx={{ fontSize: 64, color: '#ddd', mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#aaa', mb: 1 }}>No orders yet</Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>Looks like you haven't placed any orders!</Typography>
            <Button component={Link} to="/products" variant="contained" sx={{ borderRadius: '10px', backgroundColor: '#ff5252', '&:hover': { backgroundColor: '#e34e4e' } }}>
              Start Shopping
            </Button>
          </Paper>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {orders.map((order) => {
              const isExpanded = expandedOrder === order._id;
              const activeStep = getActiveStep(order.status);
              return (
                <Paper key={order._id} elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e8ecf0', overflow: 'hidden' }}>
                  {/* Order Header */}
                  <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, background: '#fafbfc' }}>
                    <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', flexWrap: 'wrap' }}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">Order ID</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 700 }}>#{order._id.substring(18).toUpperCase()}</Typography>
                      </Box>
                      <Divider orientation="vertical" flexItem />
                      <Box>
                        <Typography variant="caption" color="text.secondary">Date</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </Typography>
                      </Box>
                      <Divider orientation="vertical" flexItem />
                      <Box>
                        <Typography variant="caption" color="text.secondary">Total</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 700, color: '#ff5252' }}>${order.totalAmount}</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Chip
                        icon={STATUS_ICON[order.status]}
                        label={order.status}
                        color={STATUS_CHIP_COLOR[order.status] || 'default'}
                        sx={{ fontWeight: 700 }}
                      />
                      <Button size="small" variant="outlined" onClick={() => setExpandedOrder(isExpanded ? null : order._id)}>
                        {isExpanded ? 'Hide' : 'Details'}
                      </Button>
                      <Button
                        size="small" variant="outlined" color="secondary"
                        startIcon={<Replay />}
                        onClick={() => handleReorder(order)}
                      >
                        Reorder
                      </Button>
                    </Box>
                  </Box>

                  {/* Order Tracking Stepper */}
                  {order.status !== 'Cancelled' && (
                    <Box sx={{ px: 4, py: 2, borderTop: '1px solid #f0f0f0' }}>
                      <Stepper activeStep={activeStep} alternativeLabel>
                        {ORDER_STEPS.map((step) => (
                          <Step key={step} completed={ORDER_STEPS.indexOf(step) <= activeStep}>
                            <StepLabel>{step}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                    </Box>
                  )}

                  {/* Expanded Order Details */}
                  {isExpanded && (
                    <Box sx={{ p: 3, borderTop: '1px solid #f0f0f0' }}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>Items Ordered</Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {order.items.map((item, idx) => (
                              <Box key={idx} sx={{ display: 'flex', gap: 2, alignItems: 'center', p: 2, background: '#f8f9fa', borderRadius: '10px' }}>
                                {item.product?.images?.[0] && (
                                  <img src={item.product.images[0]} alt={item.product.name}
                                    style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }} />
                                )}
                                <Box sx={{ flex: 1 }}>
                                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.product?.name || 'Product removed'}</Typography>
                                  <Typography variant="caption" color="text.secondary">{item.product?.category}</Typography>
                                  <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                                    <Chip label={`Qty: ${item.quantity}`} size="small" variant="outlined" />
                                    <Chip label={`$${item.price} each`} size="small" variant="outlined" color="primary" />
                                  </Box>
                                </Box>
                                <Typography variant="body1" sx={{ fontWeight: 700, color: '#ff5252' }}>
                                  ${(item.price * item.quantity).toFixed(2)}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>Delivery Address</Typography>
                          <Paper variant="outlined" sx={{ p: 2, borderRadius: '10px', background: '#f8f9ff' }}>
                            <Typography variant="body2" color="text.secondary">
                              {order.shippingAddress || 'No address provided'}
                            </Typography>
                          </Paper>
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                </Paper>
              );
            })}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default MyOrders;
