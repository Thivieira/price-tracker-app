import { SignUpFormNextButton, SignUpPersonalInformationContainer, SignUpPersonalInformationTitle } from '@/components/styles/signup.styles'
import { useSignupWizard } from '@/contexts/SignupWizardContext'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { View } from 'react-native'
import AccountForm from '@/components/signup/account-form'
import { useEffect, useMemo } from 'react'
import { useWatch } from 'react-hook-form'

export default function Account() {
  const router = useRouter();
  const { methods: { control, trigger, getValues, setValue, setError } } = useSignupWizard();
  const { phone } = useLocalSearchParams<{ phone: string }>();

  // Watch password fields for changes
  const password = useWatch({ control, name: 'password' });
  const passwordConfirmation = useWatch({ control, name: 'password_confirmation' });


  // Validate passwords when either field changes
  useEffect(() => {
    if (password && passwordConfirmation && password !== passwordConfirmation) {
      setError('password_confirmation', { message: 'Passwords do not match' });
    }
  }, [password, passwordConfirmation, setError]);

  useEffect(() => {
    setValue('phone', phone);
  }, [phone]);

  const handleNext = async () => {
    // Check if passwords match first
    const currentPassword = getValues('password');
    const currentConfirmation = getValues('password_confirmation');

    if (currentPassword !== currentConfirmation) {
      setError('password_confirmation', { message: 'Passwords do not match' });
      return;
    }

    const isValid = await trigger(['username', 'password', 'password_confirmation'], {
      shouldFocus: true
    });

    if (!isValid) {
      return;
    }

    router.push('/signup/personal-information');
  };


  return (
    <SignUpPersonalInformationContainer>
      <SignUpPersonalInformationTitle>
        Account Details
      </SignUpPersonalInformationTitle>
      <AccountForm />
      <View style={{
        alignSelf: 'flex-end',
        marginTop: 24
      }}>
        <SignUpFormNextButton onPress={handleNext} />
      </View>
    </SignUpPersonalInformationContainer>
  )
}
