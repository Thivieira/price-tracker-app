import { useRouter } from 'expo-router';
import PhoneForm from '../../../components/signup/phone-form';
import { SignUpIndexContainer } from '@/components/styles/signup.styles';
import { useAuth } from '@/contexts/AuthContext';
import Toast from 'react-native-toast-message';

export default function SignUpPhone() {
  const router = useRouter();
  const { sendOtp } = useAuth();

  const handleNext = async (phone: string) => {
    try {
      const response = await sendOtp(phone);

      if (response.success) {
        router.push({
          pathname: '/(auth)/signup/phone-verification',
        });
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
      console.log(error, 'error');
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message
      });
    }
  };

  return (
    <SignUpIndexContainer>
      <PhoneForm onNext={handleNext} />
    </SignUpIndexContainer>
  );
}