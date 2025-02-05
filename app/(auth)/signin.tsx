import SignInForm from "@/components/signin";
import { SignInContainer, SignInContentContainer, SignInSubtitle, SignInTitle } from "@/components/styles/signin.styles";
import { useAuth } from "@/contexts/AuthContext";
import { router } from "expo-router";
import { useEffect } from "react";

export default function SignIn() {
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/(tabs)');
    }
  }, [isLoggedIn]);

  return <SignInContainer>
    <SignInContentContainer>
      <SignInTitle>Welcome back</SignInTitle>
      <SignInSubtitle>Sign in to your account</SignInSubtitle>
      <SignInForm />
    </SignInContentContainer>
  </SignInContainer>
}