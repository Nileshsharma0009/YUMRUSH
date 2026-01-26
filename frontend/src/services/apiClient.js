import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getMenu = async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const response = await apiClient.get(`/menu?${params}`);
    return response.data;
};

// Bookings
export const createBooking = (data) => apiClient.post('/bookings', data).then(res => res.data);
export const getBookings = () => apiClient.get('/bookings').then(res => res.data);

export const getTables = async (date, time) => {
    const response = await apiClient.get(`/tables?date=${date}&time=${time}`);
    return response.data;
};

// Admin Functions
export const addMenuItem = async (menuData) => {
    const response = await apiClient.post('/menu', menuData);
    return response.data;
};

// Offers & Loyalty
export const validateCoupon = async (code, amount) => {
    const response = await apiClient.post('/coupons/validate', { code, amount });
    return response.data;
};

export const checkLoyaltyStatus = async (phone) => {
    const response = await apiClient.get(`/loyalty/${phone}`);
    return response.data;
};

// Orders
export const createOrder = async (orderData) => {
    const response = await apiClient.post('/orders/create', orderData);
    return response.data;
};

export const getActiveOrders = async () => {
    const response = await apiClient.get('/orders/active_orders');
    return response.data;
};

export const updateOrderStatus = async (id, status) => {
    const response = await apiClient.put(`/orders/update_status/${id}`, { status });
    return response.data;
};

export default apiClient;
