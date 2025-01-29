import React, { useRef, useState } from 'react';
import { type TextInput } from 'react-native';
import { VerificationFormTitle, VerificationFormContainer, VerificationFormSubtitle, VerificationFormUnitInput, VerificationFormUnitInputContainer, PhoneFormAlreadyHaveAccountLink, PhoneFormAlreadyHaveAccountLinkText } from '@/components/styles/signup.styles';
import { router } from 'expo-router';

interface VerificationFormProps {
  onComplete?: (code: string) => void;
  phone?: string;
}

const VerificationFormInput: React.FC<{ onComplete?: (code: string) => void }> = ({ onComplete }) => {
  const [code, setCode] = useState(['', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const inputRefs = useRef<(TextInput | null)[]>([null, null, null, null]);

  const handleChange = (text: string, index: number) => {
    // Handle pasting full code
    if (text.length > 1) {
      const digits = text.slice(0, 4).split('');
      setCode(digits.concat(Array(4 - digits.length).fill('')));
      digits.forEach((_, idx) => {
        if (idx < 3) {
          inputRefs.current[idx + 1]?.focus();
        }
      });
      if (onComplete) {
        onComplete(digits.join(''));
      }
      return;
    }

    const newCode = [...code];

    // If the input is empty (backspace was pressed)
    if (text === '') {
      newCode[index] = '';
      setCode(newCode);
      // Move to previous input if we're not at the first input
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      return;
    }

    // Handle single digit input
    newCode[index] = text;
    setCode(newCode);

    if (text !== '') {
      if (index < 3) {
        inputRefs.current[index + 1]?.focus();
      } else if (index === 3 && onComplete) {
        onComplete(newCode.join(''));
      }
    }
  };

  return (
    <VerificationFormUnitInputContainer>
      {code.map((digit, index) => (
        <VerificationFormUnitInput
          key={index}
          ref={ref => inputRefs.current[index] = ref}
          value={digit}
          onChangeText={text => handleChange(text, index)}
          maxLength={1}
          keyboardType="numeric"
          selectTextOnFocus
          autoFocus={index === 0}
          isFocused={focusedIndex === index}
          onFocus={() => setFocusedIndex(index)}
          onBlur={() => setFocusedIndex(-1)}
        />
      ))}
    </VerificationFormUnitInputContainer>
  );
};

export default function VerificationForm({ onComplete, phone }: VerificationFormProps) {

  const onResend = () => {
    console.log('Resend');
  };


  return (
    <VerificationFormContainer>
      <VerificationFormTitle>Enter 4-digit code</VerificationFormTitle>
      <VerificationFormSubtitle>
        We've sent the code to {phone ? `****${phone.slice(-3)}` : ''}
      </VerificationFormSubtitle>
      <VerificationFormInput onComplete={onComplete} />
      <PhoneFormAlreadyHaveAccountLink onPress={onResend}>
        <PhoneFormAlreadyHaveAccountLinkText>Resend</PhoneFormAlreadyHaveAccountLinkText>
      </PhoneFormAlreadyHaveAccountLink>
    </VerificationFormContainer>
  );
}