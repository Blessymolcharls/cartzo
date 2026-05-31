import express from 'express';
const router = express.Router();
import { authUser, adminLogin, registerUser, getUserProfile, updateUserProfile, getUsers } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { admin } from '../middlewares/adminMiddleware.js';

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/admin/login', adminLogin);

router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route('/users')
  .get(protect, admin, getUsers);

export default router;
