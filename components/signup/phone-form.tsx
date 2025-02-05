import { useState, useCallback, useMemo } from 'react';
import InternationalPhoneInput from '../international-phone-input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PhoneFormAlreadyHaveAccountLink, PhoneFormAlreadyHaveAccountLinkText, PhoneFormAlreadyHaveAccountText, PhoneFormAlreadyHaveAccountTextContainer, PhoneFormContainer, PhoneFormTermsAndConditionsTextContainer, PhoneFormTermsAndConditionsLink, PhoneFormTermsAndConditionsText, PhoneFormTitle, PhoneFormTermsAndConditionsLinkText } from '../styles/signup.styles';

import { ActionButton, ActionButtonText } from '../styles/index.styles';
import { router } from 'expo-router';
import { View } from 'react-native';
import { ICountry } from 'react-native-international-phone-number';
import { parsePhoneNumberWithError } from 'libphonenumber-js';
import styled from 'styled-components/native';

interface PhoneFormProps {
  onNext: (phone: string) => void;
}

interface PhoneFormValues {
  phoneNumber: string;
}

const ActionButtonContainer = styled.View`
  margin-top: ${({ errors }: { errors: any }) => errors.phoneNumber?.message ? 30 : 20}px;
`;


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
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PhoneFormValues>({
    defaultValues: {
      phoneNumber: ''
    },
    mode: 'all'
  });

  console.log(errors, 'errors');

  const [selectedCountry, setSelectedCountry] = useState<ICountry>();

  const callingCode = useMemo(() => {
    return selectedCountry?.callingCode.substring(1); // remove the +
  }, [selectedCountry]);

  const validatePhoneNumber = useCallback((value: string) => {
    try {
      const phoneNumber = parsePhoneNumberWithError(value, { defaultCallingCode: callingCode });


      if (!phoneNumber?.isValid()) {
        return 'Please enter a valid phone number';
      }

      const nationalNumber = phoneNumber.nationalNumber;
      if (!nationalNumber || nationalNumber.length < 6) {
        return 'Phone number is too short';
      }

      if (nationalNumber.length > 15) {
        return 'Phone number is too long';
      }

      return true;
    } catch (error) {
      console.log(error, 'error');
      return 'Please enter a valid phone number';
    }
  }, [callingCode]);

  const onSubmit: SubmitHandler<PhoneFormValues> = useCallback((data) => {
    try {
      const phoneNumber = parsePhoneNumberWithError(data.phoneNumber, {
        defaultCallingCode: callingCode
      });
      onNext(phoneNumber?.format('E.164') || data.phoneNumber);
    } catch (error) {
      onNext(data.phoneNumber);
    }

  }, [onNext, callingCode]);

  return (
    <PhoneFormContainer>
      <PhoneFormTitle>Getting Started</PhoneFormTitle>
      <InternationalPhoneInput
        control={control}
        name="phoneNumber"
        rules={{
          required: 'Phone number is required',
          validate: validatePhoneNumber
        }}
        error={errors.phoneNumber?.message}
        country={selectedCountry}
        onCountryChange={setSelectedCountry}
      />
      <ActionButtonContainer errors={errors}>
        <ActionButton
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          <ActionButtonText>
            {isSubmitting ? 'Sending...' : 'Send Code'}
          </ActionButtonText>
        </ActionButton>
      </ActionButtonContainer>
      <AlreadyHaveAccount />
      <TermsAndConditions />
    </PhoneFormContainer>
  );
}