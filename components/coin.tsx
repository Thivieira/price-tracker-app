
import { CoinContainer, CoinImage, CoinName } from "./styles/coins.styles"

export type Coin = {
  id: number;
  image_url: string;
  name: string;
  symbol: string;
  ath_date: string;
  ath_price: number;
  atl_date: string;
  atl_price: number;
  dominant_color: string;
  high_24h: number;
  high_7d: number;
  low_24h: number;
  low_7d: number;
  market_cap: number;
  updated_at: string;
  created_at: string;
  deleted_at: string | null;
}

// { "ath_date": "2025-01-23T14:52:15.951Z", "ath_price": 29.08, "atl_date": "2023-02-13T19:01:21.899Z", "atl_price": 3.06, "created_at": "2025-01-24T02:50:15.042Z", "deleted_at": null, "dominant_color": "#241c1c", "high_24h": 27.53, "high_7d": 28.4, "id": 40, "image_url": "https://coin-images.coingecko.com/coins/images/27045/large/wbt_token.png?1696526096", "low_24h": 27.05, "low_7d": 27.13, "market_cap": 3939155999, "name": "WhiteBIT Coin", "symbol": "wbt", "updated_at": "2025-02-10T00:35:03.706Z" }


export const Coin = ({ coin }: { coin: Coin }) => {
  return (
    <CoinContainer>
      <CoinImage source={coin.image_url ? { uri: coin.image_url } : require('@/assets/images/generic-cryptocurrency.svg')} />
      <CoinName>{coin.symbol.toUpperCase()}</CoinName>
    </CoinContainer>
  )

}