import { useMemo } from "react";
import { CoinContainer, CoinImageContainer, CoinImage, CoinName, CoinPrice } from "./styles/coins.styles"
import { useCurrency } from "@/contexts/CurrencyContext";

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

export const Coin = ({ coin }: { coin: Coin }) => {
  const { currency } = useCurrency();

  const price = useMemo(() => {
    const config = currencyConfig[currency];
    const currentPrice = coin.current_price ?? 0;
    return currentPrice.toLocaleString(config.locale, {
      style: 'currency',
      currency: config.currency,
      minimumFractionDigits: 2,
    });
  }, [coin.current_price, currency]);

  return (
    <CoinContainer>
      <CoinImageContainer>
        <CoinImage source={coin.image_url ? { uri: coin.image_url } : require('@/assets/images/generic-cryptocurrency.svg')} />
        <CoinName style={{ color: coin.dominant_color }}>
          {coin.symbol ? coin.symbol.toUpperCase() : ''}
        </CoinName>
      </CoinImageContainer>
      <CoinPrice>≈ {price}</CoinPrice>
    </CoinContainer>
  )
}