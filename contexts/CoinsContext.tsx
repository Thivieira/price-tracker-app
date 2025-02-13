import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { api } from './AuthContext';
import { useCurrency } from './CurrencyContext';

// Define the coin structure

type Coin = {
  id: string;
  name: string;
  symbol: string;
  image_url: string;
  current_price: number;
  price_change_24h: number;
};

type CoinsContextType = {
  coins: Coin[];
  filteredCoins: Coin[];
  isLoading: boolean;
  error: string | null;
  refreshCoins: () => Promise<void>;
  searchCoins: (query: string) => void;
  search: string;
  setSearch: (query: string) => void;
  fetchCoin: (symbol: string) => Promise<Coin>;
};


const CoinsContext = createContext<CoinsContextType | undefined>(undefined);

export function CoinsProvider({ children }: { children: React.ReactNode }) {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<Coin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');
  const { currency } = useCurrency();

  const searchCoins = useCallback((query: string) => {
    setSearch(query); // This will trigger the fetchCoins effect
  }, []);

  const fetchCoins = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.get('/coins', {
        params: {
          vs_currency: currency,
          search: search // Keep the search parameter for API filtering
        }
      });

      if (response.status !== 200) throw new Error('Failed to fetch coins');
      const data = response.data.data;

      // Additional client-side filtering if needed
      const searchTerm = search?.toLowerCase().trim();
      const filtered = searchTerm
        ? data.filter(coin =>
          coin.name?.toLowerCase().includes(searchTerm) ||
          coin.symbol?.toLowerCase().includes(searchTerm)
        )
        : data;

      setCoins(data);
      setFilteredCoins(filtered);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch coins');
      console.error('Error fetching coins:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currency, search]); // Include search in dependencies

  useEffect(() => {
    fetchCoins();
  }, [fetchCoins, currency, search]);

  const refreshCoins = useCallback(async () => {
    await fetchCoins();
  }, [fetchCoins]);

  const fetchCoin = useCallback(async (symbol: string) => {
    const response = await api.get(`/coins/${symbol}?vs_currency=${currency}&shouldFetch=true`);
    return response.data;
  }, [currency]);

  return (
    <CoinsContext.Provider
      value={{
        coins,
        filteredCoins,
        isLoading,
        error,
        refreshCoins,
        searchCoins,
        search,
        setSearch,
        fetchCoin,
      }}
    >
      {children}
    </CoinsContext.Provider>
  );
}

export function useCoins() {
  const context = useContext(CoinsContext);
  if (context === undefined) {
    throw new Error('useCoins must be used within a CoinsProvider');
  }
  return context;
} 