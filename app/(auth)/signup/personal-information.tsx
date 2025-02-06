import PersonalInformationForm from '@/components/signup/personal-information-form'
import { SignUpFormNextButton, SignUpPersonalInformationContainer, SignUpPersonalInformationSubtitle, SignUpPersonalInformationTitle } from '@/components/styles/signup.styles'
import React from 'react'
import { View } from 'react-native'
import { useRouter } from 'expo-router'
import { useSignupWizard } from '@/contexts/SignupWizardContext'

export default function PersonalInformation() {
  const router = useRouter();
  const { methods: { trigger } } = useSignupWizard();

  const handleNext = async () => {
    const isValid = await trigger(['firstName', 'lastName', 'birthDate']);
    if (isValid) {
      router.push('/signup/address');
    }
  };

  return (
    <SignUpPersonalInformationContainer>
      <SignUpPersonalInformationTitle>
        Personal Information
      </SignUpPersonalInformationTitle>
      <SignUpPersonalInformationSubtitle>
        We ask for your personal information{'\n'}
        to verify your identity
      </SignUpPersonalInformationSubtitle>
      <PersonalInformationForm />
      <View style={{
        alignSelf: 'flex-end',
        marginTop: 24
      }}>
        <SignUpFormNextButton onPress={handleNext} />
      </View>
    </SignUpPersonalInformationContainer>
  )
}
