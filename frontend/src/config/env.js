/**
 * Environment Configuration
 * Handles environment-specific settings
 */

const ENV = {
  // API Configuration
  API_URL:
    process.env.API_URL ||
    (typeof window !== 'undefined' && window.location.hostname === 'localhost'
      ? 'http://localhost:5000/api'
      : 'https://yumrush-backend.vercel.app/api'),

  // Frontend URL
  FRONTEND_URL:
    typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',

  // Environment Type
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_LOCALHOST:
    typeof window !== 'undefined' && window.location.hostname === 'localhost',

  // Feature Flags
  ENABLE_ANALYTICS: true,
  ENABLE_LOGGING: true,
};

export default ENV;
