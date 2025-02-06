import { SignUpFormNextButton, SignUpPersonalInformationContainer, SignUpPersonalInformationTitle } from '@/components/styles/signup.styles'
import { useSignupWizard } from '@/contexts/SignupWizardContext'
import { useRouter } from 'expo-router'
import { View } from 'react-native'
import AddressForm from '@/components/signup/address-form'

export default function Address() {
  const router = useRouter();
  const { methods: { trigger } } = useSignupWizard();

  const handleNext = async () => {
    const isValid = await trigger(['streetAddress', 'city', 'region', 'zipCode']);
    if (isValid) {
      router.push('/signup/pin-setup');
    }
  };

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
        <SignUpFormNextButton onPress={handleNext} />
      </View>
    </SignUpPersonalInformationContainer>
  )
}
