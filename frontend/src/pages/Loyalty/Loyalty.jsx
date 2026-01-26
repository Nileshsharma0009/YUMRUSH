import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { checkLoyaltyStatus } from '../../services/apiClient';

const Loyalty = () => {
    const [step, setStep] = useState(1);
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [loyaltyData, setLoyaltyData] = useState(null);

    const handleSendOtp = () => {
        if (!/^\d{10}$/.test(phone)) return alert("Please enter a valid 10-digit phone number");
        setLoading(true);
        // Mock OTP Sending
        setTimeout(() => {
            setLoading(false);
            setStep(2);
            alert("Demo OTP: 1234");
        }, 1000);
    };

    const handleVerifyOtp = async () => {
        if (otp !== '1234') return alert("Invalid OTP (Hint: 1234)");

        setLoading(true);
        try {
            const data = await checkLoyaltyStatus(phone);
            setLoyaltyData(data);
            setStep(3);
        } catch (error) {
            alert("Failed to fetch loyalty status");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 px-6 flex flex-col items-center bg-background relative overflow-hidden text-center">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-1/3 h-full bg-accent/5 blur-[100px] pointer-events-none"></div>

            <div className="relative z-10 max-w-md w-full">
                <h1 className="text-4xl font-secondary font-bold text-white mb-2">Loyalty Rewards</h1>
                <p className="text-textSecondary mb-8 text-sm">Track your visits and earn delicious rewards!</p>

                <div className="glass-panel p-8 rounded-xl shadow-2xl min-h-[300px] flex flex-col justify-center">

                    <AnimatePresence mode="wait">
                        {/* Step 1: Phone */}
                        {step === 1 && (
                            <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                                <label className="block text-left text-sm text-textSecondary mb-2">Enter Phone Number</label>
                                <input
                                    type="text"
                                    maxLength="10"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} // Numbers only
                                    className="w-full bg-black/40 border border-borderGlass rounded-md p-4 text-white text-lg tracking-widest focus:border-accent outline-none mb-6 text-center"
                                    placeholder="XXXXXXXXXX"
                                />
                                <button onClick={handleSendOtp} disabled={loading} className="w-full py-4 bg-accent text-black font-bold rounded-lg hover:scale-[1.02] transition-all">
                                    {loading ? 'Sending...' : 'Get OTP'}
                                </button>
                            </motion.div>
                        )}

                        {/* Step 2: OTP */}
                        {step === 2 && (
                            <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                                <label className="block text-left text-sm text-textSecondary mb-2">Enter OTP</label>
                                <div className="flex flex-col gap-4">
                                    <input
                                        type="text"
                                        maxLength="4"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                        className="w-full bg-black/40 border border-borderGlass rounded-md p-4 text-white text-2xl tracking-[1em] text-center focus:border-accent outline-none"
                                        placeholder="____"
                                    />
                                    <p className="text-textSecondary text-xs">Use demo code: 1234</p>
                                    <button onClick={handleVerifyOtp} disabled={loading} className="w-full py-4 bg-accent text-black font-bold rounded-lg hover:scale-[1.02] transition-all">
                                        {loading ? 'Verifying...' : 'View Rewards'}
                                    </button>
                                    <button onClick={() => setStep(1)} className="text-sm text-textSecondary underline">Back</button>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: Rewards Dashboard */}
                        {step === 3 && loyaltyData && (
                            <motion.div key="step3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                                <div className="mb-6">
                                    <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 text-black text-3xl font-bold shadow-[0_0_20px_rgba(255,215,0,0.4)]">
                                        {loyaltyData.visitCount}
                                    </div>
                                    <p className="text-white font-bold text-xl">Total Visits</p>
                                </div>

                                <div className="bg-white/5 p-4 rounded-lg border border-white/10 mb-6">
                                    {loyaltyData.eligibleForReward ? (
                                        <>
                                            <p className="text-green-400 font-bold mb-2">🎉 Reward Unlocked!</p>
                                            <p className="text-sm text-textSecondary">You've earned a free dessert on your next visit.</p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="text-accent font-bold mb-2">{loyaltyData.visitsNeeded} Visits to go!</p>
                                            <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden">
                                                <div
                                                    className="bg-accent h-full transition-all duration-1000"
                                                    style={{ width: `${(loyaltyData.visitCount % 5) * 20}%` }}
                                                ></div>
                                            </div>
                                            <p className="text-xs text-textSecondary mt-2">Earn a free dish every 5 visits.</p>
                                        </>
                                    )}
                                </div>

                                <button onClick={() => { setStep(1); setOtp(''); setPhone(''); }} className="px-6 py-2 border border-borderGlass rounded-full hover:bg-white/10">Check Another</button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Loyalty;
