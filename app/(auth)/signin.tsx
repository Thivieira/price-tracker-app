import SignInForm from "@/components/signin";
import { SignInContainer, SignInContentContainer, SignInFormNextButton, SignInSubtitle, SignInTitle } from "@/components/styles/signin.styles";
import { router } from "expo-router";
import { View } from "react-native";

export default function SignIn() {

  return <SignInContainer>
    <SignInContentContainer>
      <SignInTitle>Welcome back</SignInTitle>
      <SignInSubtitle>Sign in to your account</SignInSubtitle>
      <SignInForm />
      <View style={{
        alignSelf: 'flex-end',
        marginTop: 24
      }}>
        <SignInFormNextButton onPress={() => router.push('/pin-verification')} />
      </View>
    </SignInContentContainer>
  </SignInContainer>
}