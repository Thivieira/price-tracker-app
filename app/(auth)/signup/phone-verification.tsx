import { useState } from 'react';
import { View } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import VerificationForm from '../../../components/signup/verification-form';
import { SignUpPhoneVerificationContainer } from '@/components/styles/signup.styles';

export default function PhoneVerification() {
  const router = useRouter();
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const handleNext = async (code: string) => {
  //   try {
  //     setIsSubmitting(true);
  //     // Verify code logic here

  //     router.push({
  //       pathname: '/(auth)/signup/personal-information',
  //       params: { phone, verificationCode: code }
  //     });
  //   } catch (error) {
  //     // Handle error
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  // // If no phone number is provided, redirect back to the first step
  // if (!phone) {
  //   router.replace('/(auth)/signup');
  //   return null;
  // }



  const handleNext = (code: string) => {
    console.log(code);
  };

  return (
    <SignUpPhoneVerificationContainer>
      <VerificationForm
        phone={phone}
        onNext={handleNext}
        isSubmitting={isSubmitting}
      />
    </SignUpPhoneVerificationContainer>
  );
}
