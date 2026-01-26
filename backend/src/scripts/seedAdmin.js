import mongoose from 'mongoose';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config({ path: '../../.env' });

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/yumrush');
        console.log('✅ Connected to MongoDB');

        // Check if admin exists
        const existingAdmin = await User.findOne({ username: 'admin' });
        if (existingAdmin) {
            console.log('⚠ Admin user already exists');
            process.exit();
        }

        // Create Admin
        const admin = new User({
            username: 'admin',
            password: 'admin123', // In production, hash this!
            role: 'admin'
        });

        await admin.save();
        console.log('✅ Admin user created: admin / admin123');
        process.exit();
    } catch (error) {
        console.error('❌ Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
