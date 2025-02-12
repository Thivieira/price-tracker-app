import SearchBar from '@/components/search-bar';
import { ScreenContainer, CryptoPageTitleText, CryptoPageTitleContainer } from '@/components/styles/tabs.styles';
import CoinList from '@/components/coin-list';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { useCoins } from '@/contexts/CoinsContext';
import { ProgressBarContainer } from '@/components/styles/common.styles';
import { GoBackButton } from '@/components/styles/signup.styles';

export default function CryptoIndex() {
  const { search } = useLocalSearchParams();
  const { searchCoins } = useCoins();

  useEffect(() => {
    if (typeof search === 'string') {
      searchCoins(search);
    }
  }, [search, searchCoins]);

  return (
    <ScreenContainer>
      <CryptoPageTitleContainer>
        <GoBackButton onPress={() => router.back()} />
        <CryptoPageTitleText>
          Search for a coin
        </CryptoPageTitleText>
      </CryptoPageTitleContainer>
      <SearchBar />
      <CoinList />
    </ScreenContainer>
  );
}