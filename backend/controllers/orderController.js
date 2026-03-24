import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const createOrder = async (req, res) => {
    const { items, totalAmount, shippingAddress } = req.body;
    try {
        const order = await Order.create({
            customer: req.user._id,
            items, totalAmount, shippingAddress
        });
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ customer: req.user._id }).populate('items.product');
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
        if (order) {
            order.status = req.body.status || order.status;
            order.paymentStatus = req.body.paymentStatus || order.paymentStatus;
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
