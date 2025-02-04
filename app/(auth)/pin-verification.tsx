import styled from 'styled-components/native';
import { Alert } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { router } from 'expo-router';
import { SignUpPersonalInformationTitle } from '@/components/styles/signup.styles';
import PinVerificationForm from '@/components/pin-verification-form';


const Container = styled.View`
  flex: 1;
  padding: 24px;
  background-color: #fff;
`;

const Spacer = styled.View`
  margin-top: 100px;
  height: 20px;
`;

const SignOutText = styled.Text`
  color: red;

  margin-top: 20px;
  text-align: center;
`;

export default function PinVerification() {
  const { verifyPin, signOut } = useAuth();

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