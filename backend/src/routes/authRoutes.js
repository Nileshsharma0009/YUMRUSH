import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Mock Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'User not found' });

        if (user.password !== password) return res.status(400).json({ message: 'Invalid credentials' });

        res.json({ message: 'Login successful', role: user.role });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Register Admin
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: 'Admin created' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;
