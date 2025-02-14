import { router, useLocalSearchParams } from "expo-router";
import { BackgroundImage, CryptoScreenSpacer, ExchangeBtn } from "@/components/styles/tabs.styles";
import { ScreenContainer } from "@/components/styles/tabs.styles";
import { TitleText, TitleSection } from "@/components/styles/crypto-symbol-screen.styles";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useState } from "react";
import { useCoins } from "@/contexts/CoinsContext";
import { Coin } from "@/components/coin";
import { formatPrice, useFormattedPrice } from "@/hooks/useFormattedPrice";
import { useCurrency } from "@/contexts/CurrencyContext";
import { TextPrice } from "@/components/text-price";
import { FlatList, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { CryptoScreenSkeleton } from "@/components/skeletons/CryptoScreenSkeleton";
import { useBookmarks } from '@/contexts/BookmarksContext';
import SymbolTitleContainer from "@/components/symbol-title-container";

export default function CryptoScreen() {
  const { symbol } = useLocalSearchParams();
  const { fetchCoin } = useCoins();
  const { currency } = useCurrency();
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();

  const mountedRef = useRef(true);
  const [coin, setCoin] = useState<Coin | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const UPPERCASE_SYMBOL = useMemo(() =>
    typeof symbol === 'string' ? symbol.toUpperCase() : '',
    [symbol]
  );

  const price = useMemo(() =>
    formatPrice(coin?.current_price, currency),
    [coin?.current_price, currency]
  );

  const isBookmarked = useMemo(() =>
    bookmarks.some(bookmark => bookmark.symbol === symbol),
    [bookmarks, symbol]
  );

  const handleFavoritePress = useCallback(() => {
    if (!coin) return;

    if (isBookmarked) {
      removeBookmark(symbol as string);
    } else {
      addBookmark(coin);
    }
  }, [coin, symbol, isBookmarked, removeBookmark, addBookmark]);

  const loadCoin = useCallback(async () => {
    if (!symbol) return;

    try {
      setIsLoading(true);
      const response = await fetchCoin(symbol.toString());
      if (mountedRef.current) {
        setCoin(response.data);
      }
    } catch (err) {
      if (mountedRef.current) {
        setError(err instanceof Error ? err.message : 'Failed to fetch coin');
      }
    } finally {
      if (mountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [symbol, fetchCoin]);

  useEffect(() => {
    mountedRef.current = true;
    loadCoin();
    return () => { mountedRef.current = false; };
  }, [loadCoin]);

  const handleExchange = useCallback(() => {
    if (symbol) {
      router.push(`/(tabs)/exchange?from=${symbol}&to=usdt`);
    }
  }, [symbol]);

  const textPriceData = useMemo(() => {
    if (!coin) return [];

    // Destructure once for all usages
    const {
      current_price,
      market_cap,
      low_24h,
      high_24h,
      low_7d,
      high_7d,
      ath,
      atl
    } = coin;

    return [
      { label: "Price", price: current_price ?? 0 },
      { label: "Market Cap", price: market_cap ?? 0 },
      {
        label: "24h Range",
        price: `${formatPrice(low_24h, currency)} - ${formatPrice(high_24h, currency)}`,
        removePriceFormat: true
      },
      {
        label: "7d Range",
        price: `${formatPrice(low_7d, currency)} - ${formatPrice(high_7d, currency)}`,
        removePriceFormat: true
      },
      { label: "All-Time High", price: ath?.price ?? 0 },
      { label: "All-Time Low", price: atl?.price ?? 0 },
    ];
  }, [coin, currency]);  // Only depend on coin and currency


  if (!symbol) {
    return (
      <ScreenContainer>
        <Text>Invalid cryptocurrency symbol</Text>
      </ScreenContainer>
    );
  }

  if (isLoading || !coin) {
    return <CryptoScreenSkeleton />;
  }

  if (error) {
    return (
      <ScreenContainer>
        <Text>Error loading coin: {error}</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <BackgroundImage
        source={require('@/assets/images/tabs/top.svg')}
        contentFit="contain"
        cachePolicy="memory-disk"
      />
      <SymbolTitleContainer
        coin={coin}
        symbol={symbol as string}
        price={price}
        handleFavoritePress={handleFavoritePress}
        isBookmarked={isBookmarked}
        UPPERCASE_SYMBOL={UPPERCASE_SYMBOL}
      />
      <TitleSection>
        <TitleText>{UPPERCASE_SYMBOL} Historical Price</TitleText>
      </TitleSection>
      <SafeAreaProvider>
        <SafeAreaView>
          <FlatList
            data={textPriceData}
            renderItem={({ item, index }) => (
              <TextPrice
                key={index}
                label={item.label}
                price={item.price}
                removePriceFormat={item.removePriceFormat}
                isEven={index % 2 === 0}
              />
            )}
            keyExtractor={(item) => `${item.label}-${item.price}`}
            contentContainerStyle={{ paddingBottom: 50 }}
          />
        </SafeAreaView>
      </SafeAreaProvider>
      <CryptoScreenSpacer />
      <ExchangeBtn onPress={handleExchange} />
    </ScreenContainer>
  );
}