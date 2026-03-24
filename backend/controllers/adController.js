import Ad from '../models/Ad.js';

export const getAds = async (req, res) => {
    try {
        const ads = await Ad.find({ active: true });
        res.json(ads);
    } catch (error) {
        res.status(500).json({ message: error.message, stack: error.stack });
    }
};

export const createAd = async (req, res) => {
    try {
        const ad = await Ad.create(req.body);
        res.status(201).json(ad);
    } catch (error) {
        res.status(500).json({ message: error.message, stack: error.stack });
    }
};

export const deleteAd = async (req, res) => {
    try {
        const ad = await Ad.findById(req.params.id);
        if (ad) {
            await ad.deleteOne();
            res.json({ message: 'Ad removed' });
        } else {
            res.status(404).json({ message: 'Ad not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message, stack: error.stack });
    }
};
