import React, { useState, useEffect } from "react";
import { Slider, Typography, Box, Chip, Rating } from "@mui/material";
import { FilterList, ExpandMore, ExpandLess } from "@mui/icons-material";

const API_URL = import.meta.env.VITE_API_URL || '';

const SectionHeader = ({ title, isOpen, onToggle }) => (
    <Box
        onClick={onToggle}
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', py: 1.5, borderBottom: '1px solid #f0f0f0' }}
    >
        <Typography sx={{ fontWeight: 700, fontSize: '14px', color: '#2b3445', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {title}
        </Typography>
        {isOpen ? <ExpandLess sx={{ fontSize: 18, color: '#999' }} /> : <ExpandMore sx={{ fontSize: 18, color: '#999' }} />}
    </Box>
);

const SideBar = ({ onPriceChange, onRatingChange, dynamicPriceRange = [0, 10000] }) => {
    const [openSections, setOpenSections] = useState({ price: true, rating: false });
    const [priceRange, setPriceRange] = useState(dynamicPriceRange);
    const [selectedRating, setSelectedRating] = useState(null);
    useEffect(() => {
        setPriceRange(dynamicPriceRange);
    }, [dynamicPriceRange[0], dynamicPriceRange[1]]);

    const toggleSection = (key) => setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));

    const handlePriceChange = (_, newValue) => {
        setPriceRange(newValue);
        if (onPriceChange) onPriceChange(newValue);
    };

    const handleRatingClick = (r) => {
        const newRating = selectedRating === r ? null : r;
        setSelectedRating(newRating);
        if (onRatingChange) onRatingChange(newRating);
    };

    return (
        <Box sx={{ width: '100%', bgcolor: 'white', borderRadius: '12px', border: '1px solid #f0f0f0', overflow: 'hidden' }}>
            <Box sx={{ px: 2.5, py: 2, borderBottom: '2px solid #ff5252', display: 'flex', alignItems: 'center', gap: 1 }}>
                <FilterList sx={{ color: '#ff5252', fontSize: 20 }} />
                <Typography sx={{ fontWeight: 800, fontSize: '15px', color: '#2b3445' }}>FILTERS</Typography>
            </Box>

            <Box sx={{ px: 2.5 }}>
                <SectionHeader title="Price Range" isOpen={openSections.price} onToggle={() => toggleSection('price')} />
                {openSections.price && (
                    <Box sx={{ py: 2 }}>
                        <Slider
                            value={priceRange}
                            onChange={handlePriceChange}
                            min={dynamicPriceRange[0]}
                            max={dynamicPriceRange[1]}
                            valueLabelDisplay="auto"
                            valueLabelFormat={v => `$${v}`}
                            sx={{ color: '#ff5252', '& .MuiSlider-thumb': { width: 16, height: 16 } }}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                            <Chip label={`$${priceRange[0]}`} size="small" variant="outlined" sx={{ fontSize: '12px', borderColor: '#ff5252', color: '#ff5252', fontWeight: 700 }} />
                            <Chip label={`$${priceRange[1]}`} size="small" variant="outlined" sx={{ fontSize: '12px', borderColor: '#ff5252', color: '#ff5252', fontWeight: 700 }} />
                        </Box>
                    </Box>
                )}

                <SectionHeader title="Rating" isOpen={openSections.rating} onToggle={() => toggleSection('rating')} />
                {openSections.rating && (
                    <Box sx={{ py: 1.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {[5, 4, 3, 2, 1].map(r => (
                            <Box
                                key={r}
                                onClick={() => handleRatingClick(r)}
                                sx={{
                                    display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer',
                                    px: 1, py: 0.5, borderRadius: '6px', transition: 'all 0.15s',
                                    background: selectedRating === r ? '#fff5f5' : 'transparent',
                                    border: selectedRating === r ? '1px solid #ff5252' : '1px solid transparent',
                                    '&:hover': { background: '#fff5f5' }
                                }}
                            >
                                <Rating value={r} size="small" readOnly />
                                <Typography sx={{ fontSize: '12px', color: '#888' }}>&amp; above</Typography>
                            </Box>
                        ))}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default SideBar;