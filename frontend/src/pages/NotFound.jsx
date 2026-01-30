import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-9xl font-bold text-primary opacity-20">404</h1>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute mt-10"
            >
                <h2 className="text-3xl font-bold text-textPrimary mb-4">Page Not Found</h2>
                <p className="text-textSecondary mb-8 max-w-md mx-auto">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>

                <Link to="/">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full shadow-lg transition-colors"
                    >
                        Go Home
                    </motion.button>
                </Link>
            </motion.div>

            {/* Floating Elements for Decoration */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut"
                }}
                className="absolute top-1/4 left-1/4 w-12 h-12 bg-accent rounded-full opacity-20 blur-xl"
            />
            <motion.div
                animate={{
                    y: [0, 20, 0],
                    rotate: [0, -5, 0]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut",
                    delay: 1
                }}
                className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-primary rounded-full opacity-20 blur-xl"
            />
        </div>
    );
};

export default NotFound;
