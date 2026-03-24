import mongoose from 'mongoose';

const adSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String },
    active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Ad', adSchema);
