import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    category: { type: String, required: true }, // e.g., 'Starters', 'Main Course', 'Desserts'
    isVeg: { type: Boolean, default: true },
    image: String,
    available: { type: Boolean, default: true }
});

export default mongoose.model('Menu', menuSchema);
