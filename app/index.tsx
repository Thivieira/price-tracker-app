import { router } from 'expo-router';
import { useEffect } from 'react';
import { BackgroundContainer, TitleText, ButtonContainer, ActionButton, MutedActionButton, ImageContainer, MutedActionButtonText, ActionButtonText } from '../components/styles/index.styles';

export default function Page() {
  const onGetStarted = () => {
    router.push('/onboarding');
  }

  const onSignIn = () => {
    router.push('/signin');
  }

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const isAuthenticated = false;
        if (isAuthenticated) {
          router.replace('/(tabs)');
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      }
    };
    checkAuthStatus();
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