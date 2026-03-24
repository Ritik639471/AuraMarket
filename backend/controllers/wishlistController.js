import User from '../models/User.js';

export const getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('wishlist');
        res.json(user.wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addToWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user.wishlist.includes(req.body.productId)) {
            user.wishlist.push(req.body.productId);
            await user.save();
        }
        res.json(user.wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeFromWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        user.wishlist = user.wishlist.filter(id => id.toString() !== req.params.productId);
        await user.save();
        res.json(user.wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
