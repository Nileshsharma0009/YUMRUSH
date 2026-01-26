import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { addMenuItem } from "../../services/apiClient";
import apiClient from "../../services/apiClient";

export default function AdminDashboard() {
    const [stats, setStats] = useState({ totalOrders: 0, todayOrders: 0, totalRevenue: 0, popularDish: 'N/A' });
    const [newItem, setNewItem] = useState({
        name: "",
        category: "",
        price: "",
        description: "",
        image: "",
        isVeg: false,
    });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await apiClient.get('/admin/stats');
            setStats(res.data);
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewItem({ ...newItem, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addMenuItem(newItem);
            alert("Menu Item Added!");
            setNewItem({ name: "", category: "", price: "", description: "", image: "", isVeg: false });
        } catch (error) {
            console.error(error);
            alert("Failed to add item");
        }
    };

    return (
        <div className="min-h-screen pt-24 px-6 bg-background">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold font-secondary text-white mb-8">Admin Dashboard</h1>

                {/* Header Actions */}
                <div className="flex justify-between items-center mb-12">
                    <h2 className="text-xl text-textSecondary">Overview</h2>
                    <div className="flex gap-4">
                        <Link to="/admin/kitchen" className="inline-block">
                            <button className="px-4 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-500 transition-colors">
                                👨‍🍳 Open Kitchen Display
                            </button>
                        </Link>
                        <Link to="/admin/tables" className="inline-block">
                            <button className="px-4 py-2 bg-purple-600 text-white font-bold rounded hover:bg-purple-500 transition-colors">
                                🪑 Manage Tables
                            </button>
                        </Link>
                        <Link to="/admin/reservations" className="inline-block">
                            <button className="px-4 py-2 bg-pink-600 text-white font-bold rounded hover:bg-pink-500 transition-colors">
                                📅 View Reservations
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Analytics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    <StatsCard title="Total Revenue" value={`₹${stats.totalRevenue}`} color="bg-green-500/20 text-green-400" />
                    <StatsCard title="Total Orders" value={stats.totalOrders} color="bg-blue-500/20 text-blue-400" />
                    <StatsCard title="Today's Orders" value={stats.todayOrders} color="bg-yellow-500/20 text-yellow-400" />
                    <StatsCard title="Most Popular" value={stats.popularDish} color="bg-purple-500/20 text-purple-400" />
                </div>

                <div className="glass-panel p-8 rounded-lg max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6 text-white text-center">Add New Dish</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input name="name" value={newItem.name} onChange={handleChange} placeholder="Dish Name" className="w-full bg-black/40 p-3 rounded text-white border border-white/10 focus:border-accent outline-none" required />
                        <div className="grid grid-cols-2 gap-4">
                            <input name="category" value={newItem.category} onChange={handleChange} placeholder="Category (e.g. Starters)" className="w-full bg-black/40 p-3 rounded text-white border border-white/10 focus:border-accent outline-none" required />
                            <input name="price" value={newItem.price} onChange={handleChange} placeholder="Price" type="number" className="w-full bg-black/40 p-3 rounded text-white border border-white/10 focus:border-accent outline-none" required />
                        </div>
                        <textarea name="description" value={newItem.description} onChange={handleChange} placeholder="Description" className="w-full bg-black/40 p-3 rounded text-white border border-white/10 focus:border-accent outline-none" rows="3" />
                        <input name="image" value={newItem.image} onChange={handleChange} placeholder="Image URL" className="w-full bg-black/40 p-3 rounded text-white border border-white/10 focus:border-accent outline-none" />

                        <label className="flex items-center space-x-3 cursor-pointer">
                            <input type="checkbox" name="isVeg" checked={newItem.isVeg} onChange={handleChange} className="form-checkbox h-5 w-5 text-accent" />
                            <span className="text-white">Vegetarian</span>
                        </label>

                        <button type="submit" className="w-full py-3 bg-accent text-black font-bold rounded hover:brightness-110 transition-all">Add to Menu</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

const StatsCard = ({ title, value, color }) => (
    <div className={`p-6 rounded-lg border border-white/5 ${color}`}>
        <h3 className="text-sm uppercase tracking-wider opacity-80 mb-2">{title}</h3>
        <p className="text-3xl font-bold">{value}</p>
    </div>
);
