/**
 * AuraMarket Production Security & Performance Middleware Suite
 * Implements OWASP Top 10 Protections & Sub-50ms Response Optimization
 */

// 1. HTTP Security Headers (Equivalent to Helmet)
export const securityHeaders = (req, res, next) => {
    // Remove Express fingerprinting header
    res.removeHeader('X-Powered-By');
    
    // Prevent MIME-sniffing
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    // Clickjacking protection
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    
    // Cross-site scripting (XSS) filter
    res.setHeader('X-XSS-Protection', '1; mode=block');
    
    // Enforce HTTPS transmission
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    
    // Limit referrer information leakage
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Restrict Flash / PDF cross-domain policies
    res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
    
    next();
};

// 2. In-Memory Sliding-Window Rate Limiter (Brute-Force & DoS Guard)
const requestMap = new Map();

// Periodic cleanup of stale rate-limit records every 5 minutes
setInterval(() => {
    const now = Date.now();
    for (const [key, record] of requestMap.entries()) {
        if (now - record.startTime > record.windowMs) {
            requestMap.delete(key);
        }
    }
}, 5 * 60 * 1000);

export const createRateLimiter = ({ windowMs = 15 * 60 * 1000, maxRequests = 100, message = 'Too many requests, please try again later.' }) => {
    return (req, res, next) => {
        const ip = req.ip || req.connection.remoteAddress || 'unknown';
        const key = `${ip}:${req.baseUrl || req.path}`;
        const now = Date.now();

        let record = requestMap.get(key);
        if (!record || now - record.startTime > windowMs) {
            record = { count: 1, startTime: now, windowMs };
            requestMap.set(key, record);
        } else {
            record.count += 1;
        }

        res.setHeader('X-RateLimit-Limit', maxRequests);
        res.setHeader('X-RateLimit-Remaining', Math.max(0, maxRequests - record.count));
        res.setHeader('X-RateLimit-Reset', Math.ceil((record.startTime + windowMs) / 1000));

        if (record.count > maxRequests) {
            return res.status(429).json({
                success: false,
                error: 'RateLimitExceeded',
                message,
                retryAfterSeconds: Math.ceil((record.startTime + windowMs - now) / 1000)
            });
        }

        next();
    };
};

// Specialized strict limiter for Authentication endpoints (prevents credential stuffing)
export const authRateLimiter = createRateLimiter({
    windowMs: 15 * 60 * 1000, // 15 mins
    maxRequests: 20,           // max 20 login/register attempts per IP
    message: 'Too many authentication attempts. Please try again after 15 minutes.'
});

// General API Rate Limiter
export const apiRateLimiter = createRateLimiter({
    windowMs: 15 * 60 * 1000,
    maxRequests: 600,
    message: 'Too many requests from this IP. Please slow down.'
});

// 3. NoSQL Injection Query & Body Sanitizer
const cleanObject = (obj) => {
    if (!obj || typeof obj !== 'object') return obj;
    for (const key of Object.keys(obj)) {
        if (key.startsWith('$') || key.includes('.')) {
            delete obj[key];
        } else if (typeof obj[key] === 'object') {
            cleanObject(obj[key]);
        }
    }
    return obj;
};

export const sanitizeNoSql = (req, res, next) => {
    if (req.body) cleanObject(req.body);
    if (req.query) cleanObject(req.query);
    if (req.params) cleanObject(req.params);
    next();
};

// 4. In-Memory Cache-Aside Layer for Sub-10ms Read Responses
const cacheStore = new Map();

export const cacheResponse = (ttlSeconds = 60) => {
    return (req, res, next) => {
        // Only cache safe GET requests
        if (req.method !== 'GET') return next();

        const cacheKey = req.originalUrl || req.url;
        const cached = cacheStore.get(cacheKey);
        const now = Date.now();

        if (cached && now < cached.expiry) {
            res.setHeader('X-Cache', 'HIT');
            res.setHeader('X-Cache-TTL', Math.ceil((cached.expiry - now) / 1000));
            return res.json(cached.data);
        }

        // Intercept res.json to populate cache
        const originalJson = res.json.bind(res);
        res.json = (data) => {
            cacheStore.set(cacheKey, {
                data,
                expiry: now + (ttlSeconds * 1000)
            });
            res.setHeader('X-Cache', 'MISS');
            return originalJson(data);
        };

        next();
    };
};

export const purgeCache = (prefix = '') => {
    for (const key of cacheStore.keys()) {
        if (!prefix || key.includes(prefix)) {
            cacheStore.delete(key);
        }
    }
};
