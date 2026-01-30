import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    guests: {
      type: Number,
      required: true,
      min: 1,
    },

    tableId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Table',
      required: true,
    },
    tableNumber: {
      type: Number, // Deprecated, kept for legacy
      default: null,
    },

    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Cancelled'],
      default: 'Pending',
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

export default mongoose.model('Booking', bookingSchema);
