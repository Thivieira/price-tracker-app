import React from 'react'
import { SignUpPersonalInformationFormContainer } from '../styles/signup.styles'
import FloatingLabelInput from '../floating-label-input'
import { useFormContext } from 'react-hook-form';

export default function AddressForm() {
  const { control, formState: { errors } } = useFormContext();

  return (
    <SignUpPersonalInformationFormContainer>
      <FloatingLabelInput
        label="Street Address"
        placeholder="Street Address"
        name="streetAddress"
        control={control}
        error={errors.streetAddress}
      />
      <FloatingLabelInput
        label="Apt / Suite number"
        placeholder="Apt / Suite number"
        name="complement"
        control={control}
        error={errors.complement}
      />
      <FloatingLabelInput
        label="City"
        placeholder="City"
        name="city"
        control={control}
        error={errors.city}
      />
      <FloatingLabelInput
        label="Region"
        placeholder="Region"
        name="region"
        control={control}
        error={errors.region}
      />
      <FloatingLabelInput
        label="Zip code"
        placeholder="Zip code"
        name="zipCode"
        control={control}
        error={errors.zipCode}
        isNumeric={true}
        keyboardType="numeric"
      />
    </SignUpPersonalInformationFormContainer>
  )
}
