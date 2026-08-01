import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String, default: '' },
    subcategories: [{
        name: { type: String, required: true },
        items: [{ type: String }]
    }],
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Category', categorySchema);
