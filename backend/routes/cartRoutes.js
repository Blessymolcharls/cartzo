import express from 'express';
const router = express.Router();
import {
  getCart,
  syncCart,
  updateCartItem,
  clearCart,
} from '../controllers/cartController.js';
import { protect } from '../middlewares/authMiddleware.js';

router.route('/')
  .get(protect, getCart);

router.route('/sync')
  .post(protect, syncCart);

router.route('/update')
  .put(protect, updateCartItem);

router.route('/clear')
  .delete(protect, clearCart);

export default router;
