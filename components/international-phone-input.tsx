import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import PhoneInput, {
  ICountry,
} from 'react-native-international-phone-number';
import { Control, Controller, FieldValues } from 'react-hook-form';

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

  function onSubmit(form: FormProps) {
    Alert.alert(
      'Advanced Result',
      `${selectedCountry?.callingCode} ${form.phoneNumber}`
    );
  }

  return (
    <View style={{ width: '100%', flex: 1, padding: 24 }}>
      <Controller
        name="phoneNumber"
        control={control}
        render={({ field: { onChange, value } }) => (
          <PhoneInput
            defaultValue="+12505550199"
            value={value}
            onChangePhoneNumber={onChange}
            selectedCountry={selectedCountry}
            onChangeSelectedCountry={handleSelectedCountry}
          />
        )}
      />
      <TouchableOpacity
        style={{
          width: '100%',
          paddingVertical: 12,
          backgroundColor: '#2196F3',
          borderRadius: 4,
        }}
        onPress={handleSubmit(onSubmit)}
      >
        <Text
          style={{
            color: '#F3F3F3',
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 'bold',
          }}
        >
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  );
}