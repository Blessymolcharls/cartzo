import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import asyncHandler from 'express-async-handler';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Initialize Razorpay client
const getRazorpayInstance = () => {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    throw new Error('Razorpay credentials are not defined in environment variables.');
  }

  return new Razorpay({
    key_id,
    key_secret,
  });
};

// @desc    Create Razorpay Order
// @route   POST /api/payment/create-order
// @access  Private
router.post(
  '/create-order',
  protect,
  asyncHandler(async (req, res) => {
    const { amount } = req.body;

    if (!amount) {
      res.status(400);
      throw new Error('Amount is required.');
    }

    // Convert standard currency amount to paise
    const amountInPaise = Math.round(amount * 100);

    if (amountInPaise < 100) {
      res.status(400);
      throw new Error('Minimum order amount must be 100 paise (₹1).');
    }

    try {
      const razorpay = getRazorpayInstance();
      const options = {
        amount: amountInPaise,
        currency: 'INR',
        receipt: `receipt_order_${Date.now()}`,
      };

      const order = await razorpay.orders.create(options);

      res.status(200).json({
        razorpayOrderId: order.id,
        amount: amount,
        currency: 'INR',
      });
    } catch (error) {
      console.error('Razorpay Create Order Error:', error);
      res.status(500);
      throw new Error('Failed to initiate Razorpay order: ' + (error.description || error.message));
    }
  })
);

// @desc    Verify Razorpay signature
// @route   POST /api/payment/verify
// @access  Private
router.post(
  '/verify',
  protect,
  asyncHandler(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      res.status(400);
      throw new Error('Missing verification fields (order_id, payment_id, or signature).');
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      res.status(500);
      throw new Error('Razorpay secret is not defined in environment variables.');
    }

    const generated_signature = crypto
      .createHmac('sha256', secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generated_signature === razorpay_signature) {
      res.status(200).json({
        success: true,
        message: 'Payment verified successfully.',
      });
    } else {
      res.status(400);
      throw new Error('Payment verification failed. Invalid signature.');
    }
  })
);

export default router;
