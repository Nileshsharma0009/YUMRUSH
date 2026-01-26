import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';

const MenuCard = ({ item }) => {
    const { addToCart } = useCart();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="glass-panel rounded-md overflow-hidden relative group flex flex-col h-full"
        >
            <div className="h-48 overflow-hidden">
                <img
                    src={item.image || 'https://placehold.co/400x300/1a1a1a/white?text=YumRush'}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>
            <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold font-primary">{item.name}</h3>
                    <span className="text-accent font-semibold">₹{item.price}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span className="text-xs text-textSecondary uppercase tracking-wider">{item.category}</span>
                </div>
                <p className="text-sm text-textSecondary line-clamp-2 mb-4 flex-1">{item.description || 'Delicious and freshly prepared.'}</p>

                <button
                    onClick={() => addToCart(item)}
                    className="w-full py-2 border border-accent text-accent rounded-full text-sm font-bold hover:bg-accent hover:text-black transition-all"
                >
                    Add to Cart
                </button>
            </div>
        </motion.div>
    );
};

export default MenuCard;
