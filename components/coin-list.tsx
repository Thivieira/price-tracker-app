import { CoinListContainer, CoinEmptyState } from "./styles/coins.styles";
import { useCoins } from "../contexts/CoinsContext";
import { Coin } from "./coin";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { FlatList } from "react-native";

export default function CoinListView() {
  const { filteredCoins } = useCoins();

  return (
    <CoinListContainer>
      <SafeAreaProvider>
        <SafeAreaView>
          {filteredCoins.length === 0 ? (
            <CoinEmptyState />
          ) : (
            <FlatList
              data={filteredCoins}
              renderItem={({ item, index }) => (
                <Coin
                  key={item.symbol + "-" + item.id}
                  coin={item}
                  isEven={index % 2 === 0}
                />
              )}
              keyExtractor={(item) => `${item.symbol}-${item.id}`}
            />
          )}
        </SafeAreaView>
      </SafeAreaProvider>
    </CoinListContainer>
  );
}