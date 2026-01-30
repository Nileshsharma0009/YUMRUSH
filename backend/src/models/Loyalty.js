import mongoose from 'mongoose';

const loyaltySchema = new mongoose.Schema(
    {
        phone: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        name: {
            type: String,
            trim: true,
        },
        totalVisits: {
            type: Number,
            default: 0,
        },
        points: {
            type: Number,
            default: 0,
        },
        lastVisitDate: {
            type: Date,
            default: Date.now,
        }
    },
    { timestamps: true }
);

export default mongoose.model('Loyalty', loyaltySchema);
