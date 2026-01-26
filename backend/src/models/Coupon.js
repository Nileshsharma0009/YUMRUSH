import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    discountPercent: { type: Number, required: true },
    maxDiscount: { type: Number, default: 500 },
    expiry: { type: Date, required: true },
    active: { type: Boolean, default: true }
});

export default mongoose.model('Coupon', couponSchema);
