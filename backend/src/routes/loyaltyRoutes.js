import express from 'express';
import Booking from '../models/Booking.js';

const router = express.Router();

// Check Visits
router.get('/:phone', async (req, res) => {
    try {
        const { phone } = req.params;
        const visitCount = await Booking.countDocuments({ phone, status: { $ne: 'Cancelled' } });

        // Simple Logic: Every 5th visit gets a free dish
        const nextRewardAt = Math.ceil((visitCount + 1) / 5) * 5;
        const visitsNeeded = nextRewardAt - visitCount;

        res.json({
            visitCount,
            visitsNeeded,
            eligibleForReward: visitCount > 0 && visitCount % 5 === 0
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
