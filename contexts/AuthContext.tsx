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
  token: string | null;
  isPinVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isPinVerified: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isPinVerified: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  // Update axios token when auth state changes
  useEffect(() => {
    if (state.token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, [state.token]);

  const loadStoredAuth = async () => {
    try {
      const [token, userStr] = await Promise.all([
        AsyncStorage.getItem('token'),
        AsyncStorage.getItem('user'),
      ]);

      if (token && userStr) {
        const user = JSON.parse(userStr);
        setState({ user, token, isPinVerified: false });
        router.replace('/pin-verification');
      }
    } catch (error) {
      console.error('Error loading stored auth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;

      await Promise.all([
        AsyncStorage.setItem('token', token),
        AsyncStorage.setItem('user', JSON.stringify(user)),
      ]);

      setState({ user, token, isPinVerified: false });
      router.replace('/pin-setup');
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem('token'),
        AsyncStorage.removeItem('user'),
        AsyncStorage.removeItem('pin'),
      ]);
      setState({ user: null, token: null, isPinVerified: false });
      router.replace('/');
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
        token: state.token,
        isPinVerified: state.isPinVerified,
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