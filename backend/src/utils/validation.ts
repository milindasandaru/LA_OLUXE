import { body, ValidationChain } from 'express-validator';

export const registerValidation: ValidationChain[] = [
  body('firstName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('First name can only contain letters and spaces'),

  body('lastName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Last name can only contain letters and spaces'),

  body('email')
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail({
      gmail_remove_dots: true,
      gmail_remove_subaddress: true,
      outlookdotcom_remove_subaddress: true
    }),

  body('password')
    .isLength({ min: 8, max: 128 })
    .withMessage('Password must be between 8 and 128 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,:;'"(){}[\]<>+=_-])[A-Za-z\d@$!%*?&.,:;'"(){}[\]<>+=_-]/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'),

  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),

  body('phone')
    .optional()
    .matches(/^(\+94|0)[0-9]{9}$/)
    .withMessage('Please provide a valid Sri Lankan phone number'),

  body('dateOfBirth')
    .optional()
    .isISO8601()
    .withMessage('Please provide a valid date of birth')
    .custom((value) => {
      if (value) {
        const age = (new Date().getTime() - new Date(value).getTime()) / (1000 * 60 * 60 * 24 * 365);
        if (age < 13) {
          throw new Error('You must be at least 13 years old to register');
        }
        if (age > 120) {
          throw new Error('Please provide a valid date of birth');
        }
      }
      return true;
    }),

  body('gender')
    .optional()
    .isIn(['male', 'female', 'other'])
    .withMessage('Gender must be male, female, or other'),

  body('location.city')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('City must be between 2 and 50 characters'),

  body('location.district')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('District must be between 2 and 50 characters'),

  body('location.province')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Province must be between 2 and 50 characters')
];

export const loginValidation: ValidationChain[] = [
  body('email')
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail({
      gmail_remove_dots: true,
      gmail_remove_subaddress: true,
      outlookdotcom_remove_subaddress: true
    }),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

export const forgotPasswordValidation: ValidationChain[] = [
  body('email')
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail({
      gmail_remove_dots: true,
      gmail_remove_subaddress: true,
      outlookdotcom_remove_subaddress: true
    })
];

export const resetPasswordValidation: ValidationChain[] = [
  body('token')
    .notEmpty()
    .withMessage('Reset token is required')
    .isLength({ min: 64, max: 64 })
    .withMessage('Invalid reset token format'),

  body('password')
    .isLength({ min: 8, max: 128 })
    .withMessage('Password must be between 8 and 128 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,:;'"(){}[\]<>+=_-])[A-Za-z\d@$!%*?&.,:;'"(){}[\]<>+=_-]/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'),

  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    })
];

export const changePasswordValidation: ValidationChain[] = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),

  body('newPassword')
    .isLength({ min: 8, max: 128 })
    .withMessage('New password must be between 8 and 128 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,:;'"(){}[\]<>+=_-])[A-Za-z\d@$!%*?&.,:;'"(){}[\]<>+=_-]/)
    .withMessage('New password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'),

  body('confirmNewPassword')
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('New password confirmation does not match new password');
      }
      return true;
    })
];

export const updateProfileValidation: ValidationChain[] = [
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('First name can only contain letters and spaces'),

  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Last name can only contain letters and spaces'),

  body('phone')
    .optional()
    .matches(/^(\+94|0)[0-9]{9}$/)
    .withMessage('Please provide a valid Sri Lankan phone number'),

  body('dateOfBirth')
    .optional()
    .isISO8601()
    .withMessage('Please provide a valid date of birth')
    .custom((value) => {
      if (value) {
        const age = (new Date().getTime() - new Date(value).getTime()) / (1000 * 60 * 60 * 24 * 365);
        if (age < 13) {
          throw new Error('You must be at least 13 years old');
        }
        if (age > 120) {
          throw new Error('Please provide a valid date of birth');
        }
      }
      return true;
    }),

  body('gender')
    .optional()
    .isIn(['male', 'female', 'other'])
    .withMessage('Gender must be male, female, or other'),

  body('location.city')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('City must be between 2 and 50 characters'),

  body('location.district')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('District must be between 2 and 50 characters'),

  body('location.province')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Province must be between 2 and 50 characters')
];
