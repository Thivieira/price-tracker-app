import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import styled from 'styled-components/native';
import colors from '@/constants/Colors';

interface PinSetupFormProps {
  onPinConfirm?: (pin: string) => void;
}

const Container = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const PinContainer = styled.View`
  flex-direction: row;
  gap: 12px;
  margin-bottom: 40px;
`;

const PinBox = styled.View<{ filled: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${props => props.filled ? colors.primary : '#ccc'};
  background-color: ${props => props.filled ? colors.primary : 'transparent'};
`;

const Numpad = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  max-width: 280px;
  margin-bottom: 40px;
`;

const NumButton = styled.TouchableOpacity`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: #f5f5f5;
  align-items: center;
  justify-content: center;
`;

const NumText = styled.Text`
  font-size: 24px;
  color: #333;
`;

const ConfirmButton = styled.TouchableOpacity<{ active: boolean }>`
  padding: 16px 32px;
  border-radius: 8px;
  width: 100%;
  align-items: center;
  background-color: ${props => props.active ? colors.primary : '#ccc'};
`;

const ConfirmButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

export default function PinSetupForm({ onPinConfirm }: PinSetupFormProps) {
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
        <NumButton onPress={handleReset}>
          <NumText>Reset</NumText>
        </NumButton>
        <NumButton onPress={() => handleNumberPress('0')}>
          <NumText>0</NumText>
        </NumButton>
        <NumButton onPress={handleBackspace}>
          <NumText>←</NumText>
        </NumButton>
      </Numpad>

      <ConfirmButton
        active={pin.length === 4}
        onPress={handleConfirm}
        disabled={pin.length !== 4}
      >
        <ConfirmButtonText>Set PIN</ConfirmButtonText>
      </ConfirmButton>
    </Container>
  );
}
