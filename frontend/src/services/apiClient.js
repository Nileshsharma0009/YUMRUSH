import axios from 'axios';
import ENV from '../config/env';

// Single source of truth
const API_URL = ENV.API_URL || (typeof window !== 'undefined' ? `${window.location.origin}/api` : undefined);

if (!API_URL) {
  console.warn('API_URL is not set. Requests will use relative paths which may cause CORS issues.');
}

console.log('AXIOS BASE URL:', API_URL);

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});


/* =========================
   REQUEST INTERCEPTOR
   Automatically attach JWT
========================= */
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* =========================
   RESPONSE INTERCEPTOR
========================= */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response, config } = error;
    console.error(`API Error: ${config?.method?.toUpperCase()} ${config?.url}`, response?.status, response?.data);

    if (response?.status === 401) {
      console.warn('Unauthorized — admin login required for:', config?.url);
    }
    return Promise.reject(error);
  }
);

/* =========================
   MENU (PUBLIC)
========================= */
export const getMenu = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const res = await apiClient.get(`/menu?${params}`);
  return res.data;
};

/* =========================
   BOOKINGS (PUBLIC)
========================= */
export const createBooking = async (data) => {
  const res = await apiClient.post('/bookings', data);
  return res.data;
};

export const getBookings = async () => {
  const res = await apiClient.get('/bookings');
  return res.data;
};

export const updateBookingStatus = async (id, status) => {
  const res = await apiClient.put(`/bookings/${id}/status`, { status });
  return res.data;
};

export const getTables = async (date, time) => {
  const params = new URLSearchParams();
  if (date) params.append('date', date);
  if (time) params.append('time', time);

  const res = await apiClient.get(`/tables?${params.toString()}`);

  // backend returns: [ { _id, name, ... }, ... ]
  return res.data;
};


/* =========================
   ORDERS
========================= */
export const createOrder = async (orderData) => {
  const res = await apiClient.post('/orders', orderData);
  return res.data;
};

// ADMIN (KITCHEN)
export const getActiveOrders = async () => {
  const res = await apiClient.get('/orders/active');
  return res.data;
};

export const updateOrderStatus = async (id, status) => {
  const res = await apiClient.patch(`/orders/${id}/status`, { status });
  return res.data;
};

/* =========================
   ADMIN MENU
========================= */
export const addMenuItem = async (menuData) => {
  const res = await apiClient.post('/menu', menuData);
  return res.data;
};

/* =========================
   OFFERS & LOYALTY
========================= */
export const validateCoupon = async (code, amount) => {
  const res = await apiClient.post('/coupons/validate', { code, amount });
  return res.data;
};

export const checkLoyaltyStatus = async (phone) => {
  const res = await apiClient.get(`/loyalty/${phone}`);
  return res.data;
};

export default apiClient;
