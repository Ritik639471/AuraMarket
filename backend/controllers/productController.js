import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('shopkeeper', 'name email');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
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
        res.status(500).json({ message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product && product.shopkeeper.toString() === req.user._id.toString()) {
            Object.assign(product, req.body);
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
        if (product && product.shopkeeper.toString() === req.user._id.toString()) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found or not authorized' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
