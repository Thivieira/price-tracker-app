import { SignUpFormNextButton, SignUpPersonalInformationContainer, SignUpPersonalInformationTitle } from '@/components/styles/signup.styles'
import { useSignupWizard } from '@/contexts/SignupWizardContext'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { View } from 'react-native'
import AccountForm from '@/components/signup/account-form'
import { useEffect } from 'react'
import { UseFormSetError } from 'react-hook-form'

interface AccountFormData {
  password: string;
  password_confirmation: string;
  username: string;
  phone: string;
}

const validatePasswords = (
  password: string,
  passwordConfirmation: string,
  setError: UseFormSetError<AccountFormData>
): boolean => {
  if (password && passwordConfirmation && password !== passwordConfirmation) {
    setError('password_confirmation', { message: 'Passwords do not match' });
    return false;
  }
  return true;
}

export default function Account() {
  const router = useRouter();
  const { methods: { control, trigger, getValues, setValue, setError } } = useSignupWizard();
  const { phone } = useLocalSearchParams<{ phone: string }>();

  // Set phone number from URL params
  useEffect(() => {
    if (phone) setValue('phone', phone);
  }, [phone, setValue]);

  // Handle form submission
  const handleNext = async () => {
    const formData = getValues();

    // Validate passwords
    if (!validatePasswords(formData.password, formData.password_confirmation, setError)) {
      return;
    }

    // Validate required fields
    const isValid = await trigger(['username', 'password', 'password_confirmation'], {
      shouldFocus: true
    });

    if (isValid) {
      router.push('/signup/personal-information');
    }
  };

  return (
    <SignUpPersonalInformationContainer>
      <SignUpPersonalInformationTitle>
        Account Details
      </SignUpPersonalInformationTitle>
      <AccountForm />
      <View style={{ alignSelf: 'flex-end', marginTop: 24 }}>
        <SignUpFormNextButton onPress={handleNext} />
      </View>
    </SignUpPersonalInformationContainer>
  )
}
