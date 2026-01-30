import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';

dotenv.config();

const email = 'admin2@yumrush.com';
const plainPassword = 'Admin123';

const createAdmin = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error('MONGO_URL is not defined in .env');
    }

    await mongoose.connect(process.env.MONGO_URL);
    console.log('✅ MongoDB connected');

    const exists = await Admin.findOne({ email });
    if (exists) {
      console.error('❌ Admin already exists:', email);
      process.exit(1);
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const admin = await Admin.create({
      email,
      password: hashedPassword,
    });

    console.log('✅ Admin created successfully:', admin.email);
    process.exit(0);

  } catch (err) {
    console.error('❌ Error creating admin:', err.message);
    process.exit(1);
  }
};

createAdmin(); // ✅ THIS WAS MISSING
