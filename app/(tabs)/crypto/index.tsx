import SearchBar from '@/components/search-bar';
import { ScreenContainer, CryptoPageTitleText, CryptoPageTitleContainer, Spacer, CryptoScreenSpacer } from '@/components/styles/tabs.styles';
import CoinList from '@/components/coin-list';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { useCoins } from '@/contexts/CoinsContext';
import { GoBackButton } from '@/components/styles/signup.styles';

export default function CryptoIndex() {
  const { search } = useLocalSearchParams();
  const { searchCoins, setSearch } = useCoins();

  useEffect(() => {
    if (typeof search === 'string') {
      searchCoins(search);
    }
  }, [search, searchCoins]);

  return (
    <ScreenContainer>
      <CryptoPageTitleContainer>
        <GoBackButton onPress={() => {
          setSearch('')
          router.back()
        }} />
        <CryptoPageTitleText>
          Search for a coin
        </CryptoPageTitleText>
      </CryptoPageTitleContainer>
      <SearchBar />
      <CoinList />
    </ScreenContainer>
  );
}