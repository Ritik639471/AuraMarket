import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET || 'secret', { expiresIn: '30d' });

export const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });
        const isFirstUser = (await User.countDocuments({})) === 0;
        const assignedRole = isFirstUser ? 'admin' : (role || 'customer');
        const user = await User.create({ name, email, password, role: assignedRole });
        res.status(201).json({ _id: user._id, name: user.name, email: user.email, role: user.role, token: generateToken(user._id) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await user.comparePassword(password))) {
            res.json({ _id: user._id, name: user.name, email: user.email, role: user.role, token: generateToken(user._id) });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        res.json(await User.find({}).select('-password'));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUserRole = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        user.role = req.body.role || user.role;
        await user.save();
        res.json({ message: 'User role updated', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        await user.deleteOne();
        res.json({ message: 'User removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProfile = async (req, res) => {
    try {
        res.json(await User.findById(req.user._id).select('-password -cart -wishlist'));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProfile = async (req, res) => {
    const { name, phone, address, currentPassword, newPassword } = req.body;
    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        if (name) user.name = name;
        if (phone !== undefined) user.phone = phone;
        if (address) user.address = { ...user.address, ...address };
        if (newPassword) {
            if (!currentPassword) return res.status(400).json({ message: 'Current password required' });
            if (!(await user.comparePassword(currentPassword))) return res.status(400).json({ message: 'Current password is incorrect' });
            user.password = newPassword;
        }
        await user.save();
        res.json({
            _id: user._id, name: user.name, email: user.email, role: user.role,
            phone: user.phone, address: user.address,
            token: req.headers.authorization.split(' ')[1]
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCart = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('cart.product');
        res.json(user.cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        const user = await User.findById(req.user._id);
        const idx = user.cart.findIndex(item => item.product.toString() === productId);
        if (idx > -1) user.cart[idx].quantity += (quantity || 1);
        else user.cart.push({ product: productId, quantity: quantity || 1 });
        await user.save();
        const updated = await User.findById(req.user._id).populate('cart.product');
        res.json(updated.cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCartQuantity = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        const user = await User.findById(req.user._id);
        const idx = user.cart.findIndex(item => item.product.toString() === productId);
        if (idx > -1) {
            if (quantity <= 0) user.cart.splice(idx, 1);
            else user.cart[idx].quantity = quantity;
        }
        await user.save();
        const updated = await User.findById(req.user._id).populate('cart.product');
        res.json(updated.cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        user.cart = user.cart.filter(item => item.product.toString() !== req.params.productId);
        await user.save();
        const updated = await User.findById(req.user._id).populate('cart.product');
        res.json(updated.cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const clearCart = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        user.cart = [];
        await user.save();
        res.json([]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
