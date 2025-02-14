import { BookmarksContainer, BookmarksSeeAll, BookmarksTextContainer, BookmarksTitle, BookmarksEmptyState, BookmarksContainerSpacer } from "./styles/bookmarks.styles";
import { useBookmarks } from "../contexts/BookmarksContext";
import { Coin } from "./coin";
import { router } from "expo-router";
import { useState, useEffect, Fragment } from "react";
import { CryptoScreenSkeleton } from "./skeletons/CryptoScreenSkeleton";
import { FlatList } from "react-native";

export default function BookmarksView({ showHeader = true, limitView = false }: { showHeader?: boolean, limitView?: boolean }) {
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
        {showHeader && <Fragment>
          <BookmarksTitle>Bookmarks</BookmarksTitle>
          <BookmarksContainerSpacer />
        </Fragment>}
        {bookmarks.length > 0 && limitView && (
          <BookmarksSeeAll onPress={() => {
            router.push('/crypto/bookmarks');
          }}>See all</BookmarksSeeAll>
        )}
      </BookmarksTextContainer>
      {filtered.length === 0 ? (
        <BookmarksEmptyState />
      ) : (
        <FlatList
          data={filtered}
          renderItem={({ item, index }) => (
            <Coin key={item.id} coin={item} isEven={index % 2 === 0} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </BookmarksContainer>
  );
}