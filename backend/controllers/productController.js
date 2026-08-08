import Product from '../models/Product.js';

// GET /api/products?page=1&limit=12&category=X&search=Y&sort=price_asc&minPrice=0&maxPrice=9999
export const getProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const { category, search, sort, minPrice, maxPrice } = req.query;

        const filter = {};
        const andConditions = [];

        if (category) {
            const categoriesList = category.split(',').map(c => new RegExp(c.trim(), 'i'));
            andConditions.push({
                $or: [
                    { category: { $in: categoriesList } },
                    { subCategory: { $in: categoriesList } },
                    { division: { $in: categoriesList } }
                ]
            });
        }

        if (search) {
            andConditions.push({
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { category: { $regex: search, $options: 'i' } },
                    { subCategory: { $regex: search, $options: 'i' } },
                    { division: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } }
                ]
            });
        }

        if (minPrice !== undefined || maxPrice !== undefined) {
            const priceFilter = {};
            if (minPrice !== undefined) priceFilter.$gte = Number(minPrice);
            if (maxPrice !== undefined) priceFilter.$lte = Number(maxPrice);
            andConditions.push({ price: priceFilter });
        }

        if (andConditions.length > 0) {
            filter.$and = andConditions;
        }

        const sortObj = {};
        if (sort === 'price_asc') sortObj.price = 1;
        else if (sort === 'price_desc') sortObj.price = -1;
        else if (sort === 'name_asc') sortObj.name = 1;
        else if (sort === 'name_desc') sortObj.name = -1;
        else if (sort === 'rating') sortObj.rating = -1;
        else sortObj.createdAt = -1;

        const total = await Product.countDocuments(filter);
        const products = await Product.find(filter)
            .sort(sortObj)
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('shopkeeper', 'name email');

        res.json({ products, total, page, pages: Math.ceil(total / limit) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/products/all — no pagination (for seeding, admin)
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('shopkeeper', 'name email');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createProduct = async (req, res) => {
    const { name, description, price, category, subCategory, division, images, stock } = req.body;
    try {
        // images can be a comma-separated string or array
        const imagesArr = Array.isArray(images)
            ? images
            : typeof images === 'string'
                ? images.split(',').map(s => s.trim()).filter(Boolean)
                : [];

        const product = await Product.create({
            name, description, price, category, subCategory, division,
            images: imagesArr, stock,
            shopkeeper: req.user._id
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product && (product.shopkeeper.toString() === req.user._id.toString() || req.user.role === 'admin')) {
            const { name, description, price, category, subCategory, division, images, stock } = req.body;
            if (name) product.name = name;
            if (description) product.description = description;
            if (price) product.price = price;
            if (category) product.category = category;
            if (subCategory !== undefined) product.subCategory = subCategory;
            if (division !== undefined) product.division = division;
            if (images) {
                product.images = Array.isArray(images)
                    ? images
                    : images.split(',').map(s => s.trim()).filter(Boolean);
            }
            if (stock !== undefined) product.stock = stock;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found or not authorized' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product && (product.shopkeeper.toString() === req.user._id.toString() || req.user.role === 'admin')) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found or not authorized' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getShopkeeperProducts = async (req, res) => {
    try {
        const products = await Product.find({ shopkeeper: req.user._id });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchProducts = async (req, res) => {
    const { q } = req.query;
    try {
        const products = await Product.find({
            $or: [
                { name: { $regex: q, $options: 'i' } },
                { category: { $regex: q, $options: 'i' } },
                { subCategory: { $regex: q, $options: 'i' } },
                { description: { $regex: q, $options: 'i' } }
            ]
        }).limit(10).populate('shopkeeper', 'name email');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('shopkeeper', 'name email').populate('reviews.user', 'name');
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /api/products/:id/reviews
export const addReview = async (req, res) => {
    const { rating, comment } = req.body;
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());
        if (alreadyReviewed) return res.status(400).json({ message: 'Product already reviewed' });

        const review = { user: req.user._id, name: req.user.name, rating: Number(rating), comment };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length;

        await product.save();
        res.status(201).json({ message: 'Review added' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
