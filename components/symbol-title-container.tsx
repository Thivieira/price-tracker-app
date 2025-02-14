import { CoinImage } from "./styles/coins.styles";

import { CryptoSymbolScreenTitleText, CryptoSymbolScreenTitleContainer, CoinPrice, FavoriteButton } from "./styles/crypto-symbol-screen.styles";
import { router } from "expo-router";
import { GoBackButton } from "./styles/signup.styles";
import { Coin } from "./coin";
import { CryptoPageTitleContainer } from "./styles/tabs.styles";


export default function SymbolTitleContainer({
  coin,
  symbol,
  price,
  handleFavoritePress,
  isBookmarked,
  UPPERCASE_SYMBOL
}: {
  coin: Coin;
  symbol: string;
  price: string;
  handleFavoritePress: () => void;
  isBookmarked: boolean;
  UPPERCASE_SYMBOL: string;
}) {
  return (
    <CryptoPageTitleContainer>
      <GoBackButton tintColor="#ffffff" onPress={() => router.back()} />
      <CryptoSymbolScreenTitleContainer>
        <CoinImage
          source={coin?.image_url ? { uri: coin.image_url } : require('@/assets/images/generic-cryptocurrency.svg')}
          cachePolicy="memory-disk"
          style={{ width: 50, height: 50 }}
        />
        <CryptoSymbolScreenTitleText>
          {UPPERCASE_SYMBOL}
        </CryptoSymbolScreenTitleText>
        <CoinPrice>{price}</CoinPrice>
      </CryptoSymbolScreenTitleContainer>
      <FavoriteButton
        onPress={handleFavoritePress}
        isFavorite={isBookmarked}
      />
    </CryptoPageTitleContainer>
  )
}