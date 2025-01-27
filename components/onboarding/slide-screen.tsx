import { View, Dimensions } from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated';
import { slides } from '@/components/onboarding/slides';
import { DotsContainer, Dot, FooterContainer, MutedActionButton, MutedActionButtonText, NextActionButton, NextActionButtonText, BackgroundContainer } from '../styles/onboarding.styles';
import { useRouter } from 'expo-router';
import { ActionButton, ActionButtonText } from '../styles/index.styles';
import { useState } from 'react';

const { width } = Dimensions.get('window');

const SlideFooter = ({ currentSlide, scrollRef }: { currentSlide: number, scrollRef: React.RefObject<Animated.ScrollView> }) => {
  const router = useRouter();

  const handleDotPress = (index: number) => {
    scrollRef.current?.scrollTo({
      x: index * width,
      animated: true,
    });
  }

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      handleDotPress(currentSlide + 1);
    }
  };

  const handleSkip = () => {
    router.replace('/(auth)/signup');
  }

  return (
    <FooterContainer>
      <MutedActionButton onPress={handleSkip}>
        <MutedActionButtonText>Skip</MutedActionButtonText>
      </MutedActionButton>
      <DotsContainer>
        {slides.map((_, index) => (
          <Dot
            isActive={index === currentSlide}
            key={index}
            onPress={() => {
              handleDotPress(index);
            }}
          />
        ))}
      </DotsContainer>
      <NextActionButton onPress={handleNext}>
        <NextActionButtonText>Next</NextActionButtonText>
      </NextActionButton>
    </FooterContainer>
  )
};

const GetStartedFooter = () => {
  const router = useRouter();
  const handleGetStarted = () => {
    router.replace('/(auth)/signup');
  }

  return (
    <FooterContainer>
      <ActionButton onPress={handleGetStarted}>
        <ActionButtonText>Create Account</ActionButtonText>
      </ActionButton>
    </FooterContainer>
  );
}

export default function SlideScreen() {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const x = useSharedValue(0);
  const currentSlide = useSharedValue(0);
  const [slideIndex, setSlideIndex] = useState(0);

  useAnimatedReaction(
    () => currentSlide.value,
    (value) => {
      runOnJS(setSlideIndex)(value);
    }
  );

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
      currentSlide.value = Math.round(event.contentOffset.x / width);
    },
  });

  return (
    <BackgroundContainer>
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}>
        {slides.map((slide) => (
          <View style={{ width }} key={slide.id}>
            {slide.render()}
          </View>
        ))}
      </Animated.ScrollView>
      {slideIndex === slides.length - 1 ? (
        <GetStartedFooter />
      ) : (
        <SlideFooter currentSlide={slideIndex} scrollRef={scrollRef} />
      )}
    </BackgroundContainer>
  );
}

