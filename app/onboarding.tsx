import { useRouter } from 'expo-router';
import SlideScreen from '@/components/onboarding/slide-screen';
import { useOnboarding } from '../contexts/OnboardingContext';
import { useEffect } from 'react';

export default function OnboardingScreen() {
  const router = useRouter();
  const { isOnboardingComplete, isLoading } = useOnboarding();

  useEffect(() => {
    if (!isLoading && isOnboardingComplete) {
      router.replace('/signup');
    }
  }, [isLoading, isOnboardingComplete]);

  if (isLoading) {
    return null; // Or a loading spinner
  }

  return <SlideScreen />
}
