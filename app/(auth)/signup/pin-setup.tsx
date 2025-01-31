import styled from 'styled-components/native';
import PinSetupForm from '@/components/signup/pin-setup-form';
import { SignUpPersonalInformationTitle } from '@/components/styles/signup.styles';
import { SignUpPersonalInformationSubtitle } from '@/components/styles/signup.styles';
import { router } from 'expo-router';

const Container = styled.View`
  flex: 1;
  padding: 24px;
  background-color: #fff;
`;

export default function PinSetup() {
  const handlePinConfirm = (pin: string) => {
    // Handle PIN confirmation logic here
    console.log('PIN confirmed:', pin);
    router.push('/(tabs)');
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