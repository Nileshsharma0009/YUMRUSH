import express from 'express';
import Menu from '../models/Menu.js';

const router = express.Router();

// Get all menu items
router.get('/', async (req, res) => {
    try {
        const filters = {};
        if (req.query.category) filters.category = req.query.category;
        if (req.query.isVeg) filters.isVeg = req.query.isVeg === 'true';

        const menu = await Menu.find(filters);
        res.json(menu);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add menu item (Admin)
router.post('/', async (req, res) => {
    const menuItem = new Menu(req.body);
    try {
        const newMenuItem = await menuItem.save();
        res.status(201).json(newMenuItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update menu item
router.put('/:id', async (req, res) => {
    try {
        const updatedMenuItem = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedMenuItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete menu item
router.delete('/:id', async (req, res) => {
    try {
        await Menu.findByIdAndDelete(req.params.id);
        res.json({ message: 'Menu item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
