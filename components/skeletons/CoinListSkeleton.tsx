import { View } from "react-native";
import { styled } from "styled-components/native";
import Animated, { withRepeat, withTiming, useAnimatedStyle, useSharedValue, withSequence } from 'react-native-reanimated';
import { useEffect } from "react";

const SkeletonItem = styled(Animated.View)`
  width: 100%;
  height: 80px;
  background-color: #F1F3FA;
  border-radius: 12px;
  margin-bottom: 12px;
`;

export function CoinListSkeleton() {
  const opacity = useSharedValue(0.3);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 1000 }),
        withTiming(0.3, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  return (
    <View style={{ padding: 16 }}>
      {[...Array(6)].map((_, index) => (
        <SkeletonItem key={index} style={animatedStyle} />
      ))}
    </View>
  );
} 