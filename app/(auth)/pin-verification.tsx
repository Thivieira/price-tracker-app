import styled from 'styled-components/native';
import { Alert } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { router } from 'expo-router';
import { SignUpPersonalInformationTitle } from '@/components/styles/signup.styles';
import PinVerificationForm from '@/components/pin-verification-form';
import { useEffect } from 'react';


const Container = styled.View`
  flex: 1;
  padding: 24px;
  background-color: #fff;
`;

const Spacer = styled.View`
  margin-top: 100px;
  height: 20px;
`;

export default function PinVerification() {
  const { verifyPin, isPinVerified } = useAuth();

  useEffect(() => {
    if (isPinVerified) {
      router.push('/(tabs)');
    }
  }, [isPinVerified]);


  const handlePinConfirm = async (pin: string) => {
    const isValid = await verifyPin(pin);
    if (!isValid) {
      Alert.alert('Invalid PIN', 'Please try again');
      return;
    }
    router.push('/(tabs)');
  };

  return (
    <Container>
      <SignUpPersonalInformationTitle>
        Enter your PIN
      </SignUpPersonalInformationTitle>
      <Spacer />
      <PinVerificationForm onPinConfirm={handlePinConfirm} />
    </Container>


  );
} 