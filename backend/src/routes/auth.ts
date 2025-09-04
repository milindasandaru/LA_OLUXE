import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { authController } from '../controllers/authController';
import { 
  authenticate, 
  handleValidationErrors,
  optionalAuth 
} from '../middleware/auth';
import {
  registerValidation,
  loginValidation,
  changePasswordValidation,
  updateProfileValidation
} from '../utils/validation';

const router = Router();

// Rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 auth requests per windowMs
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again later.',
    error: 'Rate limit exceeded'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const strictAuthLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login attempts per windowMs
  message: {
    success: false,
    message: 'Too many login attempts. Please try again later.',
    error: 'Rate limit exceeded'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const profileLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Allow more requests for profile operations
  message: {
    success: false,
    message: 'Too many profile requests. Please try again later.',
    error: 'Rate limit exceeded'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post(
  '/register',
  authLimiter,
  registerValidation,
  handleValidationErrors,
  authController.register
);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post(
  '/login',
  strictAuthLimiter,
  loginValidation,
  handleValidationErrors,
  authController.login
);

/**
 * @route   POST /api/auth/refresh
 * @desc    Refresh access token
 * @access  Public
 */
router.post(
  '/refresh',
  authLimiter,
  authController.refreshToken
);

/**
 * @route   GET /api/auth/profile
 * @desc    Get current user profile
 * @access  Private
 */
router.get(
  '/profile',
  profileLimiter,
  authenticate,
  authController.getProfile
);

/**
 * @route   PUT /api/auth/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put(
  '/profile',
  profileLimiter,
  authenticate,
  updateProfileValidation,
  handleValidationErrors,
  authController.updateProfile
);

/**
 * @route   PUT /api/auth/change-password
 * @desc    Change user password
 * @access  Private
 */
router.put(
  '/change-password',
  authLimiter,
  authenticate,
  changePasswordValidation,
  handleValidationErrors,
  authController.changePassword
);

/**
 * @route   POST /api/auth/request-email-verification
 * @desc    Request (resend) email verification token
 * @access  Private
 */
router.post(
  '/request-email-verification',
  authLimiter,
  authenticate,
  authController.requestEmailVerification
);

/**
 * @route   POST /api/auth/confirm-email-verification
 * @desc    Confirm email verification
 * @access  Public
 */
router.post(
  '/confirm-email-verification',
  authLimiter,
  (req, res, next) => { // simple inline validation
    const { token } = req.body;
    if (!token || typeof token !== 'string' || token.length !== 64) {
      return res.status(400).json({ success: false, message: 'Invalid verification token' });
    }
    next();
  },
  authController.confirmEmailVerification
);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user
 * @access  Private
 */
router.post(
  '/logout',
  profileLimiter,
  authenticate,
  authController.logout
);

/**
 * @route   GET /api/auth/verify-token
 * @desc    Verify if token is valid
 * @access  Public (optional auth)
 */
router.get(
  '/verify-token',
  profileLimiter,
  optionalAuth,
  (req, res) => {
    if (req.user) {
      res.status(200).json({
        success: true,
        message: 'Token is valid',
        data: {
          user: {
            _id: req.user._id,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            email: req.user.email,
            role: req.user.role,
            isEmailVerified: req.user.isEmailVerified
          }
        }
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Token is invalid or expired'
      });
    }
  }
);

export default router;
