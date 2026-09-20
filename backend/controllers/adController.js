import Ad from '../models/Ad.js';

export const getAds = async (req, res) => {
    try {
        const query = req.query.all === 'true' ? {} : { active: true };
        const ads = await Ad.find(query).sort({ createdAt: -1 });
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

export const updateAd = async (req, res) => {
    try {
        const ad = await Ad.findById(req.params.id);
        if (ad) {
            ad.title = req.body.title || ad.title;
            ad.description = req.body.description || ad.description;
            ad.image = req.body.image || ad.image;
            ad.link = req.body.link || ad.link;
            ad.active = req.body.active !== undefined ? req.body.active : ad.active;
            const updatedAd = await ad.save();
            res.json(updatedAd);
        } else {
            res.status(404).json({ message: 'Ad not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message, stack: error.stack });
    }
};

export const promoteAd = async (req, res) => {
    try {
        const { title, description, image, link } = req.body;
        // When shopkeeper pays for ad promotion, activate it immediately so it appears in the live ad list
        const newAd = await Ad.create({
            title,
            description,
            image,
            link,
            status: 'approved',
            active: true,
            shopkeeper: req.user._id
        });
        res.status(201).json({ message: 'Ad payment confirmed and promotion activated', ad: newAd });
    } catch (error) {
        res.status(500).json({ message: error.message, stack: error.stack });
    }
};
