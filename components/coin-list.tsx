import { CoinListContainer, CoinEmptyState } from "./styles/coins.styles";
import { useCoins } from "../contexts/CoinsContext";
import { Coin } from "./coin";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { FlatList } from "react-native";
import { CoinListSkeleton } from "./skeletons/CoinListSkeleton";
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export default function CoinListView() {
  const { filteredCoins, isLoading } = useCoins();

  return (
    <CoinListContainer>
      <SafeAreaProvider>
        <SafeAreaView>
          {isLoading ? (
            <Animated.View
              entering={FadeIn.duration(150)}
              exiting={FadeOut.duration(150)}
            >
              <CoinListSkeleton />
            </Animated.View>
          ) : (
            <Animated.View
              entering={FadeIn.duration(150)}
              exiting={FadeOut.duration(150)}
            >
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
                  initialNumToRender={10}
                  maxToRenderPerBatch={10}
                  windowSize={10}
                  removeClippedSubviews={true}
                />
              )}
            </Animated.View>
          )}
        </SafeAreaView>
      </SafeAreaProvider>
    </CoinListContainer>
  );
}