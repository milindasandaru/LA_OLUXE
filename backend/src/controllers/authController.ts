import { Request, Response } from 'express';
import crypto from 'crypto';
import { User, IUser } from '../models/User';
import { jwtUtil } from '../utils/jwt';

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: Partial<IUser>;
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  };
  error?: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

class AuthController {
  /**
   * Register new user
   */
  async register(req: Request, res: Response): Promise<void> {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        phone,
        dateOfBirth,
        gender,
        location
      } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(409).json({
          success: false,
          message: 'User already exists with this email address'
        } as AuthResponse);
        return;
      }

      // Create new user
      const user = new User({
        firstName,
        lastName,
        email,
        password,
        phone,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
        gender,
        location
      });

      // Generate email verification token
      const emailVerificationToken = user.generateEmailVerificationToken();
      
      await user.save();

      // Generate JWT tokens
      let tokens;
      try {
        tokens = jwtUtil.generateTokenPair(user);
      } catch (err) {
        console.error('Token generation error:', err instanceof Error ? err.message : err);
        console.error('Token generation stack:', err instanceof Error && err.stack ? err.stack : err);
        res.status(500).json({
          success: false,
          message: 'Registration failed during token generation',
          error: err instanceof Error ? err.message : 'Token generation error'
        } as AuthResponse);
        return;
      }

      // TODO: Send email verification email
      console.log(`Email verification token for ${email}: ${emailVerificationToken}`);

      res.status(201).json({
        success: true,
        message: 'User registered successfully. Please check your email for verification.',
        data: {
          user: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            dateOfBirth: user.dateOfBirth,
            gender: user.gender,
            location: user.location,
            isEmailVerified: user.isEmailVerified,
            isPhoneVerified: user.isPhoneVerified,
            role: user.role,
            createdAt: user.createdAt
          },
          tokens
        }
      } as AuthResponse);

    } catch (error: any) {
      // Detailed logging for debugging
      console.error('Registration error:', error instanceof Error ? error.message : error);
      console.error('Registration stack:', error instanceof Error && error.stack ? error.stack : error);

      // Handle mongoose duplicate key error (email already exists)
      if (error && error.code === 11000) {
        res.status(409).json({
          success: false,
          message: 'User already exists with this email address',
          error: 'Duplicate email'
        } as AuthResponse);
        return;
      }

      if (error instanceof Error && error.name === 'ValidationError') {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          error: error.message
        } as AuthResponse);
      } else {
        // In development return the error message to help debugging (remove in production)
        res.status(500).json({
          success: false,
          message: 'Registration failed. Please try again.',
          error: error instanceof Error ? error.message : 'Internal server error'
        } as AuthResponse);
      }
    }
  }

  /**
   * Login user
   */
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Find user and include password field
      const user = await User.findOne({ email }).select('+password');
      
      if (!user) {
        res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        } as AuthResponse);
        return;
      }

      // Check if account is active
      if (!user.isActive) {
        res.status(401).json({
          success: false,
          message: 'Account has been deactivated'
        } as AuthResponse);
        return;
      }

      // Check if account is locked
      if (user.isLocked()) {
        res.status(423).json({
          success: false,
          message: 'Account is temporarily locked due to multiple failed login attempts. Please try again later.'
        } as AuthResponse);
        return;
      }

      // Verify password
      const isPasswordValid = await user.comparePassword(password);
      
      if (!isPasswordValid) {
        // Increment login attempts
        await user.incrementLoginAttempts();
        
        res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        } as AuthResponse);
        return;
      }

      // Reset login attempts on successful login
      if (user.loginAttempts > 0) {
        await user.updateOne({
          $unset: { loginAttempts: 1, lockUntil: 1 }
        });
      }

      // Update last login
      user.lastLogin = new Date();
      await user.save();

      // Generate JWT tokens
      const tokens = jwtUtil.generateTokenPair(user);

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          user: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            dateOfBirth: user.dateOfBirth,
            gender: user.gender,
            location: user.location,
            isEmailVerified: user.isEmailVerified,
            isPhoneVerified: user.isPhoneVerified,
            role: user.role,
            lastLogin: user.lastLogin,
            createdAt: user.createdAt
          },
          tokens
        }
      } as AuthResponse);

    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Login failed. Please try again.',
        error: 'Internal server error'
      } as AuthResponse);
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        res.status(400).json({
          success: false,
          message: 'Refresh token is required'
        } as ApiResponse);
        return;
      }

      let decoded;
      try {
        decoded = jwtUtil.verifyRefreshToken(refreshToken);
      } catch (error) {
        res.status(401).json({
          success: false,
          message: error instanceof Error ? error.message : 'Invalid refresh token'
        } as ApiResponse);
        return;
      }

      // Find user
      const user = await User.findById(decoded.userId);
      
      if (!user || !user.isActive) {
        res.status(401).json({
          success: false,
          message: 'Invalid refresh token'
        } as ApiResponse);
        return;
      }

      // Generate new tokens
      const tokens = jwtUtil.generateTokenPair(user);

      res.status(200).json({
        success: true,
        message: 'Token refreshed successfully',
        data: { tokens }
      } as ApiResponse);

    } catch (error) {
      console.error('Token refresh error:', error);
      res.status(500).json({
        success: false,
        message: 'Token refresh failed',
        error: 'Internal server error'
      } as ApiResponse);
    }
  }

  /**
   * Get current user profile
   */
  async getProfile(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'User not authenticated'
        } as ApiResponse);
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Profile retrieved successfully',
        data: {
          user: {
            _id: req.user._id,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            email: req.user.email,
            phone: req.user.phone,
            dateOfBirth: req.user.dateOfBirth,
            gender: req.user.gender,
            location: req.user.location,
            isEmailVerified: req.user.isEmailVerified,
            isPhoneVerified: req.user.isPhoneVerified,
            role: req.user.role,
            lastLogin: req.user.lastLogin,
            createdAt: req.user.createdAt,
            updatedAt: req.user.updatedAt
          }
        }
      } as ApiResponse);

    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve profile',
        error: 'Internal server error'
      } as ApiResponse);
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'User not authenticated'
        } as ApiResponse);
        return;
      }

      const allowedUpdates = [
        'firstName',
        'lastName',
        'phone',
        'dateOfBirth',
        'gender',
        'location'
      ];

      const updates: any = {};
      
      // Only include allowed fields that are present in request
      Object.keys(req.body).forEach(key => {
        if (allowedUpdates.includes(key) && req.body[key] !== undefined) {
          if (key === 'dateOfBirth' && req.body[key]) {
            updates[key] = new Date(req.body[key]);
          } else {
            updates[key] = req.body[key];
          }
        }
      });

      if (Object.keys(updates).length === 0) {
        res.status(400).json({
          success: false,
          message: 'No valid fields to update'
        } as ApiResponse);
        return;
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        updates,
        { 
          new: true, 
          runValidators: true 
        }
      );

      if (!updatedUser) {
        res.status(404).json({
          success: false,
          message: 'User not found'
        } as ApiResponse);
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: {
          user: {
            _id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            phone: updatedUser.phone,
            dateOfBirth: updatedUser.dateOfBirth,
            gender: updatedUser.gender,
            location: updatedUser.location,
            isEmailVerified: updatedUser.isEmailVerified,
            isPhoneVerified: updatedUser.isPhoneVerified,
            role: updatedUser.role,
            lastLogin: updatedUser.lastLogin,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt
          }
        }
      } as ApiResponse);

    } catch (error) {
      console.error('Update profile error:', error);
      
      if (error instanceof Error && error.name === 'ValidationError') {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          error: error.message
        } as ApiResponse);
      } else {
        res.status(500).json({
          success: false,
          message: 'Profile update failed',
          error: 'Internal server error'
        } as ApiResponse);
      }
    }
  }

  /**
   * Change password
   */
  async changePassword(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'User not authenticated'
        } as ApiResponse);
        return;
      }

      const { currentPassword, newPassword } = req.body;

      // Get user with password field
      const user = await User.findById(req.user._id).select('+password');
      
      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found'
        } as ApiResponse);
        return;
      }

      // Verify current password
      const isCurrentPasswordValid = await user.comparePassword(currentPassword);
      
      if (!isCurrentPasswordValid) {
        res.status(400).json({
          success: false,
          message: 'Current password is incorrect'
        } as ApiResponse);
        return;
      }

      // Update password
      user.password = newPassword;
      await user.save();

      res.status(200).json({
        success: true,
        message: 'Password changed successfully'
      } as ApiResponse);

    } catch (error) {
      console.error('Change password error:', error);
      res.status(500).json({
        success: false,
        message: 'Password change failed',
        error: 'Internal server error'
      } as ApiResponse);
    }
  }

  /**
   * Logout user (client-side token invalidation)
   */
  async logout(req: Request, res: Response): Promise<void> {
    try {
      // In a stateless JWT implementation, logout is typically handled client-side
      // by removing the tokens from storage. However, we can log the logout event.
      
      if (req.user) {
        console.log(`User ${req.user.email} logged out at ${new Date().toISOString()}`);
      }

      res.status(200).json({
        success: true,
        message: 'Logged out successfully'
      } as ApiResponse);

    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({
        success: false,
        message: 'Logout failed',
        error: 'Internal server error'
      } as ApiResponse);
    }
  }
}

export const authController = new AuthController();
export default authController;
