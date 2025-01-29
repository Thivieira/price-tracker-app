import { SignUpPersonalInformationContainer, SignUpPersonalInformationSubtitle, SignUpPersonalInformationTitle } from '@/components/styles/signup.styles'
import React from 'react'

export default function PersonalInformation() {
  return (
    <SignUpPersonalInformationContainer>
      <SignUpPersonalInformationTitle>
        Personal Information
      </SignUpPersonalInformationTitle>
      <SignUpPersonalInformationSubtitle>
        Please enter your personal information
      </SignUpPersonalInformationSubtitle>
    </SignUpPersonalInformationContainer>
  )
}
