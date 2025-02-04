import SignInForm from "@/components/signin";
import { SignInContainer, SignInContentContainer, SignInSubtitle, SignInTitle } from "@/components/styles/signin.styles";


export default function SignIn() {

  return <SignInContainer>
    <SignInContentContainer>
      <SignInTitle>Welcome back</SignInTitle>
      <SignInSubtitle>Sign in to your account</SignInSubtitle>
      <SignInForm />
    </SignInContentContainer>
  </SignInContainer>
}