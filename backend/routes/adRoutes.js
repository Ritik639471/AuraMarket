import express from 'express';
import { getAds, createAd, deleteAd } from '../controllers/adController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAds);
router.post('/', protect, authorize('admin'), createAd);
router.delete('/:id', protect, authorize('admin'), deleteAd);

export default router;
