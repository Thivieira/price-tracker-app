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

  const [coin, setCoin] = useState<Coin | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const UPPERCASE_SYMBOL = useMemo(() =>
    typeof symbol === 'string' ? symbol.toUpperCase() : '',
    [symbol]
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

  const price = useFormattedPrice(coin?.current_price, currency);

  const useDevLogging = () => {
    const renderCount = useRef(0);

    useEffect(() => {
      if (!__DEV__) return;

      renderCount.current += 1;
      console.log('Render count:', renderCount.current, 'triggered by:', {
        symbol,
        coin,
        currency,
        isLoading,
        error,
        timestamp: new Date().toISOString()
      });
    }, [symbol, coin, currency, isLoading, error]);

    useEffect(() => {
      if (!__DEV__) return;
      console.log('CryptoScreen mounted');
      return () => console.log('CryptoScreen unmounted');
    }, []);
  };

  if (__DEV__) {
    useDevLogging();
  }

  useEffect(() => {
    let mounted = true;

    const loadCoin = async () => {
      if (!symbol) return;

      try {
        setIsLoading(true);
        const response = await fetchCoin(symbol.toString());
        if (mounted) {
          setCoin(response.data);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch coin');
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadCoin();
    return () => { mounted = false; };
  }, [symbol, fetchCoin]);

  const handleExchange = useCallback(() => {
    if (symbol) {
      router.push(`/(tabs)/exchange?from=${symbol}&to=usdt`);
    }
  }, [symbol]);

  const priceData = useMemo(() => ({
    currentPrice: coin?.current_price,
    sevenDaysLow: coin?.low_7d,
    sevenDaysHigh: coin?.high_7d,
    twentyFourHourLow: coin?.low_24h,
    twentyFourHourHigh: coin?.high_24h,
    athPrice: coin?.ath?.price,
    atlPrice: coin?.atl?.price
  }), [coin]);

  const textPriceData = useMemo(() => {
    if (!coin) return [];
    return [
      {
        label: "Price",
        price: priceData.currentPrice ?? 0
      },
      {
        label: "Market Cap",
        price: coin.market_cap ?? 0
      },
      {
        label: "24h Range",
        price: `${formatPrice(priceData.twentyFourHourLow, currency)} - ${formatPrice(priceData.twentyFourHourHigh, currency)}`,
        removePriceFormat: true
      },
      {
        label: "7d Range",
        price: `${formatPrice(priceData.sevenDaysLow, currency)} - ${formatPrice(priceData.sevenDaysHigh, currency)}`,
        removePriceFormat: true
      },
      {
        label: "All-Time High",
        price: priceData.athPrice ?? 0
      },
      {
        label: "All-Time Low",
        price: priceData.atlPrice ?? 0
      },
    ];
  }, [priceData, coin?.market_cap, currency]);

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

