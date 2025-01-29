import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import PhoneInput, {
  ICountry,
} from 'react-native-international-phone-number';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { PhoneInputContainer, phoneInputStyles } from './international-phone-input.styles';
import { modalStyles } from './international-phone-input.styles';
import { Image } from 'expo-image';

interface FormProps extends FieldValues {
  phoneNumber: string;
}

export default function InternationalPhoneInput({ control, handleSubmit }: { control: Control<FormProps>; handleSubmit: (form: FormProps) => void }) {
  const [selectedCountry, setSelectedCountry] = useState<
    undefined | ICountry
  >(undefined);

  function handleSelectedCountry(country: ICountry) {
    setSelectedCountry(country);
  }

  // function onSubmit(form: FormProps) {
  //   console.log(
  //     'Advanced Result',
  //     `${selectedCountry?.callingCode} ${form.phoneNumber}`
  //   );
  // }

  return (
    <PhoneInputContainer>
      <Controller
        name="phoneNumber"
        control={control}
        render={({ field: { onChange, value } }) => (
          <PhoneInput
            // defaultValue="+12505550199"
            placeholderTextColor="rgba(18, 3, 58, 0.2)"
            placeholder="0 00 00 00 00"
            value={value}
            onChangePhoneNumber={onChange}
            selectedCountry={selectedCountry}
            onChangeSelectedCountry={handleSelectedCountry}
            phoneInputStyles={phoneInputStyles}
            modalStyles={modalStyles}
            customCaret={<Image source={require('@/assets/images/input-caret.svg')} style={{ width: 18, height: 8, marginLeft: 10 }} />}
          />
        )}
      />
    </PhoneInputContainer>
  );
}