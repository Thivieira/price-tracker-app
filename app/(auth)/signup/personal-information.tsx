import PersonalInformationForm from '@/components/signup/personal-information-form'
import { SignUpFormNextButton, SignUpPersonalInformationContainer, SignUpPersonalInformationSubtitle, SignUpPersonalInformationTitle } from '@/components/styles/signup.styles'
import React from 'react'
import { View } from 'react-native'
import { useRouter } from 'expo-router'

export default function PersonalInformation() {
  const router = useRouter();

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
        <SignUpFormNextButton onPress={() => router.push('/signup/address')} />
      </View>
    </SignUpPersonalInformationContainer>
  )
}
