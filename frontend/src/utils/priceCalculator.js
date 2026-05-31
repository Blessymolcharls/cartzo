import { TAX_RATE, STANDARD_SHIPPING, FREE_SHIPPING_THRESHOLD } from './constants';

/**
 * Calculate subtotal from cart items
 * @param {array} items - Cart items
 * @returns {number} Subtotal
 */
export const calculateSubtotal = (items) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

/**
 * Calculate tax amount
 * @param {number} subtotal - Subtotal amount
 * @param {number} rate - Tax rate (default 18%)
 * @returns {number} Tax amount
 */
export const calculateTax = (subtotal, rate = TAX_RATE) => {
  return Math.round(subtotal * rate);
};

/**
 * Calculate shipping cost
 * @param {number} subtotal - Subtotal amount
 * @param {number} freeThreshold - Free shipping threshold (default 500)
 * @returns {number} Shipping cost
 */
export const calculateShipping = (subtotal, freeThreshold = FREE_SHIPPING_THRESHOLD) => {
  return subtotal > freeThreshold ? 0 : STANDARD_SHIPPING;
};

/**
 * Calculate total price
 * @param {array} items - Cart items
 * @returns {object} Price breakdown
 */
export const calculateTotal = (items) => {
  const subtotal = calculateSubtotal(items);
  const tax = calculateTax(subtotal);
  const shipping = calculateShipping(subtotal);
  const total = subtotal + tax + shipping;

  return {
    subtotal,
    tax,
    shipping,
    total,
  };
};

/**
 * Check if free shipping is available
 * @param {number} subtotal - Subtotal amount
 * @returns {boolean} True if free shipping available
 */
export const isFreeShippingAvailable = (subtotal) => {
  return subtotal > FREE_SHIPPING_THRESHOLD;
};

/**
 * Get remaining amount for free shipping
 * @param {number} subtotal - Subtotal amount
 * @returns {number} Remaining amount needed for free shipping
 */
export const getRemainingForFreeShipping = (subtotal) => {
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
  return remaining > 0 ? remaining : 0;
};
