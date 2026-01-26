import React, { useState, useEffect } from 'react';
import { getBookings } from '../../services/apiClient';
import { motion } from 'framer-motion';

const Reservations = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const data = await getBookings();
                setBookings(data);
            } catch (error) {
                console.error("Failed to fetch bookings", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    return (
        <div className="min-h-screen pt-24 px-6 bg-background text-white">
            <div className="container mx-auto max-w-5xl">
                <h1 className="text-3xl font-bold font-secondary mb-8">Reservations & Bookings</h1>

                {loading ? (
                    <div className="text-center py-10">Loading...</div>
                ) : bookings.length === 0 ? (
                    <div className="text-center py-10 text-textSecondary">No bookings found.</div>
                ) : (
                    <div className="grid gap-4">
                        {bookings.map((booking) => (
                            <motion.div
                                key={booking._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass-panel p-6 rounded-lg flex flex-col md:flex-row justify-between items-center gap-4"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-bold text-accent">{booking.customerName}</h3>
                                        <span className={`px-2 py-0.5 text-xs rounded-full border ${booking.status === 'Confirmed' ? 'border-green-500 text-green-400' :
                                                booking.status === 'Cancelled' ? 'border-red-500 text-red-400' : 'border-yellow-500 text-yellow-400'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </div>
                                    <div className="text-sm text-textSecondary grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div>📅 {booking.date}</div>
                                        <div>⏰ {booking.timeSlot}</div>
                                        <div>👥 {booking.guests} Guests</div>
                                        <div>📞 {booking.phone}</div>
                                    </div>
                                    {booking.tableId && (
                                        <div className="mt-2 text-sm">
                                            Assigned Table: <span className="font-bold text-white">{booking.tableId.name}</span>
                                            <span className="text-xs text-textSecondary ml-2">({booking.tableId.type})</span>
                                        </div>
                                    )}
                                </div>

                                <div className="text-right min-w-[120px]">
                                    <div className="text-xs text-textSecondary">Total Amount</div>
                                    <div className="text-lg font-bold">₹{booking.finalPrice || ((booking.guests * 500) + (booking.tableId?.price || 0))}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reservations;
