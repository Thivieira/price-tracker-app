import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import axios from 'axios';
import { Toast } from 'react-native-toast-message';

export interface User {
  id: number
  phone: string
  email: string | null
  username: string
  first_name: string
  last_name: string
  birthdate: string
  street_address: string
  unit_number: string | null
  city: string
  region: string
  zip_code: string
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isPinVerified: boolean;
  isLoggedIn: boolean;
}



interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isPinVerified: boolean;
  isLoggedIn: boolean;
  isLoading: boolean;
  signUp: (formData: any) => Promise<any>;
  signIn: (username_or_email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  verifyPin: (pin: string) => Promise<boolean>;
  // setupPin: (pin: string) => Promise<void>;
  sendOtp: (phone: string) => Promise<boolean>;
  resendOtp: (phone: string) => Promise<{ success: boolean; message: string }>;
  verifyOtp: (phone: string, otp: string) => Promise<boolean>;
}

// Create an axios instance with default config
export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Rename the provider component to AuthProvider
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    accessToken: null,
    refreshToken: null,
    isPinVerified: false,
    isLoggedIn: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  const clearAuthAndRedirect = async () => {
    await Promise.all([
      AsyncStorage.removeItem('accessToken'),
      AsyncStorage.removeItem('refreshToken'),
      AsyncStorage.removeItem('user'),
      AsyncStorage.removeItem('pin'),
    ]);

    // Update the auth state before redirecting
    setState({
      user: null,
      accessToken: null,
      refreshToken: null,
      isPinVerified: false,
      isLoggedIn: false
    });

    // Use replace instead of push to prevent navigation stack issues
    router.replace('/(auth)/signin');
  };

  // Update the interceptor to use the new clearAuthAndRedirect
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        console.log('Interceptor caught error:', {
          status: error.response?.status,
          url: originalRequest.url,
          isRetry: originalRequest._retry
        });

        if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== '/auth/refresh') {
          originalRequest._retry = true;
          try {
            console.log('Attempting token refresh...');
            const refreshToken = await AsyncStorage.getItem('refreshToken');
            const response = await api.post(
              '/auth/refresh',
              {},
              {
                headers: {
                  Authorization: `Bearer ${refreshToken}`,
                },
              }
            );
            console.log('Refresh successful, updating tokens...');
            const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;

            // Store new tokens
            await Promise.all([
              AsyncStorage.setItem('accessToken', newAccessToken),
              AsyncStorage.setItem('refreshToken', newRefreshToken),
            ]);

            // Update state with new tokens
            setState(prev => ({
              ...prev,
              accessToken: newAccessToken,
              refreshToken: newRefreshToken
            }));

            // Update axios headers
            api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

            return api(originalRequest);
          } catch (refreshError) {
            console.log('Refresh failed:', refreshError);
            // Only redirect if refresh token is invalid/expired
            if (refreshError.response?.status === 401) {
              await clearAuthAndRedirect();
            }
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptor on unmount
    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, []);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  // Update axios token when auth state changes
  useEffect(() => {
    if (state.accessToken) {
      api.defaults.headers.common['Authorization'] = `Bearer ${state.accessToken}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, [state.accessToken]);

  const loadStoredAuth = async () => {
    try {
      const [accessToken, refreshToken, userStr] = await Promise.all([
        AsyncStorage.getItem('accessToken'),
        AsyncStorage.getItem('refreshToken'),
        AsyncStorage.getItem('user'),
      ]);

      if (accessToken && refreshToken && userStr) {
        const user = JSON.parse(userStr);
        setState({
          user,
          accessToken,
          refreshToken,
          isPinVerified: false,
          isLoggedIn: true,
        });
        router.replace('/pin-verification');
      } else {
        // If no auth data is found, ensure we're in a logged out state
        setState({
          user: null,
          accessToken: null,
          refreshToken: null,
          isPinVerified: false,
          isLoggedIn: false,
        });
      }
    } catch (error) {
      console.error('Error loading stored auth:', error);
      // On error, ensure we're in a logged out state
      setState({
        user: null,
        accessToken: null,
        refreshToken: null,
        isPinVerified: false,
        isLoggedIn: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserProfile = async (accessToken: string) => {
    try {
      const response = await api.get('/auth/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      const user = response.data?.user;
      await AsyncStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  };

  const signUp = async (formData: any) => {
    try {
      const response = await api.post('/auth/register', formData);

      // Check if response exists and has a status code
      if (!response || !response.data) {
        throw new Error('No response received from server');
      }

      // Check response status
      if (response.status !== 200 && response.status !== 201) {
        throw new Error(`Registration failed with status: ${response.status}`);
      }

      // Validate response data
      const { accessToken, refreshToken } = response.data;
      if (!accessToken || !refreshToken) {
        throw new Error('Invalid server response: Missing authentication tokens');
      }

      // Store tokens
      await Promise.all([
        AsyncStorage.setItem('accessToken', accessToken),
        AsyncStorage.setItem('refreshToken', refreshToken),
      ]);

      // Update API headers
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      // Fetch user profile
      const user = await fetchUserProfile(accessToken);
      if (!user) {
        throw new Error('Failed to fetch user profile');
      }

      // Update state
      setState({
        user,
        accessToken,
        refreshToken,
        isPinVerified: true,
        isLoggedIn: true
      });

      return { success: true };

    } catch (error) {
      // Log detailed error information
      console.error('Signup error:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        response: axios.isAxiosError(error) ? {
          status: error.response?.status,
          data: error.response?.data
        } : undefined
      });

      // Clear any partial auth data
      await clearAuthAndRedirect();

      // Handle specific error cases
      if (axios.isAxiosError(error)) {
        if (!error.response) {
          throw new Error('Network error. Please check your connection.');
        }
        if (error.response.status === 422) {
          throw new Error(error.response.data.message || 'Validation failed. Please check your input.');
        }
        if (error.response.status === 409) {
          throw new Error('User already exists with these credentials.');
        }
        if (error.response.data?.message) {
          throw new Error(error.response.data.message);
        }
      }

      throw error;
    }
  };


  const signIn = async (username_or_email: string, password: string) => {
    try {
      const response = await api.post('/auth/login',
        { username_or_email, password },
        {
          timeout: 10000,
          validateStatus: (status) => status < 500
        }
      );

      const { accessToken, refreshToken } = response.data;

      // Store tokens first
      await Promise.all([
        AsyncStorage.setItem('accessToken', accessToken),
        AsyncStorage.setItem('refreshToken', refreshToken),
      ]);

      // Update state and axios defaults before fetching profile
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      // Fetch user profile after token setup
      const user = await fetchUserProfile(accessToken);

      setState({ user, accessToken, refreshToken, isPinVerified: false, isLoggedIn: true });

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Authentication error:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data
        });

        // Clear any partial auth data on failure
        await clearAuthAndRedirect();

        if (error.response?.status === 401) {
          throw new Error('Invalid credentials. Please try again.');
        }
        if (!error.response) {
          throw new Error('Network error. Please check your connection.');
        }
      }
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await clearAuthAndRedirect();
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  const verifyPin = async (pin: string) => {
    try {
      await api.post('/auth/verify-pin', { pin });
      setState(prev => ({ ...prev, isPinVerified: true }));
      router.replace('/(tabs)');
      return true;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        await clearAuthAndRedirect();
        Toast.show({
          type: 'error',
          text1: 'Session Expired',
          text2: 'Please sign in again'
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Invalid PIN',
          text2: 'Please try again'
        });
      }
      return false;
    }
  };

  // const setupPin = async (pin: string) => {
  //   try {
  //     await api.post('/auth/setup-pin', { pin });
  //     setState(prev => ({ ...prev, isPinVerified: true }));
  //     router.replace('/(tabs)');
  //   } catch (error) {
  //     console.error('PIN setup error:', error);
  //     throw error;
  //   }
  // };

  const sendOtp = async (phone: string) => {
    try {
      await api.post('/auth/otp', { phone });
      return true;
    } catch (error) {
      console.error('OTP sending error:', error);
      return false;
    }
  }

  const resendOtp = async (phone: string) => {
    try {
      await api.post('/auth/otp/resend', { phone });
      return { success: true, message: 'OTP sent successfully.' };
    } catch (error) {
      console.error('OTP sending error:', error);
      return { success: false, message: error?.response?.data?.message ?? 'Failed to send OTP.' };
    }
  }

  const verifyOtp = async (phone: string, otp: string) => {
    try {
      await api.post('/auth/otp/verify', { phone, otp });
      return true;
    } catch (error) {
      console.error('OTP verification error:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isPinVerified: state.isPinVerified,
        isLoggedIn: state.isLoggedIn,
        isLoading,
        signUp,
        signIn,
        signOut,
        verifyPin,
        // setupPin,
        sendOtp,
        resendOtp,
        verifyOtp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 