import { View, Dimensions } from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { slides } from '@/components/onboarding/slides';
import { DotsContainer, Dot, FooterContainer, MutedActionButton, MutedActionButtonText, NextActionButton, NextActionButtonText, BackgroundContainer } from '../styles/onboarding.styles';
import { useRouter } from 'expo-router';
import { ActionButton, ActionButtonText } from '../styles/index.styles';

const { width } = Dimensions.get('window');

const SlideFooter = ({ currentSlide, scrollRef }: { currentSlide: number, scrollRef: React.RefObject<Animated.ScrollView> }) => {
  const router = useRouter();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      scrollRef.current?.scrollTo({
        x: (currentSlide + 1) * width,
        animated: true,
      });
    }
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
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
        <ActionButtonText>Get Started</ActionButtonText>
      </ActionButton>
    </FooterContainer>
  );
}

export default function SlideScreen() {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const x = useSharedValue(0);
  const currentSlide = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
      currentSlide.value = Math.round(event.contentOffset.x / width);
    },
  });

  console.log(currentSlide.value, ' currentSlide');

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
      {currentSlide.value === slides.length - 1 ? <GetStartedFooter /> : <SlideFooter currentSlide={currentSlide.value} scrollRef={scrollRef} />}
    </BackgroundContainer>
  );
}

