import { router, useLocalSearchParams } from "expo-router";
import { BackgroundImage, CryptoPageTitleContainer, CryptoScreenSpacer, ExchangeBtn } from "@/components/styles/tabs.styles";
import { ScreenContainer } from "@/components/styles/tabs.styles";
import { CryptoSymbolScreenTitleText, CoinPrice, CoinImage, FavoriteButton, TitleText, TitleSection } from "@/components/styles/crypto-symbol-screen.styles";
import { GoBackButton } from "@/components/styles/signup.styles";
import { useEffect, useMemo } from "react";
import { useState } from "react";
import { useCoins } from "@/contexts/CoinsContext";
import { Coin } from "@/components/coin";
import { useFormattedPrice } from "@/hooks/useFormattedPrice";
import { useCurrency } from "@/contexts/CurrencyContext";
import { CryptoSymbolScreenTitleContainer } from "@/components/styles/crypto-symbol-screen.styles";
import { TextPrice } from "@/components/text-price";
import { FlatList, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { CryptoScreenSkeleton } from "@/components/skeletons/CryptoScreenSkeleton";
import { useBookmarks } from '@/contexts/BookmarksContext';

export default function CryptoScreen() {
  const { symbol } = useLocalSearchParams();
  const { fetchCoin } = useCoins();
  const [coin, setCoin] = useState<Coin | null>(null);
  const { currency } = useCurrency();
  const price = useFormattedPrice(coin?.current_price, currency);
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();

  const sevenDaysLow = useFormattedPrice(coin?.low_7d, currency);
  const sevenDaysHigh = useFormattedPrice(coin?.high_7d, currency);
  const twentyFourHourLow = useFormattedPrice(coin?.low_24h, currency);
  const twentyFourHourHigh = useFormattedPrice(coin?.high_24h, currency);

  useEffect(() => {
    fetchCoin(symbol as string).then((coin) => {
      setCoin(coin.data);
    });
  }, [fetchCoin, symbol]);

  const textPriceData = useMemo(() => {
    if (!coin) {
      return [];
    }

    return [
      {
        label: "Price",
        price: coin.current_price
      },
      {
        label: "Market Cap",
        price: coin.market_cap
      },
      {
        label: "24h Range",
        price: `${twentyFourHourLow} - ${twentyFourHourHigh}`,
        removePriceFormat: true
      },
      {
        label: "7d Range",
        price: `${sevenDaysLow} - ${sevenDaysHigh}`,
        removePriceFormat: true
      },
      {
        label: "All-Time High",
        price: coin.ath.price
      },
      {
        label: "All-Time Low",
        price: coin.atl.price
      },
    ];
  }, [coin, sevenDaysLow, sevenDaysHigh, twentyFourHourLow, twentyFourHourHigh]);

  if (!coin) {
    return <CryptoScreenSkeleton />
  }

  const UPPERCASE_SYMBOL = symbol?.toString().toUpperCase();

  console.log("coin", coin)

  const handleExchange = () => {
    router.push('/(tabs)/exchange?from=' + symbol + '&to=' + 'BTC');
  };

  const handleFavoritePress = async () => {
    try {
      if (isBookmarked(symbol as string)) {
        await removeBookmark(symbol as string);
      } else {
        await addBookmark(coin!);
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  return (
    <ScreenContainer>
      <BackgroundImage
        source={require('@/assets/images/tabs/top.svg')}
        contentFit="contain"
      />
      <CryptoPageTitleContainer>
        <GoBackButton tintColor="#ffffff" onPress={() => {
          router.back()
        }} />
        <CryptoSymbolScreenTitleContainer>
          <CoinImage source={coin?.image_url ? { uri: coin.image_url } : require('@/assets/images/generic-cryptocurrency.svg')} />
          <CryptoSymbolScreenTitleText>
            {UPPERCASE_SYMBOL}
          </CryptoSymbolScreenTitleText>
          <CoinPrice>{price}</CoinPrice>
        </CryptoSymbolScreenTitleContainer>
        <FavoriteButton
          onPress={handleFavoritePress}
          isFavorite={isBookmarked(symbol as string)}
        />
      </CryptoPageTitleContainer>
      <TitleSection>
        <TitleText>{UPPERCASE_SYMBOL} Historical Price</TitleText>
      </TitleSection>
      <SafeAreaProvider>
        <SafeAreaView>
          <FlatList
            data={textPriceData}
            renderItem={({ item, index }) => (
              <TextPrice key={index} label={item.label} price={item.price} removePriceFormat={item.removePriceFormat} isEven={index % 2 === 0} />
            )}
            keyExtractor={(item) => `${item.label}-${item.price}`}
            contentContainerStyle={{ paddingBottom: 50 }}
          />
        </SafeAreaView>
      </SafeAreaProvider>
      <CryptoScreenSpacer />
      <ExchangeBtn onPress={handleExchange} />
    </ScreenContainer>
  )
}

