import { useRouter } from 'expo-router';
import SlideScreen from '@/components/onboarding/slide-screen';
import { useOnboarding } from '../contexts/OnboardingContext';

export default function OnboardingScreen() {
  const router = useRouter();
  const { isOnboardingComplete, isLoading } = useOnboarding();

  if (isLoading) {
    return null; // Or a loading spinner
  }

  if (isOnboardingComplete) {
    router.replace('/(tabs)');
    return null;
  }

  return <SlideScreen />

}
