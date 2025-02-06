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
    const isValid = await trigger('pin');
    if (!isValid) return;
    const formData = getValues();

    try {
      const signupData = {
        username: formData.username,
        first_name: formData.firstName,
        last_name: formData.lastName,
        // email: formData.email,
        phone: formData.phone,
        password: formData.password,
        password_confirmation: formData.password,
        birthdate: formData.birthDate,
        street_address: formData.streetAddress,
        unit_number: formData.complement,
        city: formData.city,

        region: formData.region,
        zip_code: formData.zipCode,
        raw_pin: pin
      }

      await signUp(signupData);
      console.log("FORM VALUES", formData);
      router.push('/(tabs)');

    } catch (error) {
      console.error('Error during signup:', error);
      console.log("FORM VALUES", formData);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to complete signup. Please try again.'
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