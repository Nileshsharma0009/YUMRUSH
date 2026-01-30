import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { createBooking, getTables, validateCoupon, checkLoyaltyStatus } from '../../services/apiClient';
import TableGrid from '../../components/booking/TableGrid';
import { generateReceipt } from '../../utils/generateReceipt';

const Booking = () => {
    const { register, handleSubmit, watch, trigger, formState: { errors } } = useForm();
    const [step, setStep] = useState(1);
    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [bookingData, setBookingData] = useState(null); // Store final booking for receipt

    // Offer & Loyalty State
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [couponMsg, setCouponMsg] = useState('');
    const [loyaltyStatus, setLoyaltyStatus] = useState(null);

    // Watch fields for Step 1
    const date = watch('date');
    const timeSlot = watch('timeSlot');
    const guests = watch('guests');
    const phone = watch('phone');

    const handleSearchTables = async () => {
        const isValid = await trigger(['date', 'timeSlot', 'guests']);
        if (!isValid) return;

        setLoading(true);
        try {
            const data = await getTables(date, timeSlot);
            setTables(data);
            setStep(2);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleApplyCoupon = async () => {
        if (!couponCode) return;
        try {
            const table = tables.find(t => t._id === selectedTable);
            const tablePrice = table ? (table.price || 0) : 0;
            const estimatedFoodBill = (guests || 1) * 500;
            const totalEstimated = estimatedFoodBill + tablePrice;

            const res = await validateCoupon(couponCode, totalEstimated);
            setDiscount(res.discount);
            setCouponMsg(`✅ ${res.message} (Saved ₹${res.discount})`);
        } catch (error) {
            setDiscount(0);
            setCouponMsg(`❌ ${error.response?.data?.message || 'Invalid Coupon'}`);
        }
    };

    const handleCheckLoyalty = async () => {
        const cleanPhone = phone ? phone.replace(/\D/g, '') : '';
        if (!cleanPhone || cleanPhone.length < 10) return alert("Enter valid 10-digit phone number first");
        try {
            const res = await checkLoyaltyStatus(cleanPhone);
            setLoyaltyStatus(res);
        } catch (error) {
            console.error(error);
        }
    };

    const onSubmit = async (data) => {
        if (!selectedTable) return alert('Please select a table');

        setLoading(true);
        try {
            // Include Discount Data
            const payload = {
                ...data,
                guests: parseInt(data.guests, 10), // Ensure integer
                time: data.timeSlot, // Backend expects 'time'
                tableId: selectedTable,
                couponCode: discount > 0 ? couponCode : undefined,
                discountAmount: discount
            };

            // TODO: Initialize Payment SDK here
            // const paymentResult = await initializePayment(payload.amount);
            // if (!paymentResult.success) throw new Error("Payment Failed");

            const response = await createBooking(payload);
            setBookingData(response); // Store for receipt
            setSuccess(true);
            setStep(1);
        } catch (error) {
            console.error('Booking failed:', error);
            const errMsg = error.response?.data?.message || 'Failed to book table. Please try again.';
            alert(errMsg);
        } finally {
            setLoading(false);
        }
    };

    const slots = ["12:00 PM", "1:00 PM", "2:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"];

    const getSelectedTablePrice = () => {
        const t = tables.find(t => t._id === selectedTable);
        return t ? (t.price || 0) : 0;
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 flex flex-col items-center bg-background relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 blur-[120px] pointer-events-none"></div>

            <div className="w-full max-w-2xl relative z-10">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-secondary font-bold mb-2">Reserve Your Spot</h1>
                    <div className="flex justify-center gap-4 text-sm text-textSecondary">
                        <span className={step >= 1 ? "text-accent" : ""}>1. Details</span>
                        <span>&rarr;</span>
                        <span className={step >= 2 ? "text-accent" : ""}>2. Select Table</span>
                        <span>&rarr;</span>
                        <span className={step === 3 ? "text-accent" : ""}>3. Confirm</span>
                    </div>
                </div>

                <div className="glass-panel p-8 rounded-lg shadow-2xl relative min-h-[400px]">

                    {/* Step 1: Search */}
                    {step === 1 && (
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                            <h3 className="text-xl font-bold mb-6">Find a Table</h3>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm text-textSecondary mb-2">Date</label>
                                    <input type="date" {...register("date", { required: true })} className="w-full bg-black/40 border border-borderGlass rounded-md p-3 text-white focus:border-accent outline-none" />
                                    {errors.date && <span className="text-danger text-xs">Required</span>}
                                </div>
                                <div>
                                    <label className="block text-sm text-textSecondary mb-2">Guests</label>
                                    <input type="number" min="1" max="10" {...register("guests", { required: true })} className="w-full bg-black/40 border border-borderGlass rounded-md p-3 text-white focus:border-accent outline-none" placeholder="2" />
                                    {errors.guests && <span className="text-danger text-xs">Required</span>}
                                </div>
                            </div>

                            <div className="mb-8">
                                <label className="block text-sm text-textSecondary mb-2">Time Slot</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {slots.map(slot => (
                                        <label key={slot} className="cursor-pointer">
                                            <input type="radio" value={slot} {...register("timeSlot", { required: true })} className="peer sr-only" />
                                            <div className="p-2 text-center text-sm border border-borderGlass rounded-md peer-checked:bg-accent peer-checked:text-black transition-all hover:border-white/40">
                                                {slot}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                                {errors.timeSlot && <span className="text-danger text-xs">Select a time</span>}
                            </div>

                            <button onClick={handleSearchTables} disabled={loading} className="w-full py-3 bg-accent text-black font-bold rounded-full hover:scale-[1.02] transition-all">
                                {loading ? 'Checking Availability...' : 'Find Tables'}
                            </button>
                        </motion.div>
                    )}

                    {/* Step 2: Select Table */}
                    {step === 2 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold">Select Your Table</h3>
                                <button onClick={() => setStep(1)} className="text-sm text-textSecondary underline">Back</button>
                            </div>

                            <TableGrid tables={tables} selectedTableId={selectedTable} onSelect={setSelectedTable} minSeats={Number(guests) || 1} />

                            {/* Price Warning if Premium */}
                            {selectedTable && (() => {
                                const t = tables.find(t => t._id === selectedTable);
                                return t && t.price > 0 && (
                                    <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-500/50 rounded text-yellow-200 text-sm text-center">
                                        Note: This table has a booking fee of ₹{t.price}
                                    </div>
                                )
                            })()}

                            <button
                                onClick={() => selectedTable && setStep(3)}
                                disabled={!selectedTable}
                                className="w-full mt-6 py-3 bg-accent text-black font-bold rounded-full disabled:opacity-50 hover:scale-[1.02] transition-all"
                            >
                                Continue to Contact
                            </button>
                        </motion.div>
                    )}

                    {/* Step 3: Contact Details & Offers */}
                    {step === 3 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold">Finalize Booking</h3>
                                <button onClick={() => setStep(2)} className="text-sm text-textSecondary underline">Back</button>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-sm text-textSecondary mb-2">Full Name</label>
                                    <input {...register("name", {
                                        required: "Name is required",
                                        minLength: { value: 3, message: "Name must be at least 3 characters" },
                                        maxLength: { value: 50, message: "Name too long" }
                                    })} className="w-full bg-black/40 border border-borderGlass rounded-md p-3 text-white focus:border-accent outline-none" placeholder="John Doe" />
                                    {errors.name && <span className="text-danger text-xs">{errors.name.message}</span>}
                                </div>
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                        <label className="block text-sm text-textSecondary mb-2">Phone Number</label>
                                        <input {...register("phone", {
                                            required: "Phone number is required",
                                            pattern: {
                                                value: /^[0-9]{10}$/,
                                                message: "Must be exactly 10 digits"
                                            }
                                        })} className="w-full bg-black/40 border border-borderGlass rounded-md p-3 text-white focus:border-accent outline-none" placeholder="9876543210" maxLength={10} />
                                        {errors.phone && <span className="text-danger text-xs">{errors.phone.message}</span>}
                                    </div>
                                    <div className="flex items-end">
                                        <button type="button" onClick={handleCheckLoyalty} className="px-4 py-3 bg-white/10 rounded-md text-sm hover:bg-white/20">Check Rewards</button>
                                    </div>
                                </div>

                                {/* Loyalty Logic */}
                                {loyaltyStatus && (
                                    <div className="bg-accent/10 border border-accent rounded-md p-3 text-sm">
                                        <p className="font-bold text-accent">Loyalty Status: {loyaltyStatus.visitCount} visits</p>
                                        {loyaltyStatus.eligibleForReward ? (
                                            <p className="text-green-400">🎉 You are eligible for a FREE Dessert!</p>
                                        ) : (
                                            <p className="text-textSecondary">{loyaltyStatus.visitsNeeded} more visits for a reward.</p>
                                        )}
                                    </div>
                                )}

                                {/* Coupon */}
                                <div className="mt-4 pt-4 border-t border-white/10">
                                    <label className="block text-sm text-textSecondary mb-2">Have a Coupon?</label>
                                    <div className="flex gap-2">
                                        <input
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                            className="flex-1 bg-black/40 border border-borderGlass rounded-md p-3 text-white focus:border-accent outline-none"
                                            placeholder="WELCOME50"
                                        />
                                        <button type="button" onClick={handleApplyCoupon} className="px-6 bg-accent text-black font-bold rounded-md">Apply</button>
                                    </div>
                                    {couponMsg && <p className="text-sm mt-2">{couponMsg}</p>}
                                </div>
                            </div>

                            {/* Bill Breakdown */}
                            <div className="bg-surfaceGlass p-4 rounded-lg mb-6 text-sm space-y-2">
                                <div className="flex justify-between">
                                    <span>Booking Fee</span>
                                    <span>₹{getSelectedTablePrice()}</span>
                                </div>
                                <div className="flex justify-between text-textSecondary">
                                    <span>Est. Food Bill ({guests} guests)</span>
                                    <span>₹{(guests || 1) * 500}</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-green-400">
                                        <span>Discount</span>
                                        <span>-₹{discount}</span>
                                    </div>
                                )}
                                <div className="border-t border-white/10 pt-2 flex justify-between font-bold text-lg">
                                    <span>Total Payable</span>
                                    <span>₹{Math.max(0, (getSelectedTablePrice() + ((guests || 1) * 500) - discount))}</span>
                                </div>
                            </div>

                            <button onClick={handleSubmit(onSubmit)} disabled={loading} className="w-full py-4 bg-accent text-black font-bold rounded-full shadow-lg hover:shadow-accent/50 hover:scale-[1.02] transition-all">
                                {loading ? 'Confirming...' : `Confirm Booking`}
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Success Modal */}
            <AnimatePresence>
                {success && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="glass-panel p-8 rounded-xl text-center max-w-sm mx-4">
                            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 text-black text-2xl">!</div>
                            <h2 className="text-2xl font-bold mb-2">Booking Reserved!</h2>
                            <p className="text-textSecondary mb-6">Your table is reserved. Please pay at the counter to confirm.</p>

                            {/* TODO: Add "Pay Now" Button here for Payment Gateway Integration */}

                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() => generateReceipt(bookingData || {}, { code: couponCode, discount: discount, tablePrice: getSelectedTablePrice() })}
                                    className="px-6 py-2 bg-white text-black font-bold rounded-full hover:bg-gray-200"
                                >
                                    Download Receipt (PDF)
                                </button>
                                <button onClick={() => setSuccess(false)} className="px-6 py-2 border border-borderGlass rounded-full hover:bg-white/10">Close</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Booking;
