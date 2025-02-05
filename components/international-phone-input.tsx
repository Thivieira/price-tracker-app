import React from 'react';
import PhoneInput, {
  ICountry,
} from 'react-native-international-phone-number';


import { Control, Controller, RegisterOptions } from 'react-hook-form';
import { PhoneInputContainer, phoneInputStyles } from './international-phone-input.styles';
import { modalStyles } from './international-phone-input.styles';
import { Image } from 'expo-image';
import styled from 'styled-components/native';

interface FormProps {
  phoneNumber: string;
}

const ErrorText = styled.Text`
  color: red;
  margin: 5px 0;
  text-align: center;
`;


export default function InternationalPhoneInput({
  control,
  name,
  rules,
  error,
  country,
  onCountryChange,
}: {
  control: Control<FormProps>;
  name: string;
  rules?: RegisterOptions;
  error?: string;
  country: ICountry | undefined;
  onCountryChange?: (country: ICountry) => void;
}) {
  return (
    <PhoneInputContainer>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <PhoneInput
            placeholderTextColor="rgba(18, 3, 58, 0.2)"
            placeholder="0 00 00 00 00"
            value={value}
            onChangePhoneNumber={onChange}
            selectedCountry={country}
            onChangeSelectedCountry={onCountryChange}
            phoneInputStyles={phoneInputStyles}
            modalStyles={modalStyles}
            customCaret={<Image source={require('@/assets/images/input-caret.svg')} style={{ width: 18, height: 8, marginLeft: 10 }} />}
          />
        )}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </PhoneInputContainer>
  );

}