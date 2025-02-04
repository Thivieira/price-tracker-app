import React, { useState } from 'react'
import { SignUpPersonalInformationFormContainer } from '../styles/signup.styles'
import FloatingLabelInput from '../floating-label-input'
import { useForm } from 'react-hook-form';

interface FormData {
  username: string;
  password: string;
}

export default function AccountForm() {
  const { control } = useForm<FormData>();
  return (
    <SignUpPersonalInformationFormContainer>

      <FloatingLabelInput
        label="Username"
        placeholder="Username"
        name="username"
        control={control}
        rules={{ required: true }}
      />
      <FloatingLabelInput
        label="Password"
        placeholder="Password"
        name="password"
        control={control}
        isPassword

        rules={{ required: true }}
      />
    </SignUpPersonalInformationFormContainer>

  )
}
