import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Coin } from '@/components/coin';
import Toast from 'react-native-toast-message';
import { useCurrency } from '@/contexts/CurrencyContext';
import { api } from './AuthContext';

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

  useEffect(() => {
    getBookmarksFromStorage();
  }, []);

  useEffect(() => {
    if (bookmarks.length > 0) {
      updateBookmarkPrices();
    }
  }, [currency]);

  const updateBookmarkPrices = useCallback(async () => {
    try {
      const symbols = bookmarks.map(b => b.symbol);

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

      const updatedBookmarks = bookmarks.map(bookmark => {
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
      await AsyncStorage.setItem('bookmarksComplete', JSON.stringify(updatedBookmarks));
    } catch (error) {
      console.error('Error updating bookmark prices:', error);
    }
  }, [bookmarks, currency]);

  const getBookmarksFromStorage = useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem('bookmarksComplete');
      if (value) {
        const parsedBookmarks = JSON.parse(value) as Coin[];
        setBookmarks(parsedBookmarks);
        if (parsedBookmarks.length > 0) {
          updateBookmarkPrices();
        }
      }
    } catch (error) {
      console.error('Error checking bookmarks status:', error);
    }
  }, [updateBookmarkPrices]);

  const addBookmark = useCallback(async (coin: Coin) => {
    try {
      const updatedBookmarks = [...bookmarks, coin];
      await AsyncStorage.setItem('bookmarksComplete', JSON.stringify(updatedBookmarks));
      setBookmarks(updatedBookmarks);
      Toast.show({
        type: 'success',
        text1: 'Added to bookmarks',
        text2: `${coin.symbol.toUpperCase()} has been added to your bookmarks`
      });
    } catch (error) {
      console.error('Error adding bookmark:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to add bookmark'
      });
    }
  }, [bookmarks]);

  const removeBookmark = useCallback(async (symbol: string) => {
    try {
      const updatedBookmarks = bookmarks.filter(b => b.symbol !== symbol);
      await AsyncStorage.setItem('bookmarksComplete', JSON.stringify(updatedBookmarks));
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

  return (
    <BookmarksContext.Provider
      value={{
        bookmarks,
        addBookmark,
        removeBookmark,
        isBookmarked,
      }}
    >
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