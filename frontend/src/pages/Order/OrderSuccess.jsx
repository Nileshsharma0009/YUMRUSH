import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { generateReceipt } from '../../utils/generateReceipt';

const OrderSuccess = () => {
    const location = useLocation();
    const order = location.state?.order;

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-6">
            <div className="text-center max-w-md">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.4)]"
                >
                    <svg className="w-12 h-12 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </motion.div>

                <h1 className="text-3xl font-secondary font-bold text-white mb-2">Order Received!</h1>
                {order && <p className="text-accent text-lg mb-2">Table: {order.tableNumber}</p>}

                <div className="bg-white/5 p-4 rounded-lg my-6 border border-white/10 text-left">
                    <p className="text-textSecondary text-sm mb-1">Status:</p>
                    <p className="text-yellow-500 font-bold mb-3">Sent to Kitchen (Payment Pending)</p>
                    <p className="text-xs text-textSecondary">Please pay at the counter before leaving.</p>
                </div>

                <div className="flex flex-col gap-3">
                    {order && (
                        <button
                            onClick={() => generateReceipt({ order }, 'ORDER')}
                            className="px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200"
                        >
                            Download Bill (PDF)
                        </button>
                    )}

                    <Link to="/menu">
                        <button className="px-6 py-3 border border-borderGlass text-white rounded-full hover:bg-white/10 transition-all w-full">
                            Order More
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
