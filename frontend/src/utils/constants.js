// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
export const JWT_KEY = process.env.REACT_APP_JWT_KEY || 'jwt_token';
export const RAZORPAY_KEY = process.env.REACT_APP_RAZORPAY_KEY || '';

// User Roles
export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
};

// Currency
export const CURRENCY = '₹';
export const TAX_RATE = 0; // Tax amount removed
export const FREE_SHIPPING_THRESHOLD = 500; // Free shipping above 500
export const STANDARD_SHIPPING = 50;

// Pagination
export const MAX_ITEMS_PER_PAGE = 10;
export const DEFAULT_PAGE = 1;

// Order Status
export const ORDER_STATUS = {
  PLACED: 'placed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  JWT_TOKEN: 'jwt_token',
  CART_ITEMS: 'cart_items',
  USER_PREFERENCES: 'user_preferences',
  CHECKOUT_ADDRESS: 'checkout_address',
  SAVED_ADDRESSES: 'saved_addresses',
};

// Validation Rules
export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 6,
  PHONE_REGEX: /^\d{10}$/,
  ZIPCODE_REGEX: /^\d{6}$/,
};
