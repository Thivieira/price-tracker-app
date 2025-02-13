import { CoinListContainer, CoinEmptyState } from "./styles/coins.styles";
import { useCoins } from "../contexts/CoinsContext";
import { Coin } from "./coin";
import { ScrollIntoView } from "react-native-scroll-into-view";

export default function CoinListView() {
  const { filteredCoins } = useCoins();

  return (
    <CoinListContainer>
      <ScrollIntoView>
        {filteredCoins.length === 0 ? (
          <CoinEmptyState />
        ) : (
          filteredCoins.map((coin, index) => (
            <Coin
              key={coin.symbol + "-" + index}
              coin={coin}
              isEven={index % 2 === 0}
            />
          ))
        )}
      </ScrollIntoView>
    </CoinListContainer>
  );
}