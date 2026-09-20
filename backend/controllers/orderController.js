import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const createOrder = async (req, res) => {
    const { items, totalAmount, shippingAddress } = req.body;
    try {
        // Validate stock and prepare decrements
        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).json({ message: `Product not found: ${item.product}` });
            }
            if (product.stock < item.quantity) {
                return res.status(400).json({ message: `Insufficient stock for "${product.name}". Available: ${product.stock}` });
            }
        }

        // Create the order
        const order = await Order.create({ customer: req.user._id, items, totalAmount, shippingAddress });

        // Decrement product stocks
        for (const item of items) {
            await Product.findByIdAndUpdate(item.product, {
                $inc: { stock: -item.quantity }
            });
        }

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ customer: req.user._id })
            .populate('items.product')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getShopkeeperOrders = async (req, res) => {
    try {
        let filter = {};
        if (req.user.role !== 'admin') {
            const productIds = await Product.find({ shopkeeper: req.user._id }).distinct('_id');
            filter = { 'items.product': { $in: productIds } };
        }
        const orders = await Order.find(filter)
            .populate('items.product')
            .populate('customer', 'name email')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        order.status = req.body.status || order.status;
        order.paymentStatus = req.body.paymentStatus || order.paymentStatus;
        res.json(await order.save());
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
