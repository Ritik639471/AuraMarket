import React, { useState } from 'react';
import {
  Container, Typography, Box, Paper, Button, Grid,
  TextField, Divider, Stepper, Step, StepLabel, Chip, Alert
} from '@mui/material';
import {
  LocalShipping, Payment, CheckCircle, ShoppingBag,
  ArrowBack, ArrowForward
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const steps = ['Shipping Address', 'Review Order', 'Confirmation'];

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [placing, setPlacing] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [address, setAddress] = useState({
    fullName: user?.name || '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India'
  });
  const [errors, setErrors] = useState({});

  const total = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const shipping = total > 499 ? 0 : 49;
  const tax = +(total * 0.18).toFixed(2);
  const grandTotal = +(total + shipping + tax).toFixed(2);

  const validate = () => {
    const errs = {};
    if (!address.fullName.trim()) errs.fullName = 'Full name is required';
    if (!address.phone.trim() || !/^\d{10}$/.test(address.phone)) errs.phone = 'Valid 10-digit phone required';
    if (!address.addressLine1.trim()) errs.addressLine1 = 'Address is required';
    if (!address.city.trim()) errs.city = 'City is required';
    if (!address.state.trim()) errs.state = 'State is required';
    if (!address.pincode.trim() || !/^\d{6}$/.test(address.pincode)) errs.pincode = 'Valid 6-digit pincode required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (activeStep === 0 && !validate()) return;
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => setActiveStep(prev => prev - 1);

  const handlePlaceOrder = async () => {
    setPlacing(true);
    try {
      const orderData = {
        items: cart.map(item => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.price
        })),
        totalAmount: grandTotal,
        shippingAddress: `${address.addressLine1}, ${address.addressLine2 ? address.addressLine2 + ', ' : ''}${address.city}, ${address.state} - ${address.pincode}, ${address.country}`
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
        const data = await res.json();
        setOrderId(data._id || 'ORD' + Date.now());
        clearCart();
        setActiveStep(2);
      }
    } catch (err) {
      console.error('Order error:', err);
    }
    setPlacing(false);
  };

  if (!user) {
    return (
      <Container sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="h5">Please log in to checkout</Typography>
        <Button component={Link} to="/login" variant="contained" sx={{ mt: 2 }}>Login</Button>
      </Container>
    );
  }

  if (cart.length === 0 && activeStep < 2) {
    return (
      <Container sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="h5">Your cart is empty!</Typography>
        <Button component={Link} to="/products" variant="contained" sx={{ mt: 2 }}>Shop Now</Button>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '80vh', background: '#f8f9fa', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
          <ShoppingBag sx={{ color: '#ff5252', fontSize: 32 }} />
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#2b3445' }}>Checkout</Typography>
        </Box>

        {/* Stepper */}
        <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: '16px', border: '1px solid #e8ecf0' }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>

        <Grid container spacing={3}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: '16px', border: '1px solid #e8ecf0' }}>

              {/* Step 1: Shipping Address */}
              {activeStep === 0 && (
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                    <LocalShipping sx={{ color: '#ff5252' }} />
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Delivery Address</Typography>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Full Name" fullWidth required
                        value={address.fullName}
                        onChange={e => setAddress({ ...address, fullName: e.target.value })}
                        error={!!errors.fullName} helperText={errors.fullName}
                        id="checkout-fullname"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Phone Number" fullWidth required type="tel"
                        value={address.phone}
                        onChange={e => setAddress({ ...address, phone: e.target.value })}
                        error={!!errors.phone} helperText={errors.phone}
                        id="checkout-phone"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Address Line 1" fullWidth required
                        placeholder="House No., Street, Area"
                        value={address.addressLine1}
                        onChange={e => setAddress({ ...address, addressLine1: e.target.value })}
                        error={!!errors.addressLine1} helperText={errors.addressLine1}
                        id="checkout-address1"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Address Line 2 (Optional)" fullWidth
                        placeholder="Landmark, Colony"
                        value={address.addressLine2}
                        onChange={e => setAddress({ ...address, addressLine2: e.target.value })}
                        id="checkout-address2"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="City" fullWidth required
                        value={address.city}
                        onChange={e => setAddress({ ...address, city: e.target.value })}
                        error={!!errors.city} helperText={errors.city}
                        id="checkout-city"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="State" fullWidth required
                        value={address.state}
                        onChange={e => setAddress({ ...address, state: e.target.value })}
                        error={!!errors.state} helperText={errors.state}
                        id="checkout-state"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="Pincode" fullWidth required
                        value={address.pincode}
                        onChange={e => setAddress({ ...address, pincode: e.target.value })}
                        error={!!errors.pincode} helperText={errors.pincode}
                        id="checkout-pincode"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Country" fullWidth
                        value={address.country}
                        onChange={e => setAddress({ ...address, country: e.target.value })}
                        id="checkout-country"
                      />
                    </Grid>
                  </Grid>
                </Box>
              )}

              {/* Step 2: Review Order */}
              {activeStep === 1 && (
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                    <Payment sx={{ color: '#ff5252' }} />
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Review Your Order</Typography>
                  </Box>

                  {/* Delivery address summary */}
                  <Paper variant="outlined" sx={{ p: 2, mb: 3, borderRadius: '10px', backgroundColor: '#f8f9ff' }}>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>Delivering to:</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>{address.fullName} · {address.phone}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {address.addressLine1}{address.addressLine2 ? ', ' + address.addressLine2 : ''}, {address.city}, {address.state} - {address.pincode}
                    </Typography>
                  </Paper>

                  <Alert severity="info" sx={{ mb: 3, borderRadius: '10px' }}>
                    <Typography variant="body2">Payment will be collected <strong>Cash on Delivery</strong>. Payment gateway integration coming soon!</Typography>
                  </Alert>

                  {/* Items list */}
                  {cart.map((item) => (
                    <Box key={item.product._id} sx={{ display: 'flex', gap: 2, mb: 2, pb: 2, borderBottom: '1px solid #f0f0f0', alignItems: 'center' }}>
                      <Box sx={{ width: 70, height: 70, borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
                        <img
                          src={item.product.images?.[0] || 'https://via.placeholder.com/70'}
                          alt={item.product.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>{item.product.name}</Typography>
                        <Typography variant="body2" color="text.secondary">{item.product.category}</Typography>
                        <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                          <Chip label={`Qty: ${item.quantity}`} size="small" variant="outlined" />
                          <Chip label={`$${item.product.price} each`} size="small" variant="outlined" color="primary" />
                        </Box>
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#ff5252' }}>
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}

              {/* Step 3: Confirmation */}
              {activeStep === 2 && (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <CheckCircle sx={{ fontSize: 80, color: '#4caf50', mb: 2 }} />
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#2b3445', mb: 1 }}>Order Placed! 🎉</Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    Thank you, {address.fullName}! Your order has been successfully placed.
                  </Typography>
                  {orderId && (
                    <Chip
                      label={`Order ID: #${String(orderId).slice(-8).toUpperCase()}`}
                      color="primary"
                      sx={{ mb: 3, fontSize: '1rem', px: 2, py: 3 }}
                    />
                  )}
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                    Estimated delivery: <strong>3–5 business days</strong>. You'll receive a confirmation on your registered email.
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Button variant="contained" component={Link} to="/myorders" sx={{ borderRadius: '10px', px: 3 }}>
                      View My Orders
                    </Button>
                    <Button variant="outlined" component={Link} to="/products" sx={{ borderRadius: '10px', px: 3 }}>
                      Continue Shopping
                    </Button>
                  </Box>
                </Box>
              )}

              {/* Navigation Buttons */}
              {activeStep < 2 && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                  <Button
                    startIcon={<ArrowBack />}
                    onClick={activeStep === 0 ? () => navigate('/cart') : handleBack}
                    variant="outlined"
                    sx={{ borderRadius: '10px' }}
                  >
                    {activeStep === 0 ? 'Back to Cart' : 'Back'}
                  </Button>
                  {activeStep === 1 ? (
                    <Button
                      variant="contained"
                      onClick={handlePlaceOrder}
                      disabled={placing}
                      sx={{ borderRadius: '10px', px: 4, backgroundColor: '#ff5252', '&:hover': { backgroundColor: '#e34e4e' } }}
                    >
                      {placing ? 'Placing Order...' : 'Place Order'}
                    </Button>
                  ) : (
                    <Button
                      endIcon={<ArrowForward />}
                      onClick={handleNext}
                      variant="contained"
                      sx={{ borderRadius: '10px', px: 4, backgroundColor: '#ff5252', '&:hover': { backgroundColor: '#e34e4e' } }}
                    >
                      Continue
                    </Button>
                  )}
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Order Summary Sidebar */}
          {activeStep < 2 && (
            <Grid item xs={12} md={4}>
              <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #e8ecf0', position: 'sticky', top: '80px' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Order Summary</Typography>
                <Box sx={{ mb: 2, maxHeight: '220px', overflowY: 'auto' }}>
                  {cart.map(item => (
                    <Box key={item.product._id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, fontSize: '14px' }}>
                      <Typography variant="body2" sx={{ color: '#555', maxWidth: '65%' }} noWrap>
                        {item.product.name} ×{item.quantity}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">Subtotal</Typography>
                  <Typography variant="body2">${total.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">Shipping</Typography>
                  <Typography variant="body2" sx={{ color: shipping === 0 ? '#4caf50' : 'inherit' }}>
                    {shipping === 0 ? 'FREE' : `$${shipping}`}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">Tax (18% GST)</Typography>
                  <Typography variant="body2">${tax}</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>Total</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#ff5252' }}>${grandTotal}</Typography>
                </Box>
                {shipping === 0 && (
                  <Chip label="🎉 Free shipping applied!" color="success" size="small" sx={{ mt: 2, width: '100%' }} />
                )}
              </Paper>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Checkout;
