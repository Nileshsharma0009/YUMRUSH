import express from 'express';
import Table from '../models/Table.js';
import Booking from '../models/Booking.js';

const router = express.Router();

// Get all tables with availability status for a specific date/time
router.get('/', async (req, res) => {
    try {
        const { date, time } = req.query;
        const tables = await Table.find();

        if (!date || !time) {
            return res.json(tables);
        }

        // Find bookings for this slot to mark tables as unavailable
        const bookings = await Booking.find({ date, timeSlot: time, status: { $ne: 'Cancelled' } });
        const bookedTableIds = bookings.map(b => b.tableId?.toString()); // Assuming Booking has tableId

        const tablesWithStatus = tables.map(table => ({
            ...table.toObject(),
            isBooked: bookedTableIds.includes(table._id.toString())
        }));

        res.json(tablesWithStatus);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Seed Tables (One-time)
router.post('/seed', async (req, res) => {
    try {
        await Table.deleteMany({});
        const tables = [
            { name: "T1", seats: 2, type: "Window" },
            { name: "T2", seats: 2, type: "Window" },
            { name: "T3", seats: 4, type: "Standard" },
            { name: "T4", seats: 4, type: "Standard" },
            { name: "T5", seats: 6, type: "Booth" },
            { name: "T6", seats: 8, type: "Premium" },
        ];
        await Table.insertMany(tables);
        res.json({ message: "Tables seeded successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add new table
router.post('/', async (req, res) => {
    try {
        const newTable = new Table(req.body);
        await newTable.save();
        res.status(201).json(newTable);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update table
router.put('/:id', async (req, res) => {
    try {
        const updatedTable = await Table.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTable);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete table
router.delete('/:id', async (req, res) => {
    try {
        await Table.findByIdAndDelete(req.params.id);
        res.json({ message: 'Table deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
