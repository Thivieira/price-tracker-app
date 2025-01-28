import { useState } from 'react';
import { View } from 'react-native';
import { Text } from "@/components/Themed";
import PhoneForm from '../../../components/signup/phone-form';
import VerificationForm from '../../../components/signup/verification-form';
import PersonalInfoForm from '../../../components/signup/personal-information-form';
import AddressForm from '../../../components/signup/address-form';
import PinSetupForm from '../../../components/signup/pin-setup-form';
import { useRouter } from 'expo-router';

type SignUpStep = 'phone' | 'verify' | 'personal' | 'address' | 'pin';

export default function SignUp() {
  const [currentStep, setCurrentStep] = useState<SignUpStep>('phone');
  const [formData, setFormData] = useState({
    phone: '',
    verificationCode: '',
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
    },
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
    pin: '',
  });
  const router = useRouter();

  const handleNextStep = (step: SignUpStep, data: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...data }));
    setCurrentStep(step);
  };

  const handleComplete = (pin: string) => {
    setFormData(prev => ({ ...prev, pin }));
    // Navigate to tabs page after successful signup
    router.replace('/(tabs)');
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {currentStep === 'phone' && (
        <PhoneForm
          onNext={(phone) => handleNextStep('verify', { phone })}
        />
      )}

      {currentStep === 'verify' && (
        <VerificationForm
          phone={formData.phone}
          onNext={(code) => handleNextStep('personal', { verificationCode: code })}
        />
      )}

      {currentStep === 'personal' && (
        <PersonalInfoForm
          onNext={(personalInfo) => handleNextStep('address', { personalInfo })}
        />
      )}

      {currentStep === 'address' && (
        <AddressForm
          onNext={(address) => handleNextStep('pin', { address })}
        />
      )}

      {currentStep === 'pin' && (
        <PinSetupForm
          onComplete={handleComplete}
        />
      )}
    </View>
  );
}