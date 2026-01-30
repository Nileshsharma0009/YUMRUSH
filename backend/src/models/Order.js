import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    tableNumber: Number,
    items: [
      {
        name: String,
        quantity: Number,
        price: Number,
      },
    ],
    status: {
      type: String,
      enum: ['Preparing', 'Ready', 'Served'],
      default: 'Preparing',
    },
    totalAmount: Number,
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);

