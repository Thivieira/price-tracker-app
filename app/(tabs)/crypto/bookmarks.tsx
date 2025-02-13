import { ScreenContainer, CryptoPageTitleText, CryptoPageTitleContainer } from '@/components/styles/tabs.styles';
import { router } from 'expo-router';
import { GoBackButton } from '@/components/styles/signup.styles';
import BookmarksView from '@/components/bookmarks-view';

export default function BookmarksScreen() {

  return (
    <ScreenContainer>
      <CryptoPageTitleContainer>
        <GoBackButton onPress={() => {
          router.back()
        }} />
        <CryptoPageTitleText>
          Tokens
        </CryptoPageTitleText>
      </CryptoPageTitleContainer>
      <BookmarksView />
    </ScreenContainer>
  );
}