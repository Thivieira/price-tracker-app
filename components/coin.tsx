import { useMemo } from "react";
import { CoinContainer, CoinImageContainer, CoinImage, CoinName, CoinPrice } from "./styles/coins.styles"
import { useCurrency } from "@/contexts/CurrencyContext";
import Color from 'color';
import { router } from "expo-router";
import { useFormattedPrice } from "@/hooks/useFormattedPrice";

export type Coin = {
  id: number;
  image_url: string;
  name: string;
  symbol: string;
  dominant_color: string;
  current_price: number;
  updated_at: string;
  created_at: string;
  deleted_at: string | null;
}

const currencyConfig = {
  USD: {
    locale: 'en-US',
    currency: 'USD',
  },
  BRL: {
    locale: 'pt-BR',
    currency: 'BRL',
  },
};

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