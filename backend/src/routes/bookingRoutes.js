import express from 'express';
import Booking from '../models/Booking.js';
import Loyalty from '../models/Loyalty.js';
import protectAdmin from '../middleware/authMiddleware.js';

const router = express.Router();

/* ======================================================
   PUBLIC ROUTES (Customer)
====================================================== */

/**
 * POST /api/bookings
 * Create a new table booking
 */
router.post('/', async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * GET /api/bookings/available
 * Check availability for date & time
 * Query params: date, time
 */
router.get('/available', async (req, res) => {
  try {
    const { date, time } = req.query;

    if (!date || !time) {
      return res.status(400).json({ message: 'Date and time are required' });
    }

    const existingBookings = await Booking.find({ date, time });
    res.json({ available: existingBookings.length === 0 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ======================================================
   ADMIN ROUTES (Protected)
====================================================== */

/**
 * GET /api/bookings
 * Get all bookings (admin only)
 */
router.get('/', protectAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * PUT /api/bookings/:id/status
 * Update booking status (Confirmed / Cancelled)
 */
router.put('/:id/status', protectAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Update Loyalty if confirmed
    if (status === 'Confirmed' && booking.status !== 'Confirmed') {
      const { phone, name } = booking;
      await Loyalty.findOneAndUpdate(
        { phone },
        {
          $set: { name, lastVisitDate: new Date() },
          $inc: { totalVisits: 1, points: 1 }
        },
        { upsert: true, new: true }
      );
    }

    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * DELETE /api/bookings/:id
 * Delete a booking (admin only)
 */
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
