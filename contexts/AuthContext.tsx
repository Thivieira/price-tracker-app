import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  name: string;
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
  signIn: (username_or_email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  verifyPin: (pin: string) => Promise<boolean>;


  setupPin: (pin: string) => Promise<void>;
}

// Create an axios instance with default config
const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create a function that can be called from both the interceptor and component
const clearAuthData = async () => {
  await Promise.all([
    AsyncStorage.removeItem('accessToken'),
    AsyncStorage.removeItem('refreshToken'),
    AsyncStorage.removeItem('user'),
    AsyncStorage.removeItem('pin'),
  ]);
  router.replace('/');
};

// Add axios interceptor for automatic token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== '/auth/refresh') {
      originalRequest._retry = true;
      try {
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
        const { accessToken: newAccessToken } = response.data;
        await AsyncStorage.setItem('accessToken', newAccessToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, clear auth data
        await clearAuthData();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    accessToken: null,
    refreshToken: null,
    isPinVerified: false,
    isLoggedIn: false,
  });
  const [isLoading, setIsLoading] = useState(true);



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
      }

    } catch (error) {
      console.error('Error loading stored auth:', error);
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
      const user = response.data;
      await AsyncStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      console.error('Error fetching user profile:', error);
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
        await clearAuthData();

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
      await clearAuthData();
      setState({ user: null, accessToken: null, refreshToken: null, isPinVerified: false, isLoggedIn: false });
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
      console.error('PIN verification error:', error);
      return false;
    }
  };

  const setupPin = async (pin: string) => {
    try {
      await api.post('/auth/setup-pin', { pin });
      setState(prev => ({ ...prev, isPinVerified: true }));
      router.replace('/(tabs)');
    } catch (error) {
      console.error('PIN setup error:', error);
      throw error;
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
        signIn,
        signOut,
        verifyPin,
        setupPin,


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