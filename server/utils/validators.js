/**
 * Input validation utilities
 */

const validators = {
  // Email validation
  email: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Password validation (min 6 characters)
  password: (password) => {
    return password && password.length >= 6;
  },

  // Strong password (uppercase, lowercase, number, special char)
  strongPassword: (password) => {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongRegex.test(password);
  },

  // Phone number validation
  phone: (phone) => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  },

  // URL validation
  url: (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  // Credit card validation (Luhn algorithm)
  creditCard: (cardNumber) => {
    const digits = cardNumber.replace(/\D/g, '');
    if (digits.length < 13 || digits.length > 19) return false;

    let sum = 0;
    let isEven = false;

    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits[i], 10);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  },

  // CVV validation
  cvv: (cvv) => {
    const cvvRegex = /^\d{3,4}$/;
    return cvvRegex.test(cvv);
  },

  // Expiry date validation (MM/YY)
  expiryDate: (expiryDate) => {
    const [month, year] = expiryDate.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    const expMonth = parseInt(month, 10);
    const expYear = parseInt(year, 10);

    if (expMonth < 1 || expMonth > 12) return false;
    if (expYear < currentYear) return false;
    if (expYear === currentYear && expMonth < currentMonth) return false;

    return true;
  },

  // Positive number validation
  positiveNumber: (num) => {
    return !isNaN(num) && num > 0;
  },

  // Non-negative number validation
  nonNegativeNumber: (num) => {
    return !isNaN(num) && num >= 0;
  },

  // String length validation
  stringLength: (str, min = 1, max = 255) => {
    return str && str.length >= min && str.length <= max;
  },

  // Array validation
  array: (arr) => {
    return Array.isArray(arr) && arr.length > 0;
  },

  // Object validation
  object: (obj) => {
    return obj && typeof obj === 'object' && Object.keys(obj).length > 0;
  },

  // Date validation
  date: (date) => {
    const d = new Date(date);
    return d instanceof Date && !isNaN(d);
  },

  // Enum validation
  enum: (value, allowedValues) => {
    return allowedValues.includes(value);
  },

  // Alphanumeric validation
  alphanumeric: (str) => {
    return /^[a-zA-Z0-9]+$/.test(str);
  },

  // Slug validation
  slug: (str) => {
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(str);
  },
};

/**
 * Validate request body against schema
 */
function validateRequest(req, schema) {
  const errors = {};

  for (const [field, rules] of Object.entries(schema)) {
    const value = req.body[field];

    // Check required
    if (rules.required && (!value || (typeof value === 'string' && !value.trim()))) {
      errors[field] = `${field} is required`;
      continue;
    }

    if (!value) continue;

    // Check type
    if (rules.type && typeof value !== rules.type) {
      errors[field] = `${field} must be of type ${rules.type}`;
      continue;
    }

    // Check custom validator
    if (rules.validator && !validators[rules.validator](value)) {
      errors[field] = rules.message || `${field} is invalid`;
      continue;
    }

    // Check min length
    if (rules.minLength && value.length < rules.minLength) {
      errors[field] = `${field} must be at least ${rules.minLength} characters`;
      continue;
    }

    // Check max length
    if (rules.maxLength && value.length > rules.maxLength) {
      errors[field] = `${field} must not exceed ${rules.maxLength} characters`;
      continue;
    }

    // Check min value
    if (rules.min !== undefined && value < rules.min) {
      errors[field] = `${field} must be at least ${rules.min}`;
      continue;
    }

    // Check max value
    if (rules.max !== undefined && value > rules.max) {
      errors[field] = `${field} must not exceed ${rules.max}`;
      continue;
    }

    // Check enum
    if (rules.enum && !validators.enum(value, rules.enum)) {
      errors[field] = `${field} must be one of: ${rules.enum.join(', ')}`;
      continue;
    }
  }

  return Object.keys(errors).length > 0 ? errors : null;
}

module.exports = {
  validators,
  validateRequest,
};
