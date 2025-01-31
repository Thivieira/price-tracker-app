import React, { useState } from 'react'
import { SignUpPersonalInformationFormContainer } from '../styles/signup.styles'
import FloatingLabelInput from '../floating-label-input'
import { useForm } from 'react-hook-form';

interface FormData {
  firstName: string;
  lastName: string;
  birthDate: string;
}
export default function PersonalInformationForm() {
  const { control } = useForm<FormData>();
  return (
    <SignUpPersonalInformationFormContainer>
      <FloatingLabelInput
        label="First name"
        placeholder="First name"
        name="firstName"
        control={control}
        rules={{ required: true }}
      />
      <FloatingLabelInput
        label="Last name"
        placeholder="Last name"
        name="lastName"
        control={control}
        rules={{ required: true }}
      />
      <FloatingLabelInput
        label="Birth date"
        placeholder="Birth date"
        name="birthDate"
        control={control}
        rules={{ required: true }}
      />
    </SignUpPersonalInformationFormContainer>
  )
}
