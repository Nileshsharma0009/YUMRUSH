import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// Create Order (Dine-in)
router.post('/create', async (req, res) => {
    try {
        const { items, totalAmount, tableNumber, paymentStatus } = req.body;

        const newOrder = new Order({
            items,
            totalAmount,
            tableNumber,
            status: 'Kitchen',
            paymentStatus: paymentStatus || 'Pending'
        });

        await newOrder.save();

        // Emit Socket Event
        const io = req.app.get('io');
        io.emit('new_order', newOrder);

        res.status(201).json({ message: 'Order sent to Kitchen!', order: newOrder });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get My Orders (Mock - requires Auth ideally, but getting all for MVP demo)
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get Active Orders (Kitchen Display)
router.get('/active_orders', async (req, res) => {
    try {
        const orders = await Order.find({ status: 'Kitchen' }).sort({ createdAt: 1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update Order Status
router.put('/update_status/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
