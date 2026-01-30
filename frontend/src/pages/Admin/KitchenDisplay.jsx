import React, { useState, useEffect } from 'react';
import { getActiveOrders, updateOrderStatus } from '../../services/apiClient';
import { motion, AnimatePresence } from 'framer-motion';
import { io } from 'socket.io-client';

const KitchenDisplay = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();

        // Connect to Socket (use only SOCKET_URL)
        const SOCKET_URL = (typeof process !== 'undefined' && process.env && process.env.SOCKET_URL) || 'http://localhost:5000';
        const socket = io(SOCKET_URL, {
            transports: ['websocket'],
            reconnection: true,
            reconnectionAttempts: 5,
            timeout: 20000,
        });

        // Listen for new orders
        socket.on('new_order', (newOrder) => {
            setOrders((prev) => [...prev, newOrder]);
            // Optional: Play a sound or show notification
        });

        // Cleanup
        return () => socket.disconnect();
    }, []);

    const fetchOrders = async () => {
        try {
            const data = await getActiveOrders();
            setOrders(data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch KDS orders", error);
        }
    };

    const handleMarkReady = async (orderId) => {
        try {
            await updateOrderStatus(orderId, 'Ready');
            setOrders(prev => prev.filter(o => o._id !== orderId)); // Optimistic update
        } catch (error) {
            alert("Failed to update order");
        }
    };

    if (loading && orders.length === 0) return <div className="text-white text-center pt-24">Loading KDS...</div>;

    return (
        <div className="min-h-screen pt-24 px-6 bg-background pb-12">
            <h1 className="text-3xl font-bold font-secondary text-white mb-8 border-b border-white/10 pb-4 flex justify-between items-center">
                <span>👨‍🍳 Kitchen Display System</span>
                <span className="text-sm font-primary font-normal text-textSecondary bg-white/5 px-4 py-2 rounded-full">
                    {orders.length} Active Orders
                </span>
            </h1>

            {orders.length === 0 ? (
                <div className="text-center text-textSecondary py-20 bg-surfaceGlass rounded-xl border border-white/5">
                    <p className="text-4xl mb-4">💤</p>
                    <h2 className="text-xl font-bold">Kitchen is Clear</h2>
                    <p>No pending orders at the moment.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence>
                        {orders.map(order => (
                            <motion.div
                                key={order._id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-surfaceGlass border border-white/10 rounded-xl overflow-hidden flex flex-col"
                            >
                                {/* Header */}
                                <div className="bg-accent/10 p-4 flex justify-between items-center border-b border-white/5">
                                    <div>
                                        <h3 className="font-bold text-lg text-white">Table {order.tableNumber}</h3>
                                        <p className="text-[10px] text-textSecondary uppercase tracking-widest">ID: {order._id.slice(-4)}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-xs text-accent font-bold">
                                            {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>

                                {/* Items */}
                                <div className="p-4 flex-1">
                                    <ul className="space-y-3">
                                        {order.items.map((item, idx) => (
                                            <li key={idx} className="flex justify-between items-start text-sm">
                                                <span className="text-white font-medium flex-1">
                                                    <span className="inline-block w-6 text-center bg-white/10 rounded mr-2 text-xs py-0.5">{item.quantity}x</span>
                                                    {item.name}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Actions */}
                                <div className="p-4 bg-black/20 border-t border-white/5">
                                    <button
                                        onClick={() => handleMarkReady(order._id)}
                                        className="w-full py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-colors"
                                    >
                                        <span>✅</span> Mark Prepared
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default KitchenDisplay;
