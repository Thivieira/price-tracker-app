import React, { useRef, useState } from 'react';
import { type TextInput } from 'react-native';
import { VerificationFormTitle, VerificationFormContainer, VerificationFormSubtitle, VerificationFormUnitInput, VerificationFormUnitInputContainer, PhoneFormAlreadyHaveAccountLink, PhoneFormAlreadyHaveAccountLinkText, VerificationFormAlreadyHaveAccountLinkText, VerificationFormAlreadyHaveAccountLink } from '@/components/styles/signup.styles';
import { useAuth } from '@/contexts/AuthContext';
import Toast from 'react-native-toast-message';

interface VerificationFormProps {
  onComplete?: (code: string) => Promise<void>;
  phone: string;
}

const VerificationFormInput: React.FC<{ onComplete?: (code: string) => Promise<void> }> = ({ onComplete }) => {
  const [code, setCode] = useState(['', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const inputRefs = useRef<(TextInput | null)[]>([null, null, null, null]);

  const verifyCode = async (verificationCode: string) => {
    try {
      await onComplete?.(verificationCode);
    } catch (e) {
      setCode(['', '', '', '']);
      inputRefs.current[0]?.focus();
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

    if (verifyCode) {
      verifyCode(digits.join(''));
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
        if (verifyCode) {
          verifyCode(completeCode);
        }
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
          ref={(ref: TextInput | null) => inputRefs.current[index] = ref}
          value={digit}
          onChangeText={(text: string) => handleChange(text, index)}
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
  const { resendOtp } = useAuth();

  const onResend = async () => {
    try {
      await resendOtp(phone);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'OTP sent successfully.'

      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to send OTP.'
      });
    }
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