// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Product Categories
export const PRODUCT_CATEGORIES = [
  'Electronics',
  'Clothing',
  'Books',
  'Home & Garden',
  'Sports',
  'Toys',
  'Beauty',
  'Food & Beverages',
];

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

export const ORDER_STATUS_LABELS = {
  pending: 'Pending',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

// Payment Methods
export const PAYMENT_METHODS = {
  CREDIT_CARD: 'credit_card',
  DEBIT_CARD: 'debit_card',
  PAYPAL: 'paypal',
  BANK_TRANSFER: 'bank_transfer',
};

export const PAYMENT_METHOD_LABELS = {
  credit_card: '💳 Credit Card',
  debit_card: '🏧 Debit Card',
  paypal: '🅿️ PayPal',
  bank_transfer: '🏦 Bank Transfer',
};

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
};

// User Roles
export const USER_ROLES = {
  CUSTOMER: 'customer',
  ADMIN: 'admin',
};

// Validation Rules
export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 6,
  PASSWORD_MAX_LENGTH: 50,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[\d\s\-\+\(\)]+$/,
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
};

// Sorting Options
export const SORT_OPTIONS = {
  NEWEST: 'newest',
  OLDEST: 'oldest',
  PRICE_LOW_TO_HIGH: 'price_asc',
  PRICE_HIGH_TO_LOW: 'price_desc',
  RATING: 'rating',
  POPULAR: 'popular',
};

// Filter Options
export const FILTER_OPTIONS = {
  PRICE_RANGE: [
    { label: 'Under $25', min: 0, max: 25 },
    { label: '$25 - $50', min: 25, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $250', min: 100, max: 250 },
    { label: 'Over $250', min: 250, max: Infinity },
  ],
  RATING: [
    { label: '5 Stars', value: 5 },
    { label: '4+ Stars', value: 4 },
    { label: '3+ Stars', value: 3 },
    { label: '2+ Stars', value: 2 },
    { label: '1+ Stars', value: 1 },
  ],
};

// Messages
export const MESSAGES = {
  SUCCESS: 'Operation completed successfully!',
  ERROR: 'An error occurred. Please try again.',
  LOADING: 'Loading...',
  NOT_FOUND: 'Resource not found.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access forbidden.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'user_data',
  CART: 'cart_items',
  WISHLIST: 'wishlist_items',
  PREFERENCES: 'user_preferences',
};

// Tax Rate
export const TAX_RATE = 0.1; // 10%

// Shipping Cost
export const SHIPPING_COST = 0; // Free shipping

// Discount Codes
export const DISCOUNT_CODES = {
  WELCOME10: { code: 'WELCOME10', percentage: 10 },
  SAVE20: { code: 'SAVE20', percentage: 20 },
  SUMMER50: { code: 'SUMMER50', percentage: 50 },
};

// Error Codes
export const ERROR_CODES = {
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
  PRODUCT_NOT_FOUND: 'PRODUCT_NOT_FOUND',
  CART_EMPTY: 'CART_EMPTY',
  INSUFFICIENT_STOCK: 'INSUFFICIENT_STOCK',
  ORDER_NOT_FOUND: 'ORDER_NOT_FOUND',
  PAYMENT_FAILED: 'PAYMENT_FAILED',
};

// Regex Patterns
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\d\s\-\+\(\)]+$/,
  URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
  CREDIT_CARD: /^[0-9]{13,19}$/,
  CVV: /^[0-9]{3,4}$/,
};

// Time Constants
export const TIME = {
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
};

// Default Images
export const DEFAULT_IMAGES = {
  PRODUCT: '/images/product-placeholder.png',
  USER: '/images/user-placeholder.png',
  CATEGORY: '/images/category-placeholder.png',
};

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
    UPDATE_PROFILE: '/auth/update-profile',
  },
  PRODUCTS: {
    GET_ALL: '/products',
    GET_ONE: '/products/:id',
    CREATE: '/products',
    UPDATE: '/products/:id',
    DELETE: '/products/:id',
  },
  CART: {
    GET: '/cart',
    ADD: '/cart/add',
    UPDATE: '/cart/:id',
    REMOVE: '/cart/:id',
    CLEAR: '/cart/clear',
  },
  ORDERS: {
    GET_ALL: '/orders',
    GET_ONE: '/orders/:id',
    CREATE: '/orders',
    UPDATE: '/orders/:id',
    CANCEL: '/orders/:id/cancel',
  },
  WISHLIST: {
    GET: '/wishlist',
    ADD: '/wishlist/add',
    REMOVE: '/wishlist/:id',
    CLEAR: '/wishlist/clear',
  },
};
