import express from 'express';
import { getProducts, getAllProducts, createProduct, updateProduct, deleteProduct, searchProducts, getShopkeeperProducts, getProductById, addReview } from '../controllers/productController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/all', getAllProducts);
router.get('/search', searchProducts);
router.get('/shopkeeper', protect, authorize('shopkeeper', 'admin'), getShopkeeperProducts);
router.get('/:id', getProductById);
router.post('/', protect, authorize('shopkeeper', 'admin'), createProduct);
router.put('/:id', protect, authorize('shopkeeper', 'admin'), updateProduct);
router.delete('/:id', protect, authorize('shopkeeper', 'admin'), deleteProduct);
router.post('/:id/reviews', protect, addReview);

export default router;
