import SearchBar from '@/components/search-bar';
import { BackgroundImage, CryptoScreenSpacer, ExchangeBtn, ScreenContainer, TitleText } from '@/components/styles/tabs.styles';
import BookmarksView from '@/components/bookmarks-view';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';

export default function TabOneScreen() {
  const { user } = useAuth();

  const handleExchange = () => {
    router.push('/(tabs)/exchange');
  }

  return (
    <ScreenContainer>
      <BackgroundImage
        source={require('@/assets/images/tabs/top.svg')}
        contentFit="contain"
      />
      <TitleText>
        Welcome, {user?.username}
      </TitleText>
      <CryptoScreenSpacer />
      <SearchBar />
      <CryptoScreenSpacer marginTop="24px" />
      <BookmarksView limitView={true} />
      <ExchangeBtn onPress={handleExchange} />
    </ScreenContainer>
  );
}