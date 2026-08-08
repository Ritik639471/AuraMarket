import React from 'react';
import { Dialog, DialogContent, IconButton, Typography, Box, Button, Rating, Chip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { BsCart3 } from "react-icons/bs";

const QuickViewModal = ({ open, handleClose, product }) => {
    const { addToCart } = useCart();
    const { showToast } = useToast();

    if (!product) return null;

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogContent sx={{ p: 0, position: 'relative' }}>
                <IconButton 
                    onClick={handleClose} 
                    sx={{ position: 'absolute', right: 8, top: 8, backgroundColor: 'rgba(255,255,255,0.8)', zIndex: 10, '&:hover': { backgroundColor: '#ff5252', color: 'white' } }}
                >
                    <CloseIcon />
                </IconButton>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, height: '100%' }}>
                    {/* Image Section */}
                    <Box sx={{ width: { xs: '100%', md: '45%' }, bg: '#f9f9f9', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
                        <img 
                            src={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/400?text=No+Image'} 
                            alt={product.name} 
                            style={{ width: '100%', maxHeight: '400px', objectFit: 'contain', borderRadius: '8px' }} 
                        />
                    </Box>
                    
                    {/* Details Section */}
                    <Box sx={{ width: { xs: '100%', md: '55%' }, p: 4, display: 'flex', flexDirection: 'column' }}>
                        <Chip label={product.category} size="small" sx={{ alignSelf: 'flex-start', mb: 1, backgroundColor: '#ffeaea', color: '#ff5252', fontWeight: 600 }} />
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#2b3445' }}>
                            {product.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <Rating value={product.rating || 4} readOnly size="small" />
                            <Typography variant="body2" color="text.secondary">({product.numReviews || 0} reviews)</Typography>
                        </Box>
                        
                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#ff5252', mb: 2 }}>
                            ${product.price}
                        </Typography>
                        
                        <Typography variant="body1" sx={{ color: '#555', mb: 4, lineHeight: 1.6, flexGrow: 1 }}>
                            {product.description}
                        </Typography>

                        <Button 
                            variant="contained" 
                            size="large"
                            onClick={() => { addToCart(product); showToast('🛒 Added to Cart!'); handleClose(); }}
                            sx={{ backgroundColor: '#ff5252', '&:hover': { backgroundColor: '#e34e4e' }, py: 1.5, borderRadius: '8px', fontWeight: 700, display: 'flex', gap: 1 }}
                        >
                            <BsCart3 size={20} /> Add to Cart
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default QuickViewModal;
