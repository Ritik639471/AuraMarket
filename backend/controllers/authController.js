import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', { expiresIn: '30d' });
};

export const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        // If it's the first user, make them admin
        const isFirstUser = (await User.countDocuments({})) === 0;
        const assignedRole = isFirstUser ? 'admin' : (role || 'customer');

        const user = await User.create({ name, email, password, role: assignedRole });
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({ message: error.message, stack: error.stack });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await user.comparePassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message, stack: error.stack });
    }
};

// Admin Controllers
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUserRole = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.role = req.body.role || user.role;
            await user.save();
            res.json({ message: 'User role updated', user });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await user.deleteOne();
            res.json({ message: 'User removed' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
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
        const cartItemIdx = user.cart.findIndex(item => item.product.toString() === productId);
        
        if (cartItemIdx > -1) {
            user.cart[cartItemIdx].quantity += (quantity || 1);
        } else {
            user.cart.push({ product: productId, quantity: quantity || 1 });
        }
        
        await user.save();
        const updatedUser = await User.findById(req.user._id).populate('cart.product');
        res.json(updatedUser.cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        user.cart = user.cart.filter(item => item.product.toString() !== req.params.productId);
        await user.save();
        const updatedUser = await User.findById(req.user._id).populate('cart.product');
        res.json(updatedUser.cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
