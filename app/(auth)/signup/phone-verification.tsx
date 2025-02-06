import { useRouter, useLocalSearchParams } from 'expo-router';
import VerificationForm from '../../../components/signup/verification-form';
import { SignUpPhoneVerificationContainer } from '@/components/styles/signup.styles';
import { useAuth } from '@/contexts/AuthContext';
import Toast from 'react-native-toast-message';
export default function PhoneVerification() {
  const router = useRouter();
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const { verifyOtp } = useAuth();

  const handleNext = async (code: string) => {
    try {
      const isVerified = await verifyOtp(phone, code);
      if (isVerified) {
        router.push({
          pathname: '/(auth)/signup/account',
          params: { phone, verificationCode: code }
        });
      } else {
        throw new Error('Invalid OTP.');
      }
    } catch (error) {
      console.error('Error:', error);

      Toast.show({
        type: 'error',
        text1: 'OTP',
        text2: 'Invalid OTP.'
      });
    };
  }

  return (
    <SignUpPhoneVerificationContainer>
      <VerificationForm
        phone={phone}
        onComplete={handleNext}
      />
    </SignUpPhoneVerificationContainer>

  );
}
