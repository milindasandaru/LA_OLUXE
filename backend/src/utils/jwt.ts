import jwt, { JwtPayload as JwtPayloadType, SignOptions } from 'jsonwebtoken';
import { IUser } from '../models/User';

export interface JwtPayload extends JwtPayloadType {
  userId: string;
  email: string;
  role: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

class JWTUtil {
  private accessTokenSecret: string | null = null;
  private refreshTokenSecret: string | null = null;
  private accessTokenExpiry: string;
  private refreshTokenExpiry: string;
  private initialized = false;

  constructor() {
    // Don't initialize immediately, wait for init() to be called
    this.accessTokenExpiry = '15m';
    this.refreshTokenExpiry = '7d';
  }

  init(): void {
    if (this.initialized) return;

    this.accessTokenSecret = process.env.JWT_ACCESS_SECRET || null;
    this.refreshTokenSecret = process.env.JWT_REFRESH_SECRET || null;
    this.accessTokenExpiry = process.env.JWT_ACCESS_EXPIRY || '15m';
    this.refreshTokenExpiry = process.env.JWT_REFRESH_EXPIRY || '7d';

    if (!this.accessTokenSecret || !this.refreshTokenSecret) {
      throw new Error('JWT secrets are not configured in environment variables');
    }

    this.initialized = true;
  }

  private ensureInitialized(): void {
    if (!this.initialized) {
      this.init();
    }
  }

  /**
   * Generate access token
   */
  generateAccessToken(user: IUser): string {
    this.ensureInitialized();
    
    const payload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role
    };

    const options: any = {
      expiresIn: this.accessTokenExpiry,
      issuer: 'adora.lk',
      audience: 'adora.lk-users'
    };

    return jwt.sign(payload, this.accessTokenSecret!, options);
  }

  /**
   * Generate refresh token
   */
  generateRefreshToken(user: IUser): string {
    this.ensureInitialized();
    
    const payload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role
    };

    const options: any = {
      expiresIn: this.refreshTokenExpiry,
      issuer: 'adora.lk',
      audience: 'adora.lk-users'
    };

    return jwt.sign(payload, this.refreshTokenSecret!, options);
  }

  /**
   * Generate both access and refresh tokens
   */
  generateTokenPair(user: IUser): TokenPair {
    return {
      accessToken: this.generateAccessToken(user),
      refreshToken: this.generateRefreshToken(user)
    };
  }

  /**
   * Verify access token
   */
  verifyAccessToken(token: string): JwtPayload {
    this.ensureInitialized();
    
    try {
      const decoded = jwt.verify(token, this.accessTokenSecret!, {
        issuer: 'adora.lk',
        audience: 'adora.lk-users'
      }) as unknown as JwtPayload;

      return decoded;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Access token has expired');
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Invalid access token');
      } else {
        throw new Error('Token verification failed');
      }
    }
  }

  /**
   * Verify refresh token
   */
  verifyRefreshToken(token: string): JwtPayload {
    this.ensureInitialized();
    
    try {
      const decoded = jwt.verify(token, this.refreshTokenSecret!, {
        issuer: 'adora.lk',
        audience: 'adora.lk-users'
      }) as unknown as JwtPayload;

      return decoded;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Refresh token has expired');
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Invalid refresh token');
      } else {
        throw new Error('Token verification failed');
      }
    }
  }

  /**
   * Extract token from Authorization header
   */
  extractTokenFromHeader(authHeader: string | undefined): string | null {
    if (!authHeader) {
      return null;
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return null;
    }

    return parts[1];
  }

  /**
   * Get token expiry time in seconds
   */
  getTokenExpiry(token: string): number {
    try {
      const decoded = jwt.decode(token) as JwtPayload;
      return decoded.exp || 0;
    } catch (error) {
      return 0;
    }
  }

  /**
   * Check if token is expired
   */
  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwt.decode(token) as JwtPayload;
      if (!decoded.exp) return true;
      
      return Date.now() >= decoded.exp * 1000;
    } catch (error) {
      return true;
    }
  }

  /**
   * Get time until token expires (in seconds)
   */
  getTimeUntilExpiry(token: string): number {
    try {
      const decoded = jwt.decode(token) as JwtPayload;
      if (!decoded.exp) return 0;
      
      const currentTime = Math.floor(Date.now() / 1000);
      return Math.max(0, decoded.exp - currentTime);
    } catch (error) {
      return 0;
    }
  }
}

// Export singleton instance
export const jwtUtil = new JWTUtil();
export default jwtUtil;
