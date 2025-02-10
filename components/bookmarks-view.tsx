import { BookmarksCoinsContainer, BookmarksContainer, BookmarksSeeAll, BookmarksTextContainer, BookmarksTitle, BookmarksEmptyState } from "./styles/bookmarks.styles";
import { useBookmarks } from "../contexts/BookmarksContext";
import { Coin } from "./coin";

export default function BookmarksView() {
  const { bookmarks } = useBookmarks();

  // limit view to like 5

  const limitedBookmarks = bookmarks.slice(0, 5);

  return (
    <BookmarksContainer>
      <BookmarksTextContainer>
        <BookmarksTitle>Bookmarks</BookmarksTitle>
        {bookmarks.length > 5 && <BookmarksSeeAll>See all</BookmarksSeeAll>}
      </BookmarksTextContainer>
      <BookmarksCoinsContainer>
        {limitedBookmarks.length === 0 ? (
          <BookmarksEmptyState />
        ) : (
          limitedBookmarks.map((bookmark) => (
            <Coin key={bookmark.id} />
          ))
        )}
      </BookmarksCoinsContainer>
    </BookmarksContainer>
  );
}