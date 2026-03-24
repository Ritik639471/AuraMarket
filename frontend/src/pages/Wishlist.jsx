import React from 'react';
import { Container, Typography, Grid, Box, Paper, Button } from '@mui/material';
import { useWishlist } from '../context/WishlistContext';
import ProductItem from '../components/ProductItem';
import Header from '../components/Header';

const Wishlist = () => {
    const { wishlist, toggleWishlist } = useWishlist();

    return (
        <Box>
            <Container sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom>My Wishlist</Typography>
                {wishlist.length === 0 ? (
                    <Typography variant="body1">Your wishlist is empty.</Typography>
                ) : (
                    <Grid container spacing={3}>
                        {wishlist.map((product) => (
                            <Grid item xs={12} sm={6} md={3} key={product._id}>
                                <Paper elevation={2} sx={{ p: 1, position: 'relative' }}>
                                    <ProductItem product={product} />
                                    <Button 
                                        onClick={() => toggleWishlist(product._id)}
                                        variant="outlined" color="error" fullWidth sx={{ mt: 1 }}
                                    >
                                        Remove
                                    </Button>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Box>
    );
};

export default Wishlist;
