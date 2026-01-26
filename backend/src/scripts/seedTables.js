import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Table from '../models/Table.js';

dotenv.config();

const seedTables = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/yumrush');
        console.log('✅ Connected to MongoDB');

        await Table.deleteMany({});
        const tables = [
            { name: "T1", seats: 2, type: "Window", price: 50 },
            { name: "T2", seats: 2, type: "Window", price: 50 },
            { name: "T3", seats: 4, type: "Standard", price: 0 },
            { name: "T4", seats: 4, type: "Standard", price: 0 },
            { name: "T5", seats: 6, type: "Booth", price: 100 },
            { name: "T6", seats: 8, type: "Premium", price: 200 },
        ];
        await Table.insertMany(tables);
        console.log('✅ Tables seeded successfully');
        process.exit();
    } catch (error) {
        console.error('❌ Error seeding tables:', error);
        process.exit(1);
    }
};

seedTables();
