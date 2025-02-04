import { useState } from 'react';
import { Image } from 'expo-image';
import {
  ConfirmButtonText,
  ConfirmButton,
  Container,
  NumButton,
  Numpad,
  NumText,
  PinBox,
  PinContainer,
  DeleteIcon,
  ResetText
} from './styles/pin.styles';


interface PinVerificationFormProps {
  onPinConfirm?: (pin: string) => void;
}


export default function PinVerificationForm({ onPinConfirm }: PinVerificationFormProps) {
  const [pin, setPin] = useState<string>('');


  const handleNumberPress = (num: string) => {
    if (pin.length < 4) {
      setPin(prev => prev + num);
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
  };

  const handleReset = () => {
    setPin('');
  };

  const handleConfirm = () => {
    if (pin.length === 4) {
      onPinConfirm?.(pin);
    }
  };

  return (
    <Container>
      <PinContainer>
        {[...Array(4)].map((_, index) => (
          <PinBox key={index} filled={Boolean(pin[index])} />
        ))}
      </PinContainer>

      <Numpad>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <NumButton
            key={num}
            onPress={() => handleNumberPress(num.toString())}
          >
            <NumText>{num}</NumText>
          </NumButton>
        ))}
        <NumButton style={{ opacity: 0 }} disabled>
          <NumText></NumText>
        </NumButton>
        <NumButton onPress={() => handleNumberPress('0')}>
          <NumText>0</NumText>
        </NumButton>
        <NumButton onPress={handleBackspace}>
          <DeleteIcon
            source={require('@/assets/images/delete.svg')}
            contentFit="contain"
            onError={(error) => {
              console.error('Delete icon failed to load:', error);
            }}
          />
        </NumButton>
      </Numpad>
      <NumButton onPress={handleReset}>
        <ResetText>Reset</ResetText>
      </NumButton>

      <ConfirmButton
        active={pin.length === 4}
        onPress={handleConfirm}
        disabled={pin.length !== 4}
      >
        <ConfirmButtonText>Continue</ConfirmButtonText>
      </ConfirmButton>
    </Container>
  );
}
