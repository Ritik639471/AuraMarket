import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('shopkeeper', 'name email');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message, stack: error.stack });
    }
};

export const createProduct = async (req, res) => {
    const { name, description, price, category, image, stock } = req.body;
    try {
        const product = await Product.create({
            name, description, price, category, image, stock,
            shopkeeper: req.user._id
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message, stack: error.stack });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product && (product.shopkeeper.toString() === req.user._id.toString() || req.user.role === 'admin')) {
            // Only update fields provided in body
            const { name, description, price, category, image, stock } = req.body;
            if (name) product.name = name;
            if (description) product.description = description;
            if (price) product.price = price;
            if (category) product.category = category;
            if (image) product.image = image;
            if (stock !== undefined) product.stock = stock;
            
            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found or not authorized' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message, stack: error.stack });
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
        res.status(500).json({ message: error.message, stack: error.stack });
    }
};

export const getShopkeeperProducts = async (req, res) => {
    try {
        const products = await Product.find({ shopkeeper: req.user._id });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message, stack: error.stack });
    }
};

export const searchProducts = async (req, res) => {
    const { q } = req.query;
    try {
        const products = await Product.find({
            $or: [
                { name: { $regex: q, $options: 'i' } },
                { category: { $regex: q, $options: 'i' } },
                { description: { $regex: q, $options: 'i' } }
            ]
        }).populate('shopkeeper', 'name email');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message, stack: error.stack });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('shopkeeper', 'name email');
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message, stack: error.stack });
    }
};
