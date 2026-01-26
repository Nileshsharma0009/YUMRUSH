import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    items: [{
        menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' },
        name: String,
        price: Number,
        quantity: Number
    }],
    totalAmount: { type: Number, required: true },
    tableNumber: { type: String, required: true },
    status: { type: String, enum: ['Kitchen', 'Ready', 'Served', 'Paid'], default: 'Kitchen' },
    paymentStatus: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Order', orderSchema);
