import express from 'express';
import { v2 as cloudinary } from 'cloudinary';

const router = express.Router();

// Configure Cloudinary on backend using environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// POST /api/upload - Cloudinary Direct Upload
router.post('/', async (req, res) => {
    try {
        const { image } = req.body;

        if (!image) {
            return res.status(400).json({ message: 'No image data provided' });
        }

        // If it's already an existing hosted URL, return it directly
        if (typeof image === 'string' && image.startsWith('http')) {
            return res.json({ url: image });
        }

        // Validate Cloudinary environment credentials on Render
        if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
            console.error('Cloudinary configuration missing in environment variables');
            return res.status(500).json({
                message: 'Cloudinary credentials (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET) are missing on Render environment.'
            });
        }

        // Upload Base64 Data URI directly to Cloudinary
        const result = await cloudinary.uploader.upload(image, {
            folder: 'auramarket/products',
            resource_type: 'image',
            transformation: [{ quality: 'auto', fetch_format: 'auto' }]
        });

        return res.json({
            url: result.secure_url,
            public_id: result.public_id
        });
    } catch (err) {
        console.error('Cloudinary Upload Error:', err);
        return res.status(500).json({
            message: 'Failed to upload image to Cloudinary: ' + (err.message || 'Unknown error')
        });
    }
});

export default router;
