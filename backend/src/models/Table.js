import mongoose from 'mongoose';

const tableSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        seats: {
            type: Number,
            required: true,
        },
        type: {
            type: String, // Standard, Premium, Booth, Window
            default: 'Standard',
        },
        price: {
            type: Number,
            default: 0, // Reservation fee
        },
        isAvailable: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model('Table', tableSchema);
