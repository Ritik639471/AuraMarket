import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { Campaign, Add, Delete, CheckCircle, Warning } from '@mui/icons-material';
import Header from '../../components/Header';

const API_URL = import.meta.env.VITE_API_URL || '';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [ads, setAds] = useState([]);
    const [open, setOpen] = useState(false);
    const [newAd, setNewAd] = useState({ title: '', description: '', image: '', link: '' });

    useEffect(() => {
        if (user) {
            fetch(`${API_URL}/api/ads`)
                .then(res => res.json())
                .then(data => setAds(data));
        }
    }, [user]);

    const handleAddAd = async (e) => {
        e.preventDefault();
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
            fetch(`${API_URL}/api/ads`)
                .then(res => res.json())
                .then(data => setAds(data));
        }
    };

    const handleDeleteAd = async (id) => {
        const res = await fetch(`${API_URL}/api/ads/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${user.token}` }
        });
        if (res.ok) {
            fetch(`${API_URL}/api/ads`)
                .then(res => res.json())
                .then(data => setAds(data));
        }
    };

    return (
        <Box>
            <Header />
            <Container sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
                
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Campaign color="primary" /> Manage Ads
                    </Typography>
                    <Button 
                        variant="contained" 
                        startIcon={<Add />} 
                        onClick={() => setOpen(true)} 
                        sx={{ mb: 3, borderRadius: '10px', px: 4 }}
                    >
                        Add New Ad
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
                                <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Image</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ads.map((ad) => (
                                <TableRow key={ad._id} sx={{ '&:hover': { backgroundColor: 'rgba(0,0,0,0.02)' } }}>
                                    <TableCell sx={{ fontWeight: 500 }}>{ad.title}</TableCell>
                                    <TableCell>
                                        <Box sx={{ 
                                            width: 60, height: 40, 
                                            borderRadius: '8px', 
                                            overflow: 'hidden',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                        }}>
                                            <img src={ad.image} alt={ad.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ 
                                            display: 'inline-flex', 
                                            alignItems: 'center', gap: 0.5,
                                            px: 1.5, py: 0.5, 
                                            borderRadius: '20px', 
                                            fontSize: '0.75rem', 
                                            fontWeight: 700,
                                            backgroundColor: ad.active ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 152, 0, 0.1)',
                                            color: ad.active ? '#2e7d32' : '#ed6c02'
                                        }}>
                                            {ad.active ? <CheckCircle sx={{ fontSize: 16 }} /> : <Warning sx={{ fontSize: 16 }} />}
                                            {ad.active ? 'Active' : 'Inactive'}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Button 
                                            size="small" 
                                            color="error" 
                                            variant="outlined"
                                            startIcon={<Delete />}
                                            onClick={() => handleDeleteAd(ad._id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
            </Container>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add New Advertisement</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                        <TextField label="Title" fullWidth value={newAd.title} onChange={(e) => setNewAd({...newAd, title: e.target.value})} />
                        <TextField label="Description" fullWidth multiline rows={2} value={newAd.description} onChange={(e) => setNewAd({...newAd, description: e.target.value})} />
                        <TextField label="Image URL" fullWidth value={newAd.image} onChange={(e) => setNewAd({...newAd, image: e.target.value})} />
                        <TextField label="Redirect Link" fullWidth value={newAd.link} onChange={(e) => setNewAd({...newAd, link: e.target.value})} />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleAddAd} variant="contained">Create Ad</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AdminDashboard;
