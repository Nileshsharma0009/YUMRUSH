import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import apiClient from '../../services/apiClient';

const TableManagement = () => {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editTable, setEditTable] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        seats: '',
        type: 'Standard',
        price: '0'
    });

    useEffect(() => {
        fetchTables();
    }, []);

    const fetchTables = async () => {
        try {
            const res = await apiClient.get('/tables');
            setTables(res.data);
        } catch (error) {
            console.error('Error fetching tables:', error);
            alert("Failed to load tables. Ensure backend is running.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editTable) {
                await apiClient.put(`/tables/${editTable._id}`, formData);
                alert('Table updated!');
            } else {
                await apiClient.post('/tables', formData);
                alert('Table created!');
            }
            setFormData({ name: '', seats: '', type: 'Standard', price: '0' });
            setEditTable(null);
            fetchTables();
        } catch (error) {
            console.error(error);
            alert('Failed to save table');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await apiClient.delete(`/tables/${id}`);
            fetchTables();
        } catch (error) {
            console.error(error);
        }
    };

    const startEdit = (table) => {
        setEditTable(table);
        setFormData({
            name: table.name,
            seats: table.seats,
            type: table.type,
            price: table.price
        });
    };

    return (
        <div className="min-h-screen pt-24 px-6 bg-background">
            <div className="container mx-auto max-w-4xl">
                <h1 className="text-3xl font-bold font-secondary text-white mb-8">Table Management</h1>

                {/* Form */}
                <div className="glass-panel p-6 rounded-lg mb-8">
                    <h2 className="text-xl font-bold mb-4">{editTable ? 'Edit Table' : 'Add New Table'}</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                        <div>
                            <label className="text-xs text-secondary">Name</label>
                            <input name="name" value={formData.name} onChange={handleChange} placeholder="T1" className="w-full bg-black/40 p-2 rounded text-white border border-white/10 outline-none" required />
                        </div>
                        <div>
                            <label className="text-xs text-secondary">Seats</label>
                            <input name="seats" type="number" value={formData.seats} onChange={handleChange} placeholder="4" className="w-full bg-black/40 p-2 rounded text-white border border-white/10 outline-none" required />
                        </div>
                        <div>
                            <label className="text-xs text-secondary">Type</label>
                            <select name="type" value={formData.type} onChange={handleChange} className="w-full bg-black/40 p-2 rounded text-white border border-white/10 outline-none">
                                <option value="Standard">Standard</option>
                                <option value="Premium">Premium</option>
                                <option value="Window">Window</option>
                                <option value="Booth">Booth</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs text-secondary">Price (₹)</label>
                            <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="0" className="w-full bg-black/40 p-2 rounded text-white border border-white/10 outline-none" required />
                        </div>
                        <button type="submit" className="bg-accent text-black font-bold py-2 rounded hover:brightness-110">
                            {editTable ? 'Update' : 'Add'}
                        </button>
                    </form>
                    {editTable && (
                        <button onClick={() => { setEditTable(null); setFormData({ name: '', seats: '', type: 'Standard', price: '0' }); }} className="text-sm text-red-400 mt-2 underline">
                            Cancel Edit
                        </button>
                    )}
                </div>

                {/* Table List */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {tables.map((table) => (
                        <motion.div key={table._id} layout className="p-4 bg-surfaceGlass border border-borderGlass rounded-lg flex justify-between items-center group relative">
                            <div>
                                <h3 className="text-lg font-bold">{table.name}</h3>
                                <p className="text-sm text-textSecondary">{table.type} • {table.seats} Seats</p>
                                <p className="text-accent font-bold mt-1">₹{table.price}</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => startEdit(table)} className="text-sm bg-blue-500/20 text-blue-400 px-3 py-1 rounded hover:bg-blue-500/30">Edit</button>
                                <button onClick={() => handleDelete(table._id)} className="text-sm bg-red-500/20 text-red-400 px-3 py-1 rounded hover:bg-red-500/30">Delete</button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TableManagement;
