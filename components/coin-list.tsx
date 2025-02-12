import { CoinListContainer, CoinEmptyState } from "./styles/coins.styles";
import { useCoins } from "../contexts/CoinsContext";
import { Coin } from "./coin";

export default function CoinListView() {
  const { filteredCoins } = useCoins();

  const limitedCoins = filteredCoins.slice(0, 5);

  return (
    <CoinListContainer>
      {limitedCoins.length === 0 ? (
        <CoinEmptyState />
      ) : (
        limitedCoins.map((coin) => (
          <Coin key={coin.symbol} coin={coin} />
        ))
      )}
    </CoinListContainer>
  );
}