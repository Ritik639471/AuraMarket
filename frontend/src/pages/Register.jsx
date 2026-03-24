import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper, Link, MenuItem } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'customer' });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await register(formData);
        if (data && !data.message) {
            navigate('/');
        } else if (data && data.message) {
            alert(data.message);
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
                    <Typography component="h1" variant="h5" align="center" gutterBottom>
                        Sign Up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal" required fullWidth label="Full Name"
                            name="name" autoFocus value={formData.name} onChange={handleChange}
                        />
                        <TextField
                            margin="normal" required fullWidth label="Email Address"
                            name="email" autoComplete="email"
                            value={formData.email} onChange={handleChange}
                        />
                        <TextField
                            margin="normal" required fullWidth label="Password"
                            name="password" type="password" autoComplete="new-password"
                            value={formData.password} onChange={handleChange}
                        />
                        <TextField
                            select margin="normal" fullWidth label="Role"
                            name="role" value={formData.role} onChange={handleChange}
                        >
                            <MenuItem value="customer">Customer</MenuItem>
                            <MenuItem value="shopkeeper">Shopkeeper</MenuItem>
                        </TextField>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign Up
                        </Button>
                        <Typography variant="body2" align="center">
                            Already have an account?{' '}
                            <Link component={RouterLink} to="/login">
                                Sign In
                            </Link>
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default Register;
