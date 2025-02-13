import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Coin } from '@/components/coin';
import Toast from 'react-native-toast-message';

type BookmarksContextType = {
  bookmarks: Coin[];
  addBookmark: (coin: Coin) => Promise<void>;
  removeBookmark: (symbol: string) => Promise<void>;
  isBookmarked: (symbol: string) => boolean;
};

const BookmarksContext = createContext<BookmarksContextType | undefined>(undefined);

export function BookmarksProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Coin[]>([]);

  useEffect(() => {
    getBookmarksFromStorage();
  }, []);

  const getBookmarksFromStorage = useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem('bookmarksComplete');
      if (value) {
        const parsedBookmarks = JSON.parse(value) as Coin[];
        setBookmarks(parsedBookmarks);
      }
    } catch (error) {
      console.error('Error checking bookmarks status:', error);
    }
  }, []);

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