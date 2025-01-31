import styled from 'styled-components/native';
import PinSetupForm from '@/components/signup/pin-setup-form';

const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

export default function PinSetup() {
  const handlePinConfirm = (pin: string) => {
    // Handle PIN confirmation logic here
    console.log('PIN confirmed:', pin);
  };

  return (
    <Container>
      <PinSetupForm onPinConfirm={handlePinConfirm} />
    </Container>
  );
}