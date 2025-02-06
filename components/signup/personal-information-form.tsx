import React from 'react';
import { useFormContext } from 'react-hook-form';
import { SignUpPersonalInformationFormContainer } from '../styles/signup.styles';
import FloatingLabelInput from '../floating-label-input';

export default function PersonalInformationForm() {
  const { control, formState: { errors } } = useFormContext();

  return (
    <SignUpPersonalInformationFormContainer>
      <FloatingLabelInput
        label="First name"
        placeholder="First name"
        name="firstName"
        control={control}
        error={errors.firstName}
      />
      <FloatingLabelInput

        label="Last name"
        placeholder="Last name"
        name="lastName"
        control={control}
        error={errors.lastName}
      />
      <FloatingLabelInput

        label="Birth date"
        placeholder="YYYY-MM-DD"
        name="birthDate"
        control={control}
        error={errors.birthDate}
      />
    </SignUpPersonalInformationFormContainer>

  );
}
