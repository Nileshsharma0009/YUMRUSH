import express from 'express';
import Booking from '../models/Booking.js';

const router = express.Router();

// Create Booking
router.post('/', async (req, res) => {
    // TODO: INTEGRATE PAYMENT GATEWAY HERE (Stripe/Razorpay)
    // 1. Create Payment Intent
    // 2. Verify Payment Signature
    // 3. If success, set status to 'Confirmed'

    // For now, default to Pending as we await payment integration
    const bookingData = {
        ...req.body,
        status: 'Pending',
        paymentStatus: 'Pending'
    };

    const booking = new Booking(bookingData);
    try {
        const newBooking = await booking.save();
        res.status(201).json(newBooking);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get All Bookings (Admin)
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find().populate('tableId').sort({ date: 1, timeSlot: 1 });
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update Booking Status
router.put('/:id', async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedBooking);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;
