import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { createOrder } from '../../services/apiClient';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const [tableNumber, setTableNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handlePlaceOrder = async () => {
        if (!tableNumber) return alert("Please select your Table Number");

        setLoading(true);
        try {
            const orderData = {
                items: cartItems.map(item => ({
                    menuItem: item._id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                })),
                totalAmount: cartTotal,
                tableNumber,
                paymentStatus: 'Paid' // Simulating successful payment
            };

            const response = await createOrder(orderData);
            clearCart();
            navigate('/order-success', { state: { order: response.order } });
        } catch (error) {
            console.error("Order Failed", error);
            alert(error.response?.data?.message || "Failed to place order");
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen pt-32 px-6 flex flex-col items-center justify-center bg-background text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h2>
                <p className="text-textSecondary mb-8">Looks like you haven't picked any dishes yet.</p>
                <Link to="/menu">
                    <button className="px-8 py-3 bg-accent text-black font-bold rounded-full">Go to Menu</button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 bg-background">
            <div className="container mx-auto max-w-4xl">
                <h1 className="text-3xl font-secondary font-bold text-white mb-8">Your Order</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map(item => (
                            <div key={item._id} className="glass-panel p-4 rounded-lg flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-md overflow-hidden bg-white/5">
                                        {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white">{item.name}</h3>
                                        <p className="text-accent text-sm">₹{item.price}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button onClick={() => updateQuantity(item._id, -1)} className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20">-</button>
                                    <span className="text-white w-4 text-center">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item._id, 1)} className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20">+</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary & Checkout */}
                    <div className="lg:col-span-1">
                        <div className="glass-panel p-6 rounded-lg sticky top-24">
                            <h3 className="text-xl font-bold text-white mb-6">Summary</h3>

                            <div className="flex justify-between mb-2 text-textSecondary">
                                <span>Subtotal</span>
                                <span>₹{cartTotal}</span>
                            </div>
                            <div className="flex justify-between mb-4 text-textSecondary">
                                <span>Taxes (5%)</span>
                                <span>₹{Math.round(cartTotal * 0.05)}</span>
                            </div>
                            <div className="border-t border-white/10 pt-4 mb-6 flex justify-between text-xl font-bold text-accent">
                                <span>Total</span>
                                <span>₹{Math.round(cartTotal * 1.05)}</span>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm text-textSecondary mb-2">Table Number</label>
                                <select
                                    value={tableNumber}
                                    onChange={(e) => setTableNumber(e.target.value)}
                                    className="w-full bg-black/40 border border-borderGlass rounded-md p-3 text-white focus:border-accent outline-none"
                                >
                                    <option value="">Select Table</option>
                                    {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={`T${n}`}>Table {n}</option>)}
                                </select>
                            </div>

                            <button
                                onClick={handlePlaceOrder}
                                disabled={loading}
                                className="w-full py-4 bg-accent text-black font-bold rounded-lg hover:brightness-110 transition-all disabled:opacity-50"
                            >
                                {loading ? 'Placing Order...' : 'Place Order'}
                            </button>
                            <p className="text-xs text-center text-textSecondary mt-4">Order will be sent directly to the kitchen.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
