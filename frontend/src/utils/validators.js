import { VALIDATION_RULES } from './constants';

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const validateEmail = (email) => {
  return VALIDATION_RULES.EMAIL_REGEX.test(email);
};

/**
 * Validate password length
 * @param {string} password - Password to validate
 * @returns {boolean} True if valid
 */
export const validatePassword = (password) => {
  return password && password.length >= VALIDATION_RULES.PASSWORD_MIN_LENGTH;
};

/**
 * Validate phone number (10 digits)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid
 */
export const validatePhone = (phone) => {
  return VALIDATION_RULES.PHONE_REGEX.test(phone);
};

/**
 * Validate ZIP code (6 digits)
 * @param {string} zipCode - ZIP code to validate
 * @returns {boolean} True if valid
 */
export const validateZipCode = (zipCode) => {
  return VALIDATION_RULES.ZIPCODE_REGEX.test(zipCode);
};

/**
 * Validate required field
 * @param {any} value - Value to validate
 * @returns {boolean} True if value is not empty
 */
export const validateRequired = (value) => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return !!value;
};

/**
 * Validate form data object
 * @param {object} data - Form data to validate
 * @param {object} rules - Validation rules object
 * @returns {object} Errors object
 */
export const validateForm = (data, rules) => {
  const errors = {};

  Object.keys(rules).forEach((field) => {
    const rule = rules[field];
    const value = data[field];

    if (rule.required && !validateRequired(value)) {
      errors[field] = `${field} is required`;
    }

    if (value && rule.type === 'email' && !validateEmail(value)) {
      errors[field] = 'Invalid email format';
    }

    if (value && rule.type === 'phone' && !validatePhone(value)) {
      errors[field] = 'Phone number must be 10 digits';
    }

    if (value && rule.type === 'zipCode' && !validateZipCode(value)) {
      errors[field] = 'ZIP code must be 6 digits';
    }

    if (value && rule.minLength && value.length < rule.minLength) {
      errors[field] = `${field} must be at least ${rule.minLength} characters`;
    }

    if (value && rule.maxLength && value.length > rule.maxLength) {
      errors[field] = `${field} must not exceed ${rule.maxLength} characters`;
    }
  });

  return errors;
};
