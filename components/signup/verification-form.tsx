import React, { useRef, useState } from 'react';
import { type TextInput } from 'react-native';
import { VerificationFormTitle, VerificationFormContainer, VerificationFormSubtitle, VerificationFormUnitInput, VerificationFormUnitInputContainer, PhoneFormAlreadyHaveAccountLink, PhoneFormAlreadyHaveAccountLinkText, VerificationFormAlreadyHaveAccountLinkText, VerificationFormAlreadyHaveAccountLink } from '@/components/styles/signup.styles';
import { router } from 'expo-router';

interface VerificationFormProps {
  onComplete?: (code: string) => void;
  phone?: string;
}

const VerificationFormInput: React.FC<{ onComplete?: (code: string) => void }> = ({ onComplete }) => {
  const [code, setCode] = useState(['', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef<(TextInput | null)[]>([null, null, null, null]);

  const verifyCode = async (verificationCode: string) => {
    setIsVerifying(true);
    setError('');



    try {
      // // Replace this with your actual API call
      // const response = await fetch('/api/verify-code', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ code: verificationCode }),
      // });

      // if (response.ok) {
      //   router.push('/(auth)/signup/personal-information');
      // } else {
      //   setError('Invalid verification code');
      //   // Reset the code inputs
      //   setCode(['', '', '', '']);
      //   inputRefs.current[0]?.focus();
      // }
      onComplete?.(verificationCode);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handlePastedCode = (text: string) => {
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
  };

  const handleBackspace = (index: number) => {
    const newCode = [...code];
    newCode[index] = '';
    setCode(newCode);

    if (index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSingleDigit = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text !== '') {
      if (index < 3) {
        inputRefs.current[index + 1]?.focus();
      } else if (index === 3) {
        const completeCode = [...newCode.slice(0, 3), text].join('');
        if (onComplete) {
          onComplete(completeCode);
        }
        verifyCode(completeCode);
      }
    }
  };

  const handleChange = (text: string, index: number) => {
    if (text.length > 1) {
      handlePastedCode(text);
      return;
    }

    if (text === '') {
      handleBackspace(index);
      return;
    }

    handleSingleDigit(text, index);
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
      <VerificationFormAlreadyHaveAccountLink onPress={onResend}>
        <VerificationFormAlreadyHaveAccountLinkText>Resend</VerificationFormAlreadyHaveAccountLinkText>
      </VerificationFormAlreadyHaveAccountLink>
    </VerificationFormContainer>
  );
}