import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { api } from './AuthContext';

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
};


const CoinsContext = createContext<CoinsContextType | undefined>(undefined);

export function CoinsProvider({ children }: { children: React.ReactNode }) {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<Coin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');

  const searchCoins = useCallback((query: string) => {
    if (!query.trim()) {
      setFilteredCoins(coins);
      return;
    }

    const searchTerm = query.toLowerCase().trim();
    const filtered = coins.filter(coin =>
      coin.name.toLowerCase().includes(searchTerm) ||
      coin.symbol.toLowerCase().includes(searchTerm)
    );

    setFilteredCoins(filtered);
    setSearch(query);
  }, [coins]);


  const fetchCoins = useCallback(async (search: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const withSearch = search ? '?search=' + search : '';
      const response = await api.get('/coins' + withSearch);
      if (response.status !== 200) throw new Error('Failed to fetch coins');
      const data = response.data.data;




      setCoins(data);
      setFilteredCoins(data);


    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch coins');
      console.error('Error fetching coins:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCoins(search);
  }, [fetchCoins, search]);


  const refreshCoins = useCallback(async () => {
    await fetchCoins();
  }, [fetchCoins]);

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