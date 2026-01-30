import express from 'express';
import Menu from '../models/Menu.js';
import protectAdmin from '../middleware/authMiddleware.js';

const router = express.Router();

/* ======================================================
   PUBLIC ROUTES (Customer)
====================================================== */

/**
 * GET /api/menu
 * Optional query params:
 *  - category
 *  - isVeg (true / false)
 */
router.get('/', async (req, res) => {
  try {
    const { category, isVeg } = req.query;

    const filter = {};

    if (category) filter.category = category;
    if (isVeg === 'true') filter.isVeg = true;
    if (isVeg === 'false') filter.isVeg = false;

    const menuItems = await Menu.find(filter).sort({ createdAt: -1 });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ======================================================
   ADMIN ROUTES (Protected)
====================================================== */

/**
 * POST /api/menu
 * Add new menu item (admin only)
 */
router.post('/', protectAdmin, async (req, res) => {
  try {
    const menuItem = await Menu.create(req.body);
    res.status(201).json(menuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * PUT /api/menu/:id
 * Update menu item (admin only)
 */
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const updatedItem = await Menu.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * DELETE /api/menu/:id
 * Delete menu item (admin only)
 */
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const deletedItem = await Menu.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
