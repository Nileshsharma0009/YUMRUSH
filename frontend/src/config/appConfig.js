/**
 * App Configuration
 * Central configuration for the application
 */

const appConfig = {
  // App Info
  appName: 'YumRush',
  appVersion: '1.0.0',
  appDescription: 'Restaurant Ordering & Booking Management System',

  // API Configuration
  apiBaseUrl:
    process.env.API_URL ||
    (typeof window !== 'undefined' && window.location.hostname === 'localhost'
      ? 'http://localhost:5000/api'
      : 'https://yumrush-backend.vercel.app/api'),

  // Feature Flags
  features: {
    loyaltyProgram: true,
    onlineOrdering: true,
    tableBooking: true,
    adminDashboard: true,
  },

  // UI Settings
  ui: {
    theme: 'light',
    animationsEnabled: true,
    defaultPageSize: 10,
  },

  // Storage Keys
  storage: {
    adminToken: 'adminToken',
    userInfo: 'userInfo',
    cartItems: 'cartItems',
    theme: 'appTheme',
  },
};

export default appConfig;
