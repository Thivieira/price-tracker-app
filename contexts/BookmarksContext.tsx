import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Coin } from '@/components/coin';
import Toast from 'react-native-toast-message';
import { useCurrency } from '@/contexts/CurrencyContext';
import { api } from './AuthContext';
import { useAuth } from './AuthContext';

type BookmarksContextType = {
  bookmarks: Coin[];
  addBookmark: (coin: Coin) => Promise<void>;
  removeBookmark: (symbol: string) => Promise<void>;
  isBookmarked: (symbol: string) => boolean;
};

const BookmarksContext = createContext<BookmarksContextType | undefined>(undefined);

export function BookmarksProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Coin[]>([]);
  const { currency } = useCurrency();
  const { isLoggedIn, isPinVerified } = useAuth();

  const updateBookmarkPrices = useCallback(async (currentBookmarks: Coin[]) => {
    try {
      const symbols = currentBookmarks.map(b => b.symbol);

      const promises = symbols.map(symbol =>
        api.get(`/coins/${symbol}`, {
          params: {
            vs_currency: currency,
            shouldFetch: true
          }
        })
      );

      const responses = await Promise.all(promises);
      const updatedCoins = responses.map(response => response.data.data);

      const updatedBookmarks = currentBookmarks.map(bookmark => {
        const updatedCoin = updatedCoins.find(coin => coin.symbol === bookmark.symbol);
        if (updatedCoin) {
          return {
            ...bookmark,
            current_price: updatedCoin.current_price,
            market_cap: updatedCoin.market_cap,
            high_24h: updatedCoin.high_24h,
            low_24h: updatedCoin.low_24h,
            high_7d: updatedCoin.high_7d,
            low_7d: updatedCoin.low_7d,
            ath: updatedCoin.ath,
            atl: updatedCoin.atl
          };
        }
        return bookmark;
      });

      setBookmarks(updatedBookmarks);
      await AsyncStorage.setItem('userBookmarks', JSON.stringify(updatedBookmarks));
    } catch (error) {
      console.error('Error updating bookmark prices:', error);
    }
  }, [currency]);

  const getBookmarksFromStorage = useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem('userBookmarks');
      if (value) {
        const parsedBookmarks = JSON.parse(value) as Coin[];
        setBookmarks(parsedBookmarks);
        if (parsedBookmarks.length > 0) {
          updateBookmarkPrices(parsedBookmarks);
        }
      }
    } catch (error) {
      console.error('Error retrieving bookmarks:', error);
      setBookmarks([]);
      await AsyncStorage.removeItem('userBookmarks');
    }
  }, [updateBookmarkPrices]);

  const addBookmark = useCallback(async (coin: Coin) => {
    try {
      const updatedBookmarks = [...bookmarks, coin];
      await AsyncStorage.setItem('userBookmarks', JSON.stringify(updatedBookmarks));
      setBookmarks(updatedBookmarks);
      Toast.show({
        type: 'success',
        text1: 'Added to bookmarks',
        text2: `${coin.symbol.toUpperCase()} has been added to your bookmarks`,
        autoHide: true,
        visibilityTime: 2000
      });
    } catch (error) {
      console.error('Error adding bookmark:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to add bookmark',
        autoHide: true,
        visibilityTime: 2000
      });
    }
  }, [bookmarks]);

  const removeBookmark = useCallback(async (symbol: string) => {
    try {
      const updatedBookmarks = bookmarks.filter(b => b.symbol !== symbol);
      await AsyncStorage.setItem('userBookmarks', JSON.stringify(updatedBookmarks));
      setBookmarks(updatedBookmarks);
      Toast.show({
        type: 'success',
        text1: 'Removed from bookmarks',
        text2: `${symbol.toUpperCase()} has been removed from your bookmarks`
      });
    } catch (error) {
      console.error('Error removing bookmark:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to remove bookmark'
      });
    }
  }, [bookmarks]);

  const isBookmarked = useCallback((symbol: string) => {
    return bookmarks.some(b => b.symbol === symbol);
  }, [bookmarks]);

  const contextValue = useMemo(() => ({
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
  }), [bookmarks, addBookmark, removeBookmark, isBookmarked]);

  useEffect(() => {
    if (isLoggedIn && isPinVerified) {
      getBookmarksFromStorage();
    } else {
      // Only clear from state, not storage
      setBookmarks([]);
    }
  }, [isLoggedIn, isPinVerified, getBookmarksFromStorage]);

  return (
    <BookmarksContext.Provider value={contextValue}>
      {children}
    </BookmarksContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarksContext);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarksProvider');
  }
  return context;
} 