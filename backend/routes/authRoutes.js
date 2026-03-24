import express from 'express';
import { registerUser, loginUser, getCart, addToCart, removeFromCart, getAllUsers, updateUserRole, deleteUser } from '../controllers/authController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Cart routes
router.get('/cart', protect, getCart);
router.post('/cart', protect, addToCart);
router.delete('/cart/:productId', protect, removeFromCart);

// Admin User Management
router.get('/users', protect, authorize('admin'), getAllUsers);
router.put('/users/:id', protect, authorize('admin'), updateUserRole);
router.delete('/users/:id', protect, authorize('admin'), deleteUser);

export default router;
