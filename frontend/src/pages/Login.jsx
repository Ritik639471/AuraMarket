import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper, Link } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await login(formData.email, formData.password);
        if (data && !data.message) {
            if (data.role === 'admin') navigate('/admin');
            else if (data.role === 'shopkeeper') navigate('/shopkeeper');
            else navigate('/');
        } else if (data && data.message) {
            alert(data.message);
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
                    <Typography component="h1" variant="h5" align="center" gutterBottom>
                        Sign In
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal" required fullWidth label="Email Address"
                            name="email" autoComplete="email" autoFocus
                            value={formData.email} onChange={handleChange}
                        />
                        <TextField
                            margin="normal" required fullWidth label="Password"
                            name="password" type="password" autoComplete="current-password"
                            value={formData.password} onChange={handleChange}
                        />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign In
                        </Button>
                        <Typography variant="body2" align="center">
                            Don't have an account?{' '}
                            <Link component={RouterLink} to="/register">
                                Sign Up
                            </Link>
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default Login;
