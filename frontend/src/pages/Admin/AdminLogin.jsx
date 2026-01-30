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
      const res = await apiClient.post('/admin/login', {
        email: data.email,
        password: data.password,
      });

      // ✅ SAVE TOKEN
      localStorage.setItem('adminToken', res.data.token);
      localStorage.setItem('isAdmin', 'true');
     console.log('API_URL USED:', process.env.API_URL);

      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 flex items-center justify-center bg-background">
      <div className="w-full max-w-md glass-panel p-8 rounded-2xl border border-white/10">
        <h2 className="text-3xl font-bold text-accent text-center mb-6">
          Admin Portal
        </h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-md mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm mb-2">Email</label>
            <input
              {...register('email', { required: 'Email is required' })}
              className="w-full p-3 rounded-md bg-black/40 border border-borderGlass"
              placeholder="admin@yumrush.com"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm mb-2">Password</label>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="w-full p-3 rounded-md bg-black/40 border border-borderGlass"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-accent text-black font-bold rounded-full disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
