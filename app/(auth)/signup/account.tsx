import { SignUpFormNextButton, SignUpPersonalInformationContainer, SignUpPersonalInformationTitle } from '@/components/styles/signup.styles'
import { useSignupWizard } from '@/contexts/SignupWizardContext'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { View } from 'react-native'
import AccountForm from '@/components/signup/account-form'
import { useEffect } from 'react'

export default function Account() {
  const router = useRouter();
  const { methods: { trigger, getValues, setValue } } = useSignupWizard();
  const { phone } = useLocalSearchParams<{ phone: string }>();

  useEffect(() => {
    setValue('phone', phone);
  }, [phone]);


  const handleNext = async () => {
    try {
      // Validate password fields together
      const passwordValid = await trigger('password');
      const confirmationValid = await trigger('password_confirmation');

      // Then validate all fields
      const isValid = await trigger(['username', 'password', 'password_confirmation']);

      console.log("IS VALID", isValid);
      if (isValid) {
        router.push('/signup/personal-information');
      }
    } catch (error) {
      console.log("ERROR", error);
    }
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
