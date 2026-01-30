/**
 * API Configuration and Endpoint Definitions
 * Single source of truth for all API endpoints
 */

export const API_BASE_URL =
  process.env.API_URL ||
  (typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:5000/api'
    : 'https://yumrush-backend.vercel.app/api');

// Menu Endpoints
export const API_ENDPOINTS = {
  // Menu
  MENU: {
    GET_ALL: `${API_BASE_URL}/menu`,
    GET_BY_CATEGORY: (category) => `${API_BASE_URL}/menu?category=${category}`,
    CREATE: `${API_BASE_URL}/menu`,
    UPDATE: (id) => `${API_BASE_URL}/menu/${id}`,
    DELETE: (id) => `${API_BASE_URL}/menu/${id}`,
  },

  // Bookings
  BOOKINGS: {
    CREATE: `${API_BASE_URL}/bookings`,
    GET_ALL: `${API_BASE_URL}/bookings`,
    GET_AVAILABLE_TABLES: `${API_BASE_URL}/bookings/tables`,
  },

  // Orders
  ORDERS: {
    CREATE: `${API_BASE_URL}/orders`,
    GET_ACTIVE: `${API_BASE_URL}/orders/active`,
    UPDATE_STATUS: (id) => `${API_BASE_URL}/orders/${id}/status`,
  },

  // Admin
  ADMIN: {
    LOGIN: `${API_BASE_URL}/admin/login`,
    DASHBOARD: `${API_BASE_URL}/admin/dashboard`,
  },

  // Loyalty & Coupons
  LOYALTY: {
    CHECK_STATUS: (phone) => `${API_BASE_URL}/loyalty/${phone}`,
    VALIDATE_COUPON: `${API_BASE_URL}/coupons/validate`,
  },
};

export default API_ENDPOINTS;
