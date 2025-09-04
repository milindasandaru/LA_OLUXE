import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { authController } from '../controllers/authController';
import { authenticate, handleValidationErrors } from '../middleware/auth';
import { updateProfileValidation } from '../utils/validation';

const router = Router();

// Rate limiting for user operations
const userLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // Allow 30 requests per windowMs for user operations
  message: {
    success: false,
    message: 'Too many requests. Please try again later.',
    error: 'Rate limit exceeded'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * @route   GET /api/users/me
 * @desc    Get current user profile
 * @access  Private
 */
router.get(
  '/me',
  userLimiter,
  authenticate,
  authController.getProfile
);

/**
 * @route   PUT /api/users/me
 * @desc    Update current user profile
 * @access  Private
 */
router.put(
  '/me',
  userLimiter,
  authenticate,
  updateProfileValidation,
  handleValidationErrors,
  authController.updateProfile
);

export default router;
