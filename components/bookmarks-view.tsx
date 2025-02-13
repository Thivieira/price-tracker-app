import { BookmarksCoinsContainer, BookmarksContainer, BookmarksSeeAll, BookmarksTextContainer, BookmarksTitle, BookmarksEmptyState } from "./styles/bookmarks.styles";
import { useBookmarks } from "../contexts/BookmarksContext";
import { Coin } from "./coin";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { CryptoScreenSkeleton } from "./skeletons/CryptoScreenSkeleton";

export default function BookmarksView({ limitView = false }: { limitView?: boolean }) {
  const { bookmarks } = useBookmarks();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for smoother UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <CryptoScreenSkeleton />;
  }

  const filtered = limitView ? bookmarks.slice(0, 5) : bookmarks;

  return (
    <BookmarksContainer>
      <BookmarksTextContainer>
        <BookmarksTitle>Bookmarks</BookmarksTitle>
        {bookmarks.length > 5 && limitView && (
          <BookmarksSeeAll onPress={() => {
            router.push('/crypto/bookmarks');
          }}>See all</BookmarksSeeAll>
        )}
      </BookmarksTextContainer>
      <BookmarksCoinsContainer>
        {filtered.length === 0 ? (
          <BookmarksEmptyState />
        ) : (
          filtered.map((bookmark, index) => (
            <Coin key={bookmark.id} coin={bookmark} isEven={index % 2 === 0} />
          ))
        )}
      </BookmarksCoinsContainer>
    </BookmarksContainer>
  );
}