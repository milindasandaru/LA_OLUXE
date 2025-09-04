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

      const response = await fetch(`${API_BASE_URL}/users/me`, {
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

      const response = await fetch(`${API_BASE_URL}/users/me`, {
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

  async requestEmailVerification(): Promise<ApiResponse> {
    try {
      const token = this.getAccessToken();
      
      if (!token) {
        return {
          success: false,
          message: 'No access token found',
          error: 'Authentication required'
        };
      }

      const response = await fetch(`${this.baseUrl}/request-email-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      return await response.json();
    } catch (error) {
      console.error('Request email verification error:', error);
      return {
        success: false,
        message: 'Failed to request email verification',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async confirmEmailVerification(token: string): Promise<ApiResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/confirm-email-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      return await response.json();
    } catch (error) {
      console.error('Confirm email verification error:', error);
      return {
        success: false,
        message: 'Failed to confirm email verification',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async forgotPassword(email: string): Promise<ApiResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      return await response.json();
    } catch (error) {
      console.error('Forgot password error:', error);
      return {
        success: false,
        message: 'Failed to request password reset',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async resetPassword(token: string, password: string, confirmPassword: string): Promise<ApiResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password, confirmPassword }),
      });

      return await response.json();
    } catch (error) {
      console.error('Reset password error:', error);
      return {
        success: false,
        message: 'Failed to reset password',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

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
          'Authorization': `Bearer ${refreshToken}`,
        },
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

  async logout(): Promise<ApiResponse> {
    try {
      const token = this.getAccessToken();
      
      if (token) {
        await fetch(`${this.baseUrl}/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
      }

      this.clearTokens();

      return {
        success: true,
        message: 'Logged out successfully'
      };
    } catch (error) {
      console.error('Logout error:', error);
      this.clearTokens();
      return {
        success: true,
        message: 'Logged out successfully'
      };
    }
  }

  async verifyToken(): Promise<ApiResponse> {
    try {
      const token = this.getAccessToken();
      
      if (!token) {
        return {
          success: false,
          message: 'No access token found',
          error: 'Authentication required'
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
        message: 'Failed to verify token',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private storeTokens(tokens: { accessToken: string; refreshToken: string }): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);
    }
  }

  getAccessToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('accessToken');
    }
    return null;
  }

  private getRefreshToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('refreshToken');
    }
    return null;
  }

  private clearTokens(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
}

const authService = new AuthService();
export default authService;
