import express from 'express';
import Booking from '../models/Booking.js';
import Loyalty from '../models/Loyalty.js';

const router = express.Router();

/**
 * GET /api/loyalty/:phone
 * Check loyalty status
 */
router.get('/:phone', async (req, res) => {
    try {
        const { phone } = req.params;

        // Fetch loyalty profile
        const loyaltyProfile = await Loyalty.findOne({ phone });

        const visitCount = loyaltyProfile ? loyaltyProfile.points : 0;

        const rewardThreshold = 5;
        const visitsNeeded = rewardThreshold - (visitCount % rewardThreshold);
        const eligibleForReward = visitCount > 0 && (visitCount % rewardThreshold) === 0;

        res.json({
            phone,
            visitCount,
            eligibleForReward,
            visitsNeeded: eligibleForReward ? 0 : visitsNeeded
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
