import React from 'react';
import { useFormContext } from 'react-hook-form';
import { SignUpPersonalInformationFormContainer } from '../styles/signup.styles';
import FloatingLabelInput from '../floating-label-input';

export default function AccountForm() {
  const { control, formState: { errors } } = useFormContext();
  console.log(errors);

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
        control={control}
        label="Password"
        placeholder="Password"
        name="password"
        isPassword
        error={errors.password}
      />
      <FloatingLabelInput
        control={control}
        label="Confirm Password"
        placeholder="Confirm Password"
        name="password_confirmation"
        isPassword
        error={errors.password_confirmation}
      />
    </SignUpPersonalInformationFormContainer>
  );
}
