import PersonalInformationForm from '@/components/signup/personal-information-form'
import { SignUpFormNextButton, SignUpPersonalInformationContainer, SignUpPersonalInformationSubtitle, SignUpPersonalInformationTitle } from '@/components/styles/signup.styles'
import React from 'react'
import { View } from 'react-native'
import { useRouter } from 'expo-router'
import AddressForm from '@/components/signup/address-form'

export default function Address() {
  const router = useRouter();

  return (
    <SignUpPersonalInformationContainer>
      <SignUpPersonalInformationTitle>
        Home Address
      </SignUpPersonalInformationTitle>
      <AddressForm />
      <View style={{
        alignSelf: 'flex-end',
        marginTop: 24
      }}>
        <SignUpFormNextButton onPress={() => router.push('/signup/pin-setup')} />
      </View>
    </SignUpPersonalInformationContainer>
  )
}
