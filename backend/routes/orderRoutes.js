import express from 'express';
import { createOrder, getMyOrders, getShopkeeperOrders, updateOrderStatus } from '../controllers/orderController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/myorders', protect, getMyOrders);
router.get('/shopkeeper', protect, authorize('shopkeeper', 'admin'), getShopkeeperOrders);
router.put('/:id', protect, authorize('shopkeeper', 'admin'), updateOrderStatus);

export default router;
