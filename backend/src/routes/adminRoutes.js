import express from 'express';

import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

import Order from '../models/Order.js';
import Menu from '../models/Menu.js';

const router = express.Router();

// ... (keep existing login route) ...

/**
 * GET /api/admin/stats
 * Dashboard Analytics
 */
router.get('/stats', async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayOrders = await Order.countDocuments({ createdAt: { $gte: today } });

        const revenueResult = await Order.aggregate([
            { $group: { _id: null, total: { $sum: "$totalAmount" } } }
        ]);
        const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

        // Calculate popular dish
        const popularDishResult = await Order.aggregate([
            { $unwind: "$items" },
            { $group: { _id: "$items.name", count: { $sum: "$items.quantity" } } },
            { $sort: { count: -1 } },
            { $limit: 1 }
        ]);
        const popularDish = popularDishResult.length > 0 ? popularDishResult[0]._id : "N/A";

        res.json({
            totalOrders,
            todayOrders,
            totalRevenue,
            popularDish
        });
    } catch (error) {
        console.error('Error fetching admin stats:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});



router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }


        const token = jwt.sign(
            { adminId: admin._id, email: admin.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            token,
            admin: {
                id: admin._id,
                email: admin.email,
            },

        });


    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

export default router;

