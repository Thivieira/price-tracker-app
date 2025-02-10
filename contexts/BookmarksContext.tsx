import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Add a type for the bookmark structure
type Bookmark = {
  id: string;
  // Add other bookmark properties here
};

type BookmarksContextType = {
  bookmarks: Bookmark[];
  storeBookmarks: (value: Bookmark[]) => Promise<void>;
};

const BookmarksContext = createContext<BookmarksContextType | undefined>(undefined);

export function BookmarksProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    getBookmarksFromStorage();
  }, []);

  const getBookmarksFromStorage = useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem('bookmarksComplete');
      if (value) {
        const parsedBookmarks = JSON.parse(value) as Bookmark[];
        setBookmarks(parsedBookmarks);
      }
    } catch (error) {
      console.error('Error checking bookmarks status:', error);
    }
  }, []);

  const storeBookmarks = useCallback(async (value: Bookmark[]) => {
    try {
      await AsyncStorage.setItem('bookmarksComplete', JSON.stringify(value));
      setBookmarks(value);
    } catch (error) {
      console.error('Error setting bookmarks:', error);
    }
  }, []);

  return (
    <BookmarksContext.Provider
      value={{
        bookmarks,
        storeBookmarks,
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