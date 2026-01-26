import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    timeSlot: { type: String, required: true },
    guests: { type: Number, required: true },
    tableId: { type: mongoose.Schema.Types.ObjectId, ref: 'Table' }, // Reference to Table
    status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'], default: 'Pending' },
    couponCode: { type: String },
    discountAmount: { type: Number, default: 0 },
    finalPrice: { type: Number, default: 0 },
    paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed', 'Refunded'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Booking', bookingSchema);
