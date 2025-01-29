import { useState } from 'react';
import InternationalPhoneInput from '../international-phone-input';
import { Control, Controller, FieldValues, useForm } from 'react-hook-form';
import { PhoneFormAlreadyHaveAccountLink, PhoneFormAlreadyHaveAccountLinkText, PhoneFormAlreadyHaveAccountText, PhoneFormAlreadyHaveAccountTextContainer, PhoneFormContainer, PhoneFormTermsAndConditionsTextContainer, PhoneFormTermsAndConditionsLink, PhoneFormTermsAndConditionsText, PhoneFormTitle, PhoneFormTermsAndConditionsLinkText } from '../styles/signup.styles';
import { ActionButton, ActionButtonText } from '../styles/index.styles';
import { router } from 'expo-router';
import { View } from 'react-native';

interface PhoneFormProps {
  onNext: (phone: string) => void;
}

const AlreadyHaveAccount = () => {
  const onSignIn = () => {
    router.push('/signin');
  };

  return (
    <PhoneFormAlreadyHaveAccountTextContainer>
      <PhoneFormAlreadyHaveAccountText>
        Already have an account?
      </PhoneFormAlreadyHaveAccountText>
      <PhoneFormAlreadyHaveAccountLink onPress={onSignIn}>
        <PhoneFormAlreadyHaveAccountLinkText>Sign In</PhoneFormAlreadyHaveAccountLinkText>
      </PhoneFormAlreadyHaveAccountLink>
    </PhoneFormAlreadyHaveAccountTextContainer>
  );
};

const TermsAndConditions = () => {
  return (
    <PhoneFormTermsAndConditionsTextContainer>
      <PhoneFormTermsAndConditionsText>
        By creating an account you agree
      </PhoneFormTermsAndConditionsText>
      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
        <PhoneFormTermsAndConditionsText>to our</PhoneFormTermsAndConditionsText>
        <PhoneFormTermsAndConditionsLink>
          <PhoneFormTermsAndConditionsLinkText>Terms and Conditions</PhoneFormTermsAndConditionsLinkText>
        </PhoneFormTermsAndConditionsLink>
      </View>
    </PhoneFormTermsAndConditionsTextContainer>
  );
};

export default function PhoneForm({ onNext }: PhoneFormProps) {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const { control, handleSubmit } = useForm();

  // const handleSubmit = () => {
  //   if (phone.length < 10) {
  //     setError('Please enter a valid phone number');
  //     return;
  //   }
  //   onNext(phone);
  // };

  const onSubmit = (data: any) => {
    console.log(data);
    onNext(data.phoneNumber);
  };

  return (
    <PhoneFormContainer>
      <PhoneFormTitle>Getting Started</PhoneFormTitle>
      <InternationalPhoneInput
        control={control}
      />
      <View style={{ marginTop: 20 }}>
        <ActionButton onPress={handleSubmit(onSubmit)}>
          <ActionButtonText>Send Code</ActionButtonText>
        </ActionButton>
      </View>
      <AlreadyHaveAccount />
      <TermsAndConditions />
    </PhoneFormContainer>
  );
}