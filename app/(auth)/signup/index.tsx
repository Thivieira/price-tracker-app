import { useRouter } from 'expo-router';
import PhoneForm from '../../../components/signup/phone-form';
import { SignUpIndexContainer } from '@/components/styles/signup.styles';
import { useAuth } from '@/contexts/AuthContext';

export default function SignUpPhone() {
  const router = useRouter();
  const { sendOtp } = useAuth();

  const handleNext = async (phone: string) => {
    try {
      const response = await sendOtp(phone);
      console.log(response, 'response');
      router.push({
        pathname: '/(auth)/signup/phone-verification',


        params: { phone }
      });
    } catch (error) {
      console.log(error, 'error');
    }
  };

  return (
    <SignUpIndexContainer>
      <PhoneForm onNext={handleNext} />
    </SignUpIndexContainer>
  );
}