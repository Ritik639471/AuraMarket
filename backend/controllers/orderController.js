import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const createOrder = async (req, res) => {
    const { items, totalAmount, shippingAddress } = req.body;
    try {
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'Order must contain at least one item' });
        }

        // Atomically decrement stock — prevents race conditions on concurrent orders.
        // findOneAndUpdate with stock >= quantity ensures atomicity at DB level.
        const decremented = [];
        for (const item of items) {
            const updated = await Product.findOneAndUpdate(
                { _id: item.product, stock: { $gte: item.quantity } },
                { $inc: { stock: -item.quantity } },
                { new: true }
            );
            if (!updated) {
                // Rollback: restore already-decremented stock
                for (const rolled of decremented) {
                    await Product.findByIdAndUpdate(rolled.id, { $inc: { stock: rolled.qty } });
                }
                const failedProduct = await Product.findById(item.product);
                return res.status(400).json({
                    message: `Insufficient stock for "${failedProduct?.name || item.product}". Please reduce quantity.`
                });
            }
            decremented.push({ id: item.product, qty: item.quantity });
        }

        const order = await Order.create({ customer: req.user._id, items, totalAmount, shippingAddress });
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
        const VALID_STATUSES = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
        const VALID_PAYMENT = ['Unpaid', 'Paid'];

        if (req.body.status && !VALID_STATUSES.includes(req.body.status)) {
            return res.status(400).json({ message: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` });
        }
        if (req.body.paymentStatus && !VALID_PAYMENT.includes(req.body.paymentStatus)) {
            return res.status(400).json({ message: `Invalid paymentStatus. Must be one of: ${VALID_PAYMENT.join(', ')}` });
        }

        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        if (req.body.status) order.status = req.body.status;
        if (req.body.paymentStatus) order.paymentStatus = req.body.paymentStatus;
        res.json(await order.save());
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PATCH /api/orders/:id/cancel — Customer can cancel their own Pending orders
export const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        // Only the customer who placed the order can cancel it
        if (order.customer.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to cancel this order' });
        }

        if (order.status !== 'Pending') {
            return res.status(400).json({ message: `Cannot cancel order in "${order.status}" status. Only Pending orders can be cancelled.` });
        }

        // Restore stock for all items in the cancelled order
        for (const item of order.items) {
            await Product.findByIdAndUpdate(item.product, {
                $inc: { stock: item.quantity }
            });
        }

        order.status = 'Cancelled';
        res.json(await order.save());
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

