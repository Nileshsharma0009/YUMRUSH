import express from 'express';
import Coupon from '../models/Coupon.js';

const router = express.Router();

// Validate Coupon
router.post('/validate', async (req, res) => {
    try {
        const { code, amount } = req.body; // Amount needed if sort of logic depends on it
        const coupon = await Coupon.findOne({ code: code.toUpperCase(), active: true });

        if (!coupon) {
            return res.status(404).json({ message: 'Invalid Coupon Code' });
        }

        if (new Date() > coupon.expiry) {
            return res.status(400).json({ message: 'Coupon Expired' });
        }

        const discount = (amount * coupon.discountPercent) / 100;
        const finalDiscount = Math.min(discount, coupon.maxDiscount);

        res.json({
            success: true,
            discount: finalDiscount,
            percent: coupon.discountPercent,
            message: 'Coupon Applied Successfully!'
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Seed Coupons
router.post('/seed', async (req, res) => {
    try {
        await Coupon.deleteMany({});
        await Coupon.insertMany([
            { code: 'WELCOME50', discountPercent: 50, maxDiscount: 200, expiry: new Date('2030-01-01') },
            { code: 'OFFER20', discountPercent: 20, maxDiscount: 500, expiry: new Date('2030-01-01') }
        ]);
        res.json({ message: 'Coupons Seeded' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
