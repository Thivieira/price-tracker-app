import styled from 'styled-components/native';
import { useSignupWizard } from '@/contexts/SignupWizardContext';
import PinSetupForm from '@/components/signup/pin-setup-form';
import { SignUpPersonalInformationTitle, SignUpPersonalInformationSubtitle } from '@/components/styles/signup.styles';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import Toast from 'react-native-toast-message';

const Container = styled.View`
  flex: 1;
  padding: 24px;
  background-color: #fff;
`;

export default function PinSetup() {
  const { methods: { getValues, trigger } } = useSignupWizard();
  const { signUp } = useAuth();

  const handlePinConfirm = async (pin: string) => {
    try {
      const isValid = await trigger('pin');
      if (!isValid) return;

      const formData = getValues();

      // Validate required fields before submission
      const requiredFields = [
        'username', 'firstName', 'lastName', 'phone',
        'password', 'birthDate', 'streetAddress', 'city',
        'region', 'zipCode'
      ];

      const missingFields = requiredFields.filter(field => !formData[field]);
      if (missingFields.length > 0) {
        Toast.show({
          type: 'error',
          text1: 'Missing Information',
          text2: `Please fill in all required fields: ${missingFields.join(', ')}`
        });
        return;
      }

      const signupData = {
        username: formData.username,
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        password: formData.password,
        password_confirmation: formData.password,
        birthdate: formData.birthDate,
        street_address: formData.streetAddress,
        unit_number: formData.complement || '',
        city: formData.city,
        region: formData.region,
        zip_code: formData.zipCode,
        raw_pin: pin
      };

      await signUp(signupData);
      router.replace('/(tabs)');

    } catch (error) {
      console.error('Signup error:', error);
      Toast.show({
        type: 'error',
        text1: 'Signup Failed',
        text2: error instanceof Error ? error.message : 'An unexpected error occurred'
      });
    }
  };

  return (
    <Container>
      <SignUpPersonalInformationTitle>
        Create your PIN
      </SignUpPersonalInformationTitle>
      <SignUpPersonalInformationSubtitle>
        Create a four-digit passcode {'\n'}
        to secure your account
      </SignUpPersonalInformationSubtitle>
      <PinSetupForm onPinConfirm={handlePinConfirm} />
    </Container>
  );
}