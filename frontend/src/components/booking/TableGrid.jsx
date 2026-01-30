import React from 'react';
import { motion } from 'framer-motion';

const TableGrid = ({ tables, selectedTableId, onSelect, minSeats = 1 }) => {
    // Safety check: ensure tables is an array
    const tableList = Array.isArray(tables) ? tables : [];

    if (tableList.length === 0) {
        return <div className="text-center text-textSecondary col-span-full py-8">No tables found.</div>;
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-4">
            {tableList.map((table) => {
                const isBooked = table.isBooked;
                const isTooSmall = table.seats < minSeats;
                const isDisabled = isBooked || isTooSmall;
                const isSelected = selectedTableId === table._id;

                return (
                    <motion.div
                        key={table._id}
                        whileHover={!isDisabled ? { scale: 1.05 } : {}}
                        whileTap={!isDisabled ? { scale: 0.95 } : {}}
                        onClick={() => !isDisabled && onSelect(table._id)}
                        className={`
              relative p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center h-32
              ${isDisabled
                                ? 'bg-red-900/10 border-white/10 cursor-not-allowed opacity-50 grayscale'
                                : isSelected
                                    ? 'bg-accent text-black border-accent cursor-pointer'
                                    : 'bg-surfaceGlass border-borderGlass hover:border-accent/50 cursor-pointer'}
            `}
                    >
                        <div className="text-lg font-bold mb-1">{table.name}</div>
                        <div className={`text-xs ${isSelected ? 'text-black/70' : 'text-textSecondary'}`}>
                            {table.seats} Seats • {table.type}
                            {table.price > 0 && <span className="block font-bold mt-1">₹{table.price}</span>}
                        </div>

                        {/* Visual Indicator of Status */}
                        {isBooked && (
                            <div className="absolute top-2 right-2 px-2 py-0.5 bg-red-500/80 text-white text-[10px] rounded-full uppercase tracking-tighter">
                                Booked
                            </div>
                        )}
                        {isTooSmall && !isBooked && (
                            <div className="absolute top-2 right-2 px-2 py-0.5 bg-orange-500/80 text-white text-[10px] rounded-full uppercase tracking-tighter">
                                Small
                            </div>
                        )}
                        {!isDisabled && !isSelected && (
                            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-green-500"></div>
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
};

export default TableGrid;
