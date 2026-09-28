import express from 'express';
import { createOrder, getMyOrders, getShopkeeperOrders, updateOrderStatus, cancelOrder } from '../controllers/orderController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/myorders', protect, getMyOrders);
router.get('/shopkeeper', protect, authorize('shopkeeper', 'admin'), getShopkeeperOrders);
router.patch('/:id/cancel', protect, cancelOrder);                           // NEW: customer cancel
router.put('/:id', protect, authorize('shopkeeper', 'admin'), updateOrderStatus);

export default router;
