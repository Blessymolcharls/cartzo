import apiService from './apiService';
import { RAZORPAY_KEY } from '../utils/constants';

export const paymentService = {
  createOrder: (amount) => {
    return apiService.post('/payment/create-order', { amount });
  },

  verifyPayment: (paymentData) => {
    return apiService.post('/payment/verify', paymentData);
  },

  openRazorpay: async (orderData) => {
    const { razorpayOrderId, amount, currency = 'INR' } = orderData;

    return new Promise((resolve, reject) => {
      if (!window.Razorpay) {
        reject(new Error('Razorpay checkout script is not loaded.'));
        return;
      }

      const options = {
        key: RAZORPAY_KEY,
        amount: amount * 100,
        currency,
        name: 'Cartzo',
        description: 'Product purchase',
        order_id: razorpayOrderId,
        handler: async (response) => {
          try {
            await paymentService.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            resolve(response);
          } catch (error) {
            reject(error);
          }
        },
        theme: { color: '#2563eb' },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    });
  },
};
