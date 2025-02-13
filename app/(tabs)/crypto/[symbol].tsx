import { router, useLocalSearchParams } from "expo-router";
import { BackgroundImage, CryptoPageTitleContainer, CryptoPageTitleText, CryptoScreenSpacer, ExchangeBtn, TitleText } from "@/components/styles/tabs.styles";
import { ScreenContainer } from "@/components/styles/tabs.styles";

import { GoBackButton } from "@/components/styles/signup.styles";
import { CoinImage, CoinPrice } from "@/components/styles/coins.styles";
import { useEffect } from "react";
import { useState } from "react";
import { useCoins } from "@/contexts/CoinsContext";
import { Coin } from "@/components/coin";
import { useFormattedPrice } from "@/hooks/useFormattedPrice";
import { useCurrency } from "@/contexts/CurrencyContext";
import { CryptoSymbolScreenTitleContainer } from "@/components/styles/crypto-symbol-screen.styles";

export default function CryptoScreen() {
  const { symbol } = useLocalSearchParams();
  const { fetchCoin } = useCoins();
  const [coin, setCoin] = useState<Coin | null>(null);
  const { currency } = useCurrency();
  const price = useFormattedPrice(coin?.current_price, currency);

  console.log("coin", coin);

  useEffect(() => {
    fetchCoin(symbol as string).then((coin) => {
      setCoin(coin);
    });
  }, [fetchCoin, symbol]);

  return (
    <ScreenContainer>
      <BackgroundImage
        source={require('@/assets/images/tabs/top.svg')}
        contentFit="contain"
      />
      <CryptoPageTitleContainer>
        <GoBackButton onPress={() => {
          router.back()
        }} />
        <CryptoSymbolScreenTitleContainer>
          <CoinImage source={coin?.image_url ? { uri: coin.image_url } : require('@/assets/images/generic-cryptocurrency.svg')} />
          <CryptoPageTitleText>
            {symbol}
          </CryptoPageTitleText>
          <CoinPrice>{price}</CoinPrice>
        </CryptoSymbolScreenTitleContainer>
      </CryptoPageTitleContainer>
      <TitleText>
      </TitleText>
      <CryptoScreenSpacer />
    </ScreenContainer>
  )
}

