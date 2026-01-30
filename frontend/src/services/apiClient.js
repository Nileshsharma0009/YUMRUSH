import axios from 'axios';

// Single source of truth
const API_URL = process.env.PARCEL_API_URL;

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
    if (error.response?.status === 401) {
      console.warn('Unauthorized — admin login required');
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
  const res = await apiClient.get(`/tables?date=${date}&time=${time}`);
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
