import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Currency = 'USD' | 'BRL';

type CurrencyContextType = {
  currency: Currency;
  setCurrency: (currency: Currency) => Promise<void>;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('USD');

  useEffect(() => {
    loadStoredCurrency();
  }, []);

  const loadStoredCurrency = async () => {
    try {
      const storedCurrency = await AsyncStorage.getItem('currency');
      if (storedCurrency === 'BRL' || storedCurrency === 'USD') {
        setCurrencyState(storedCurrency);
      }
    } catch (error) {
      console.error('Error loading currency:', error);
    }
  };

  const setCurrency = async (newCurrency: Currency) => {
    try {
      await AsyncStorage.setItem('currency', newCurrency);
      setCurrencyState(newCurrency);
    } catch (error) {
      console.error('Error saving currency:', error);
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
} 