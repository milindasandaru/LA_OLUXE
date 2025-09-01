import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { jwtUtil, JwtPayload } from '../utils/jwt';
import { User, IUser } from '../models/User';

// Extend Express Request interface
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      userId?: string;
    }
  }
}

/**
 * Middleware to handle validation errors
 */
export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array().map(error => ({
        field: error.type === 'field' ? error.path : error.type,
        message: error.msg,
        value: error.type === 'field' ? error.value : undefined
      }))
    });
    return;
  }
  
  next();
};

/**
 * Middleware to authenticate user using JWT token
 */
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = jwtUtil.extractTokenFromHeader(req.headers.authorization);
    
    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Access token is required'
      });
      return;
    }

    let decoded: JwtPayload;
    try {
      decoded = jwtUtil.verifyAccessToken(token);
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error instanceof Error ? error.message : 'Invalid token'
      });
      return;
    }

    // Check if user still exists and is active
    const user = await User.findById(decoded.userId).select('+password');
    
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'User no longer exists'
      });
      return;
    }

    if (!user.isActive) {
      res.status(401).json({
        success: false,
        message: 'Account has been deactivated'
      });
      return;
    }

    if (user.isLocked()) {
      res.status(423).json({
        success: false,
        message: 'Account is temporarily locked due to multiple failed login attempts'
      });
      return;
    }

    // Add user to request object
    req.user = user;
    req.userId = user._id.toString();
    
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({
      success: false,
      message: 'Authentication failed'
    });
  }
};

/**
 * Middleware to check if user has required role
 */
export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: 'Insufficient permissions'
      });
      return;
    }

    next();
  };
};

/**
 * Middleware for optional authentication (doesn't fail if no token)
 */
export const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = jwtUtil.extractTokenFromHeader(req.headers.authorization);
    
    if (!token) {
      // No token provided, continue without authentication
      next();
      return;
    }

    try {
      const decoded = jwtUtil.verifyAccessToken(token);
      const user = await User.findById(decoded.userId).select('+password');
      
      if (user && user.isActive && !user.isLocked()) {
        req.user = user;
        req.userId = user._id.toString();
      }
    } catch (error) {
      // Token invalid, but continue without authentication
      console.warn('Optional auth token invalid:', error);
    }
    
    next();
  } catch (error) {
    console.error('Optional authentication error:', error);
    next(); // Continue even on error
  }
};

/**
 * Middleware to check if user owns the resource
 */
export const checkResourceOwnership = (resourceUserIdParam: string = 'userId') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
      return;
    }

    const resourceUserId = req.params[resourceUserIdParam] || req.body[resourceUserIdParam];
    
    // Allow if user is admin/moderator or owns the resource
    if (req.user.role === 'admin' || 
        req.user.role === 'moderator' || 
        req.user._id.toString() === resourceUserId) {
      next();
    } else {
      res.status(403).json({
        success: false,
        message: 'Access denied: You can only access your own resources'
      });
    }
  };
};

/**
 * Middleware to ensure email is verified
 */
export const requireEmailVerification = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: 'Authentication required'
    });
    return;
  }

  if (!req.user.isEmailVerified) {
    res.status(403).json({
      success: false,
      message: 'Email verification required'
    });
    return;
  }

  next();
};
