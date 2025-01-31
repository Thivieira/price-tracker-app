import PersonalInformationForm from '@/components/signup/personal-information-form'
import { SignUpPersonalInformationContainer, SignUpPersonalInformationSubtitle, SignUpPersonalInformationTitle } from '@/components/styles/signup.styles'
import React from 'react'

export default function PersonalInformation() {
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
    </SignUpPersonalInformationContainer>
  )
}
