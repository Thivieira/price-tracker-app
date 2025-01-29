import { useRouter } from 'expo-router';
import PhoneForm from '../../../components/signup/phone-form';
import { SignUpIndexContainer } from '@/components/styles/signup.styles';

export default function SignUpPhone() {
  const router = useRouter();

  const handleNext = (phone: string) => {
    router.push({
      pathname: '/(auth)/signup/phone-verification',
      params: { phone }
    });
  };

  return (
    <SignUpIndexContainer>
      <PhoneForm onNext={handleNext} />
    </SignUpIndexContainer>
  );
}