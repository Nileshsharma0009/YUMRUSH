import mongoose from 'mongoose';

const tableSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Table 1, T2, etc.
    seats: { type: Number, required: true }, // Capacity
    type: { type: String, enum: ['Standard', 'Premium', 'Window', 'Booth'], default: 'Standard' },
    price: { type: Number, default: 0 }, // Booking fee/price
    isAvailable: { type: Boolean, default: true }, // Temporary toggle
}, { timestamps: true });

export default mongoose.model('Table', tableSchema);
