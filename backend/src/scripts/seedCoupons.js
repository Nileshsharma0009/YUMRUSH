import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Coupon from '../models/Coupon.js';

dotenv.config({ path: '../../.env' });

const seedCoupons = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/yumrush');
        console.log('✅ Connected to MongoDB');

        await Coupon.deleteMany({});
        await Coupon.insertMany([
            { code: 'WELCOME50', discountPercent: 50, maxDiscount: 200, expiry: new Date('2030-01-01') },
            { code: 'OFFER20', discountPercent: 20, maxDiscount: 500, expiry: new Date('2030-01-01') }
        ]);

        console.log('✅ Coupons seeded: WELCOME50, OFFER20');
        process.exit();
    } catch (error) {
        console.error('❌ Error seeding coupons:', error);
        process.exit(1);
    }
};

seedCoupons();
