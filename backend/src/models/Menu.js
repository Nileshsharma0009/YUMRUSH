import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: '',
    },

    category: {
      type: String,
      required: true,
      trim: true,
      index: true, // helps filtering (Starters, Main Course, etc.)
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    isVeg: {
      type: Boolean,
      required: true,
      index: true, // helps veg/non-veg filter
    },

    image: {
      type: String, // URL or filename
      default: '',
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

export default mongoose.model('Menu', menuSchema);
