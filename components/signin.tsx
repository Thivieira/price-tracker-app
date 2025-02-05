import React, { Fragment, useEffect, useMemo } from 'react'
import { SignInFormContainer, SignInFormNextButton } from './styles/signin.styles'
import FloatingLabelInput from './floating-label-input'
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import { View } from 'react-native';
import { router } from 'expo-router';
import styled from 'styled-components/native'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema } from '@/schemas/signin.schema';
import { ALERT_TYPE, AlertNotificationRoot, Dialog } from 'react-native-alert-notification';

type FormData = z.infer<typeof signInSchema>;

const ButtonContainer = styled(View)`
  align-self: flex-end;
  margin-top: 0px;
  margin-right: 12px;
`;

export default function SignInForm() {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    defaultValues: {
      username: '',
      password: ''
    },
    resolver: zodResolver(signInSchema),
    mode: 'all'
  });

  const isValid = useMemo(() => {
    return !isSubmitting && Object.values(errors).length === 0;
  }, [errors, isSubmitting]);

  const { signIn } = useAuth();


  const onSubmit = async (data: FormData) => {
    console.log(data);
    try {
      await signIn(data.username, data.password);
      router.replace('/pin-verification');
    } catch (error) {
      console.error(error);
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Username or password are incorrect.',
        button: 'Close',
      })
    }
  };

  return (
    <AlertNotificationRoot>
      <SignInFormContainer>
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

      </SignInFormContainer>
      <ButtonContainer>
        <SignInFormNextButton disabled={!isValid} isLoading={isSubmitting} onPress={handleSubmit(onSubmit)} />
      </ButtonContainer>
    </AlertNotificationRoot>

  )

}
