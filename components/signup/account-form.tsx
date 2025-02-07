import React from 'react';
import { useFormContext } from 'react-hook-form';
import { SignUpPersonalInformationFormContainer } from '../styles/signup.styles';
import FloatingLabelInput from '../floating-label-input';

export default function AccountForm() {
  const { control, formState: { errors } } = useFormContext();

  return (
    <SignUpPersonalInformationFormContainer>
      <FloatingLabelInput
        label="Username"
        placeholder="Username"
        name="username"
        control={control}
        error={errors.username}
      />
      <FloatingLabelInput
        label="Password"
        placeholder="Password"
        name="password"
        control={control}
        isPassword
        error={errors.password}
      />
      <FloatingLabelInput
        label="Confirm Password"
        placeholder="Confirm Password"
        name="password_confirmation"
        control={control}
        isPassword
        showEye={false}
        error={errors.password_confirmation}
      />
    </SignUpPersonalInformationFormContainer>

  );
}
