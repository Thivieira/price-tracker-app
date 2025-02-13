import { BookmarksCoinsContainer, BookmarksContainer, BookmarksSeeAll, BookmarksTextContainer, BookmarksTitle, BookmarksEmptyState } from "./styles/bookmarks.styles";
import { useBookmarks } from "../contexts/BookmarksContext";
import { Coin } from "./coin";
import { router } from "expo-router";

export default function BookmarksView({ limitView = false }: { limitView?: boolean }) {
  const { bookmarks } = useBookmarks();

  const filtered = limitView ? bookmarks.slice(0, 5) : bookmarks;

  return (
    <BookmarksContainer>
      <BookmarksTextContainer>
        <BookmarksTitle>Bookmarks</BookmarksTitle>
        {bookmarks.length > 5 && <BookmarksSeeAll onPress={() => {
          router.push('/crypto/bookmarks');
        }}>See all</BookmarksSeeAll>}
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