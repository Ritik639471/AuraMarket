import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import adRoutes from './routes/adRoutes.js';
import wishlistRoutes from './routes/wishlistRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import dns from 'dns';
import { 
    securityHeaders, 
    sanitizeNoSql, 
    apiRateLimiter, 
    authRateLimiter, 
    cacheResponse 
} from './middleware/security.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dns.setServers(['8.8.8.8', '8.8.4.4']);
dotenv.config();

const app = express();

// 1. Enterprise Security Middleware Stack (OWASP Top 10)
app.use(securityHeaders);
app.use(sanitizeNoSql);

// 2. Body Parsers & CORS
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// 3. Static Assets
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 4. Rate Limiting Protection (DDoS & Brute-Force Shield)
app.use('/api', apiRateLimiter);

// 5. Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/auramarket')
    .then(() => console.log('Connected to MongoDB (Indexed & Optimized)'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// 6. Application Routes with Cache-Aside Acceleration
app.use('/api/auth', authRateLimiter, authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/banners', cacheResponse(60), adRoutes); // Primary adblock-immune route
app.use('/api/ads', cacheResponse(60), adRoutes); // Legacy fallback route
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/categories', cacheResponse(120), categoryRoutes);
app.use('/api/upload', uploadRoutes);

// 7. Production DevOps Health & Metrics Endpoint
app.get('/api/health', (req, res) => {
    const memory = process.memoryUsage();
    res.json({
        status: 'UP',
        service: 'AuraMarket API',
        uptimeSeconds: Math.floor(process.uptime()),
        timestamp: new Date().toISOString(),
        database: mongoose.connection.readyState === 1 ? 'CONNECTED' : 'DISCONNECTED',
        memory: {
            heapUsedMB: Math.round(memory.heapUsed / 1024 / 1024),
            heapTotalMB: Math.round(memory.heapTotal / 1024 / 1024),
            rssMB: Math.round(memory.rss / 1024 / 1024)
        },
        nodeVersion: process.version
    });
});

app.get('/', (req, res) => {
    res.send('AuraMarket High-Performance E-Commerce API is running...');
});

// 8. Centralized Production Safe Error Handler
app.use((err, req, res, next) => {
    console.error('Unhandled API Error:', err);
    const statusCode = err.status || err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        error: err.name || 'InternalServerError',
        message: err.message || 'An unexpected error occurred',
        ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {})
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`AuraMarket Secure API Server running on port ${PORT} (IPv4 bound)`);
});
