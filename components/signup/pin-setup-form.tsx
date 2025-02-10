import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
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
} from '../styles/pin.styles';

interface PinSetupFormProps {
  onPinConfirm?: (pin: string) => void;
}

export default function PinSetupForm({ onPinConfirm }: PinSetupFormProps) {
  const [pin, setPin] = useState<string>('');
  const { setValue, trigger } = useFormContext();

  const handleNumberPress = async (num: string) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      setValue('pin', newPin);

      // Validate immediately if we've reached 4 digits
      if (newPin.length === 4) {
        await trigger('pin');
      }
    }
  };

  const handleBackspace = () => {
    const newPin = pin.slice(0, -1);
    setPin(newPin);
    setValue('pin', newPin);
  };

  const handleReset = () => {
    setPin('');
    setValue('pin', '');
  };

  const handleConfirm = async () => {
    if (pin.length === 4) {
      const isValid = await trigger('pin');
      if (isValid) {
        onPinConfirm?.(pin);
      }
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
