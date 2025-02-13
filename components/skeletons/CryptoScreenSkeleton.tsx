import { View, Animated } from "react-native";
import { styled } from "styled-components/native";
import { CryptoPageTitleContainer, ScreenContainer } from "@/components/styles/tabs.styles";
import { useEffect } from "react";

const SkeletonView = styled(Animated.View)`
  background-color: #e5e7eb;
`;

export function CryptoScreenSkeleton() {
  const opacity = new Animated.Value(0.4);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.8,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, []);

  return (
    <ScreenContainer>
      <CryptoPageTitleContainer>
        {/* Back button skeleton */}
        <SkeletonView
          style={[
            { opacity, width: 40, height: 40, borderRadius: 20 }
          ]}
        />

        {/* Title container skeleton */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <SkeletonView
            style={[
              { opacity, width: 48, height: 48, borderRadius: 24 }
            ]}
          />
          <SkeletonView
            style={[
              { opacity, width: 96, height: 24, borderRadius: 6 }
            ]}
          />
        </View>

        {/* Favorite button skeleton */}
        <SkeletonView
          style={[
            { opacity, width: 40, height: 40, borderRadius: 20 }
          ]}
        />
      </CryptoPageTitleContainer>

      {/* Price list skeletons */}
      <View style={{ marginTop: 24, paddingHorizontal: 16 }}>
        {[...Array(6)].map((_, index) => (
          <SkeletonView
            key={index}
            style={[
              {
                opacity,
                height: 64,
                marginBottom: 8,
                borderRadius: 8,
                backgroundColor: index % 2 === 0 ? '#e5e7eb' : '#f3f4f6',
              }
            ]}
          />
        ))}
      </View>
    </ScreenContainer>
  );
} 