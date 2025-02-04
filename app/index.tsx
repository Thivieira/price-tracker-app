import { router } from 'expo-router';
import { useEffect } from 'react';
import { BackgroundContainer, TitleText, ButtonContainer, ActionButton, MutedActionButton, ImageContainer, MutedActionButtonText, ActionButtonText } from '../components/styles/index.styles';
import { useOnboarding } from '@/contexts/OnboardingContext';

export default function Page() {
  const { setOnboardingComplete } = useOnboarding();

  const onGetStarted = () => {
    router.push('/onboarding');
  }

  const onSignIn = () => {
    router.push('/signin');
  }

  useEffect(() => {
    // if already logged in, go to tabs
    // router.replace('/(tabs)');

    // utility to clear onboarding complete
    // setOnboardingComplete(false);
  }, []);


  return (
    <BackgroundContainer>
      <TitleText>Track Crypto Prices</TitleText>
      <ImageContainer source={require('@/assets/images/onboarding/start-investing.svg')} contentFit="contain" />
      <ButtonContainer>
        <ActionButton onPress={onGetStarted}>
          <ActionButtonText>Get Started</ActionButtonText>
        </ActionButton>
        <MutedActionButton onPress={onSignIn}>
          <MutedActionButtonText>Sign In</MutedActionButtonText>
        </MutedActionButton>
      </ButtonContainer>
    </BackgroundContainer>
  )
}