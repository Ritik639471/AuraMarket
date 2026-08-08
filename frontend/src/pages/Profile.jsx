import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, TextField,
  Button, Tab, Tabs, Divider, Avatar, Alert, CircularProgress
} from '@mui/material';
import { Person, LocationOn, Lock, Save } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const API_URL = import.meta.env.VITE_API_URL || '';

const Profile = () => {
  const { user, setUser } = useAuth();
  const { showToast } = useToast();
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
  });
  const [addressData, setAddressData] = useState({
    addressLine1: '', addressLine2: '', city: '', state: '', pincode: '', country: 'India'
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '', newPassword: '', confirmPassword: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    fetch(`${API_URL}/api/auth/profile`, {
      headers: { 'Authorization': `Bearer ${user.token}` }
    })
      .then(res => res.json())
      .then(data => {
        setProfileData({ name: data.name || '', email: data.email || '', phone: data.phone || '' });
        if (data.address) setAddressData({ ...addressData, ...data.address });
      })
      .catch(err => console.error(err));
  }, [user]);

  const handleSaveProfile = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/auth/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` },
        body: JSON.stringify({ name: profileData.name, phone: profileData.phone })
      });
      const data = await res.json();
      if (res.ok) {
        if (setUser) setUser(prev => ({ ...prev, name: data.name }));
        showToast('✅ Profile updated!');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to save. Please try again.');
    }
    setLoading(false);
  };

  const handleSaveAddress = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/auth/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` },
        body: JSON.stringify({ address: addressData })
      });
      if (res.ok) showToast('✅ Address saved!');
      else { const d = await res.json(); setError(d.message); }
    } catch (err) {
      setError('Failed to save address.');
    }
    setLoading(false);
  };

  const handleChangePassword = async () => {
    setError('');
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match.');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` },
        body: JSON.stringify({ currentPassword: passwordData.currentPassword, newPassword: passwordData.newPassword })
      });
      const data = await res.json();
      if (res.ok) {
        showToast('🔒 Password changed!');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to change password.');
    }
    setLoading(false);
  };

  if (!user) return (
    <Container sx={{ mt: 6, textAlign: 'center' }}>
      <Typography>Please log in to view your profile.</Typography>
    </Container>
  );

  return (
    <Box sx={{ minHeight: '80vh', background: '#f8f9fa', py: 4 }}>
      <Container maxWidth="md">
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
          <Avatar sx={{ width: 72, height: 72, backgroundColor: '#ff5252', fontSize: '2rem', fontWeight: 700 }}>
            {user.name?.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#2b3445' }}>{user.name}</Typography>
            <Typography variant="body1" color="text.secondary">{user.email}</Typography>
            <Typography variant="caption" sx={{ backgroundColor: '#ff5252', color: 'white', px: 1.5, py: 0.3, borderRadius: '20px', fontWeight: 600, textTransform: 'capitalize' }}>
              {user.role}
            </Typography>
          </Box>
        </Box>

        <Paper elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e8ecf0', overflow: 'hidden' }}>
          <Tabs value={tab} onChange={(e, v) => { setTab(v); setError(''); }} sx={{ borderBottom: '1px solid #e8ecf0', px: 2 }}>
            <Tab icon={<Person fontSize="small" />} iconPosition="start" label="Account Info" />
            <Tab icon={<LocationOn fontSize="small" />} iconPosition="start" label="Saved Address" />
            <Tab icon={<Lock fontSize="small" />} iconPosition="start" label="Security" />
          </Tabs>

          <Box sx={{ p: 4 }}>
            {error && <Alert severity="error" sx={{ mb: 3, borderRadius: '10px' }}>{error}</Alert>}

            {/* Account Info */}
            {tab === 0 && (
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Personal Information</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField id="profile-name" label="Full Name" fullWidth value={profileData.name}
                      onChange={e => setProfileData({ ...profileData, name: e.target.value })} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField id="profile-email" label="Email Address" fullWidth value={profileData.email} disabled
                      helperText="Email cannot be changed" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField id="profile-phone" label="Phone Number" fullWidth value={profileData.phone}
                      onChange={e => setProfileData({ ...profileData, phone: e.target.value })} />
                  </Grid>
                </Grid>
                <Button
                  variant="contained" startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <Save />}
                  onClick={handleSaveProfile} disabled={loading}
                  sx={{ mt: 3, borderRadius: '10px', px: 4, backgroundColor: '#ff5252', '&:hover': { backgroundColor: '#e34e4e' } }}
                >
                  Save Changes
                </Button>
              </Box>
            )}

            {/* Saved Address */}
            {tab === 1 && (
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Default Delivery Address</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField id="addr-line1" label="Address Line 1" fullWidth placeholder="House No., Street, Area"
                      value={addressData.addressLine1} onChange={e => setAddressData({ ...addressData, addressLine1: e.target.value })} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField id="addr-line2" label="Address Line 2 (Optional)" fullWidth placeholder="Landmark, Colony"
                      value={addressData.addressLine2} onChange={e => setAddressData({ ...addressData, addressLine2: e.target.value })} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField id="addr-city" label="City" fullWidth value={addressData.city}
                      onChange={e => setAddressData({ ...addressData, city: e.target.value })} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField id="addr-state" label="State" fullWidth value={addressData.state}
                      onChange={e => setAddressData({ ...addressData, state: e.target.value })} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField id="addr-pincode" label="Pincode" fullWidth value={addressData.pincode}
                      onChange={e => setAddressData({ ...addressData, pincode: e.target.value })} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField id="addr-country" label="Country" fullWidth value={addressData.country}
                      onChange={e => setAddressData({ ...addressData, country: e.target.value })} />
                  </Grid>
                </Grid>
                <Button
                  variant="contained" startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <Save />}
                  onClick={handleSaveAddress} disabled={loading}
                  sx={{ mt: 3, borderRadius: '10px', px: 4, backgroundColor: '#ff5252', '&:hover': { backgroundColor: '#e34e4e' } }}
                >
                  Save Address
                </Button>
              </Box>
            )}

            {/* Security */}
            {tab === 2 && (
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Change Password</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField id="pass-current" label="Current Password" type="password" fullWidth
                      value={passwordData.currentPassword}
                      onChange={e => setPasswordData({ ...passwordData, currentPassword: e.target.value })} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField id="pass-new" label="New Password" type="password" fullWidth
                      value={passwordData.newPassword}
                      onChange={e => setPasswordData({ ...passwordData, newPassword: e.target.value })} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField id="pass-confirm" label="Confirm New Password" type="password" fullWidth
                      value={passwordData.confirmPassword}
                      onChange={e => setPasswordData({ ...passwordData, confirmPassword: e.target.value })} />
                  </Grid>
                </Grid>
                <Button
                  variant="contained" startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <Lock />}
                  onClick={handleChangePassword} disabled={loading}
                  sx={{ mt: 3, borderRadius: '10px', px: 4, backgroundColor: '#2b3445', '&:hover': { backgroundColor: '#1a2535' } }}
                >
                  Update Password
                </Button>
              </Box>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Profile;
