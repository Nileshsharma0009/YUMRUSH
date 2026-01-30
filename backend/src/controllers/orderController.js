import Order from '../models/Order.js';

/* ---------------------------
   POST /api/orders
---------------------------- */
export const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);

    // Socket.io: Notify Kitchen
    const io = req.app.get("io");
    if (io) {
      io.emit("new_order", order);
    }

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------------------------
   GET /api/orders/active
   (admin only)
---------------------------- */
export const getActiveOrders = async (req, res) => {
  try {
    const orders = await Order.find({ status: 'Preparing' }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------------------------
   PATCH /api/orders/:id/status
   (admin only)
---------------------------- */
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
