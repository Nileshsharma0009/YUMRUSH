import express from 'express';
import Table from '../models/Table.js';
import Booking from '../models/Booking.js';
import protectAdmin from '../middleware/authMiddleware.js';

const router = express.Router();

/* ======================================================
   PUBLIC ROUTES
====================================================== */

/**
 * GET /api/tables
 * Fetch all tables OR available tables for a slot
 * Query: ?date=YYYY-MM-DD&time=HH:MM
 */
router.get('/', async (req, res) => {
    try {
        const { date, time } = req.query;

        if (date && time) {
            // 1. Find all bookings for this slot
            // Assuming a booking occupies the table for that specific time slot
            const existingBookings = await Booking.find({ date, time, status: { $ne: 'Cancelled' } });

            // Get IDs of booked tables
            // Note: Booking schema should store tableId. If it stores tableNumber, we might need adjustment.
            // Frontend Booking.jsx sends tableId. We'll assume Booking model is updated or we use tableId.
            const bookedTableIds = existingBookings.map(b => b.tableId ? b.tableId.toString() : null).filter(Boolean);

            // 2. Find tables NOT in bookedTableIds
            const tables = await Table.find({
                _id: { $nin: bookedTableIds },
                isAvailable: true
            });
            return res.json(tables);
        }

        // Default: Return all tables (for Admin or initial load)
        const tables = await Table.find().sort({ name: 1 });
        res.json(tables);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/* ======================================================
   ADMIN ROUTES
====================================================== */

router.post('/', protectAdmin, async (req, res) => {
    try {
        const table = await Table.create(req.body);
        res.status(201).json(table);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/:id', protectAdmin, async (req, res) => {
    try {
        const table = await Table.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(table);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', protectAdmin, async (req, res) => {
    try {
        await Table.findByIdAndDelete(req.params.id);
        res.json({ message: 'Table deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
