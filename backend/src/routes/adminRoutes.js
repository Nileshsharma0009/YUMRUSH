import express from 'express';
import Booking from '../models/Booking.js';
import Order from '../models/Order.js';

const router = express.Router();

router.get('/stats', async (req, res) => {
    try {
        // 1. Total & Today's Orders
        const totalOrders = await Order.countDocuments();

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const todayOrders = await Order.countDocuments({ createdAt: { $gte: startOfDay } });

        // 2. Total Revenue (Sum of totalAmount)
        const revenueAgg = await Order.aggregate([
            { $group: { _id: null, total: { $sum: "$totalAmount" } } }
        ]);
        const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].total : 0;

        // 3. Popular Dish
        // Unwind items array, group by name, count occurrences
        const popularAgg = await Order.aggregate([
            { $unwind: "$items" },
            { $group: { _id: "$items.name", count: { $sum: "$items.quantity" } } },
            { $sort: { count: -1 } },
            { $limit: 1 }
        ]);
        const popularDish = popularAgg.length > 0 ? popularAgg[0]._id : "N/A";

        res.json({
            totalOrders,
            todayOrders,
            totalRevenue,
            popularDish
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
