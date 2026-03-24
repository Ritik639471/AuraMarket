import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const API_URL = import.meta.env.VITE_API_URL || '';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const { user } = useAuth();
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        if (user) {
            fetchWishlist();
        } else {
            setWishlist([]);
        }
    }, [user]);

    const fetchWishlist = async () => {
        try {
            const res = await fetch(`${API_URL}/api/wishlist`, {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            const data = await res.json();
            if (res.ok) setWishlist(data);
        } catch (err) {
            console.error('Wishlist Fetch Error:', err);
        }
    };

    const toggleWishlist = async (productId) => {
        if (!user) return alert('Please login to add items to wishlist');
        
        const isItemInWishlist = wishlist.some(item => item._id === productId || item === productId);
        
        if (isItemInWishlist) {
            const res = await fetch(`${API_URL}/api/wishlist/${productId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            if (res.ok) setWishlist(wishlist.filter(item => (item._id || item) !== productId));
        } else {
            const res = await fetch(`${API_URL}/api/wishlist`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ productId })
            });
            if (res.ok) fetchWishlist();
        }
    };

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist, fetchWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};
