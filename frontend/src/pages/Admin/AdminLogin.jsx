import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import apiClient from '../../services/apiClient';

const AdminLogin = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setLoading(true);
        setError('');
        try {
            // In a real app, you'd get a token here.
            // For this blueprint, we'll verify against the backend mock login
            await apiClient.post('/auth/login', data);

            // Set a simple flag in localStorage for route protection
            localStorage.setItem('isAdmin', 'true');
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 flex items-center justify-center bg-background relative overflow-hidden">
            {/* Background Effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-accent/5 blur-[150px] pointer-events-none"></div>

            <div className="w-full max-w-md relative z-10 glass-panel p-8 rounded-2xl border border-white/10">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-secondary font-bold text-accent mb-2">Admin Portal</h2>
                    <p className="text-textSecondary text-sm">Access the kitchen dashboard</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-md mb-6 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm text-textSecondary mb-2">Username</label>
                        <input
                            {...register("username", { required: "Username is required" })}
                            className="w-full bg-black/40 border border-borderGlass rounded-md p-3 text-white focus:border-accent focus:outline-none transition-colors"
                            placeholder="admin"
                        />
                        {errors.username && <span className="text-danger text-xs mt-1">{errors.username.message}</span>}
                    </div>

                    <div>
                        <label className="block text-sm text-textSecondary mb-2">Password</label>
                        <input
                            type="password"
                            {...register("password", { required: "Password is required" })}
                            className="w-full bg-black/40 border border-borderGlass rounded-md p-3 text-white focus:border-accent focus:outline-none transition-colors"
                            placeholder="••••••"
                        />
                        {errors.password && <span className="text-danger text-xs mt-1">{errors.password.message}</span>}
                    </div>

                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full py-3 bg-accent text-black font-bold rounded-pill hover:shadow-lg hover:shadow-accent/20 hover:scale-[1.02] transition-all disabled:opacity-50"
                    >
                        {loading ? 'Authenticating...' : 'Enter Kitchen'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
