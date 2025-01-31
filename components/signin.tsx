import React from 'react'
import { SignInFormContainer } from './styles/signin.styles'
import FloatingLabelInput from './floating-label-input'
import { useForm } from 'react-hook-form';

interface FormData {
  email: string;
  password: string;
}
export default function SignInForm() {
  const { control } = useForm<FormData>();
  return (
    <SignInFormContainer>
      <FloatingLabelInput
        label="Email"
        placeholder="Email"
        name="email"
        control={control}
        rules={{ required: true }}
      />
      <FloatingLabelInput
        label="Password"
        placeholder="Password"
        name="password"
        control={control}
        rules={{ required: true }}
      />
    </SignInFormContainer>
  )
}
