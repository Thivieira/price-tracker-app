import SearchBar from '@/components/search-bar';
import { ScreenContainer, TitleText } from '@/components/styles/tabs.styles';
import CoinList from '@/components/coin-list';
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { useCoins } from '@/contexts/CoinsContext';

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
      <TitleText>
        Search for a coin
      </TitleText>
      <SearchBar />
      <CoinList />
    </ScreenContainer>
  );
}