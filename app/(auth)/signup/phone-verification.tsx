import { useState } from 'react';
import { View } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import VerificationForm from '../../../components/signup/verification-form';

export default function PhoneVerification() {
  const router = useRouter();
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = async (code: string) => {
    try {
      setIsSubmitting(true);
      // Verify code logic here

      router.push({
        pathname: '/(auth)/signup/personal-information',
        params: { phone, verificationCode: code }
      });
    } catch (error) {
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  // If no phone number is provided, redirect back to the first step
  if (!phone) {
    router.replace('/(auth)/signup');
    return null;
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <VerificationForm
        phone={phone}
        onNext={handleNext}
        isSubmitting={isSubmitting}
      />
    </View>
  );
}
