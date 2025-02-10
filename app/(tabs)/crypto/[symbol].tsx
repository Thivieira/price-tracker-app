import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function CryptoScreen() {
  const { symbol } = useLocalSearchParams();
  return (
    <View />
  )
}

