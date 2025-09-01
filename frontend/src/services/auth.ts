const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  location?: {
    city?: string;
    district?: string;
    province?: string;
  };
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  location?: {
    city?: string;
    district?: string;
    province?: string;
  };
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  role: string;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
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

class AuthService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${API_BASE_URL}/auth`;
  }

  /**
   * Register a new user
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (result.success && result.data?.tokens) {
        this.storeTokens(result.data.tokens);
      }

      return result;
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: 'Network error. Please try again.',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Login user
   */
  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (result.success && result.data?.tokens) {
        this.storeTokens(result.data.tokens);
      }

      return result;
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Network error. Please try again.',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Get current user profile
   */
  async getProfile(): Promise<ApiResponse> {
    try {
      const token = this.getAccessToken();
      
      if (!token) {
        return {
          success: false,
          message: 'No access token found',
          error: 'Authentication required'
        };
      }

      const response = await fetch(`${this.baseUrl}/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      return await response.json();
    } catch (error) {
      console.error('Get profile error:', error);
      return {
        success: false,
        message: 'Failed to fetch profile',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(data: Partial<User>): Promise<ApiResponse> {
    try {
      const token = this.getAccessToken();
      
      if (!token) {
        return {
          success: false,
          message: 'No access token found',
          error: 'Authentication required'
        };
      }

      const response = await fetch(`${this.baseUrl}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (error) {
      console.error('Update profile error:', error);
      return {
        success: false,
        message: 'Failed to update profile',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Change password
   */
  async changePassword(currentPassword: string, newPassword: string, confirmNewPassword: string): Promise<ApiResponse> {
    try {
      const token = this.getAccessToken();
      
      if (!token) {
        return {
          success: false,
          message: 'No access token found',
          error: 'Authentication required'
        };
      }

      const response = await fetch(`${this.baseUrl}/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmNewPassword
        }),
      });

      return await response.json();
    } catch (error) {
      console.error('Change password error:', error);
      return {
        success: false,
        message: 'Failed to change password',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<ApiResponse> {
    try {
      const refreshToken = this.getRefreshToken();
      
      if (!refreshToken) {
        return {
          success: false,
          message: 'No refresh token found',
          error: 'Authentication required'
        };
      }

      const response = await fetch(`${this.baseUrl}/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      const result = await response.json();
      
      if (result.success && result.data?.tokens) {
        this.storeTokens(result.data.tokens);
      }

      return result;
    } catch (error) {
      console.error('Refresh token error:', error);
      return {
        success: false,
        message: 'Failed to refresh token',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<ApiResponse> {
    try {
      const token = this.getAccessToken();
      
      if (token) {
        // Call logout endpoint
        await fetch(`${this.baseUrl}/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
      }

      // Clear local storage regardless of API call result
      this.clearTokens();

      return {
        success: true,
        message: 'Logged out successfully'
      };
    } catch (error) {
      console.error('Logout error:', error);
      // Clear tokens even if API call fails
      this.clearTokens();
      
      return {
        success: true, // Still return success since local logout worked
        message: 'Logged out successfully'
      };
    }
  }

  /**
   * Verify if token is valid
   */
  async verifyToken(): Promise<ApiResponse> {
    try {
      const token = this.getAccessToken();
      
      if (!token) {
        return {
          success: false,
          message: 'No access token found'
        };
      }

      const response = await fetch(`${this.baseUrl}/verify-token`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      return await response.json();
    } catch (error) {
      console.error('Verify token error:', error);
      return {
        success: false,
        message: 'Token verification failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Store tokens in localStorage
   */
  private storeTokens(tokens: { accessToken: string; refreshToken: string }): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);
    }
  }

  /**
   * Get access token from localStorage
   */
  getAccessToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('accessToken');
    }
    return null;
  }

  /**
   * Get refresh token from localStorage
   */
  getRefreshToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('refreshToken');
    }
    return null;
  }

  /**
   * Clear tokens from localStorage
   */
  clearTokens(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
}

export const authService = new AuthService();
export default authService;
