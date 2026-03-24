import express from 'express';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/', protect, authorize('shopkeeper', 'admin'), createProduct);
router.put('/:id', protect, authorize('shopkeeper', 'admin'), updateProduct);
router.delete('/:id', protect, authorize('shopkeeper', 'admin'), deleteProduct);

export default router;
