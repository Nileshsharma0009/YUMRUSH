import express from 'express';
import {
  createOrder,
  getActiveOrders,
  updateOrderStatus,
} from '../controllers/orderController.js';
import protectAdmin from '../middleware/authMiddleware.js';

const router = express.Router();

// Public (customer)
router.post('/', createOrder);

// Admin (kitchen)
router.get('/active', protectAdmin, getActiveOrders);
router.patch('/:id/status', protectAdmin, updateOrderStatus);

export default router;
