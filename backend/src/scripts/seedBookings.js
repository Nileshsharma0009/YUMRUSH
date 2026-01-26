import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Booking from '../models/Booking.js';
import Table from '../models/Table.js';

dotenv.config();

const seedBookings = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/yumrush');
        console.log('✅ Connected to MongoDB');

        // Fetch tables to assign
        const tables = await Table.find();
        if (tables.length === 0) {
            console.log('❌ No tables found. Run seedTables.js first.');
            process.exit(1);
        }

        await Booking.deleteMany({});

        const bookings = [
            {
                customerName: "Alice Smith",
                phone: "1234567890",
                date: "2024-10-25",
                timeSlot: "7:00 PM",
                guests: 2,
                tableId: tables[0]._id, // T1
                status: "Confirmed",
                finalPrice: 1050
            },
            {
                customerName: "Bob Johnson",
                phone: "0987654321",
                date: "2024-10-26",
                timeSlot: "8:00 PM",
                guests: 4,
                tableId: tables[2]._id, // T3
                status: "Pending",
                finalPrice: 2000
            },
            {
                customerName: "Charlie Brown",
                phone: "1122334455",
                date: "2024-10-27",
                timeSlot: "12:00 PM",
                guests: 6,
                tableId: tables[4]._id, // T5
                status: "Confirmed",
                finalPrice: 3100
            }
        ];

        await Booking.insertMany(bookings);
        console.log('✅ Bookings seeded successfully');
        process.exit();
    } catch (error) {
        console.error('❌ Error seeding bookings:', error);
        process.exit(1);
    }
};

seedBookings();
