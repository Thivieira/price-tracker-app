import React from 'react'
import { SignUpPersonalInformationFormContainer } from '../styles/signup.styles'
import FloatingLabelInput from '../floating-label-input'
import { useForm } from 'react-hook-form';

interface FormData {
  streetAddress: string;
  complement: string;
  city: string;
  region: string;
  zipCode: string;
}
export default function AddressForm() {
  const { control } = useForm<FormData>();
  return (
    <SignUpPersonalInformationFormContainer>
      <FloatingLabelInput
        label="Street Address"
        placeholder="Street Address"
        name="streetAddress"
        control={control}
        rules={{ required: true }}
      />
      <FloatingLabelInput
        label="Apt / Suite number"
        placeholder="Apt / Suite number"
        name="complement"
        control={control}
        rules={{ required: true }}
      />
      <FloatingLabelInput
        label="City"
        placeholder="City"
        name="city"
        control={control}
        rules={{ required: true }}
      />
      <FloatingLabelInput
        label="Region"
        placeholder="Region"
        name="region"
        control={control}
        rules={{ required: true }}
      />
      <FloatingLabelInput
        label="Zip code"
        placeholder="Zip code"
        name="zipCode"
        control={control}
        rules={{ required: true }}
      />
    </SignUpPersonalInformationFormContainer>
  )
}
