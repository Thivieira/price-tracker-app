import { useMemo } from "react";
import { CoinContainer, CoinImageContainer, CoinImage, CoinName, CoinPrice } from "./styles/coins.styles"
import { useCurrency } from "@/contexts/CurrencyContext";
import Color from 'color';
import { router } from "expo-router";
import { useFormattedPrice } from "@/hooks/useFormattedPrice";

export type Coin = {
  ath: { price: number, timestamp: string };
  atl: { price: number, timestamp: string };
  current_price: number;
  dominant_color: string;
  high_24h: number;
  high_7d: number;
  id: string;
  image_url: string;
  low_24h: number;
  low_7d: number;
  market_cap: number;
  name: string;
  symbol: string;
}

const adjustColorBrightness = (color: string): string => {
  try {
    const colorObj = Color(color);
    const brightness = colorObj.luminosity();

    // If color is too bright (luminosity > 0.7), darken it
    if (brightness > 0.7) {
      return colorObj.darken(0.5).hex();
    }

    return color;
  } catch (e) {
    // Fallback to default color if parsing fails
    return '#000';
  }
};

export const Coin = ({ coin, isEven }: { coin: Coin; isEven: boolean }) => {
  const { currency } = useCurrency();

  const adjustedColor = useMemo(() => {
    return adjustColorBrightness(coin.dominant_color);
  }, [coin.dominant_color]);

  const price = useFormattedPrice(coin.current_price, currency);

  return (
    <CoinContainer isEven={isEven} onPress={() => {
      router.push(`/crypto/${coin.symbol}`);
    }}>
      <CoinImageContainer>
        <CoinImage source={coin.image_url ? { uri: coin.image_url } : require('@/assets/images/generic-cryptocurrency.svg')} />
        <CoinName style={{ color: adjustedColor }}>
          {coin.symbol ? coin.symbol.toUpperCase() : ''}
        </CoinName>
      </CoinImageContainer>
      <CoinPrice>≈ {price}</CoinPrice>
    </CoinContainer>
  )
}