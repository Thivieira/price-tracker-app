import PersonalInformationForm from '@/components/signup/personal-information-form'
import { SignUpFormNextButton, SignUpPersonalInformationContainer, SignUpPersonalInformationSubtitle, SignUpPersonalInformationTitle } from '@/components/styles/signup.styles'
import React from 'react'
import { View } from 'react-native'
import { useRouter } from 'expo-router'

export default function Account() {
  const router = useRouter();


  return (
    <SignUpPersonalInformationContainer>
      <SignUpPersonalInformationTitle>
        Account Details
      </SignUpPersonalInformationTitle>
      <PersonalInformationForm />
      <View style={{
        alignSelf: 'flex-end',
        marginTop: 24
      }}>
        <SignUpFormNextButton onPress={() => router.push('/signup/personal-information')} />
      </View>
    </SignUpPersonalInformationContainer>
  )
}
