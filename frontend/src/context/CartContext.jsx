import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const API_URL = import.meta.env.VITE_API_URL || '';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const { user } = useAuth();

    // Fetch cart on login
    useEffect(() => {
        if (user) {
            fetch(`${API_URL}/api/auth/cart`, {
                headers: { 'Authorization': `Bearer ${user.token}` }
            })
            .then(res => res.json())
            .then(data => { if (Array.isArray(data)) setCart(data); })
            .catch(err => console.error('Cart Fetch Error:', err));
        } else {
            setCart([]);
        }
    }, [user]);

    const addToCart = async (product, quantity = 1) => {
        if (!user) return alert('Please login to add to cart');

        const res = await fetch(`${API_URL}/api/auth/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ productId: product._id, quantity })
        });
        const data = await res.json();
        if (res.ok) {
            setCart(data);
        }
    };

    const updateQuantity = async (productId, quantity) => {
        const res = await fetch(`${API_URL}/api/auth/cart`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ productId, quantity })
        });
        const data = await res.json();
        if (res.ok) {
            setCart(data);
        }
    };

    const removeFromCart = async (productId) => {
        const res = await fetch(`${API_URL}/api/auth/cart/${productId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${user.token}` }
        });
        const data = await res.json();
        if (res.ok) {
            setCart(data);
        }
    };

    const clearCart = async () => {
        if (user) {
            await fetch(`${API_URL}/api/auth/cart`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
        }
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
