import { BackgroundContainer, GoBackButton, ProgressBar, ProgressBarContainer } from "@/components/styles/signup.styles";
import { Stack, usePathname, useRouter } from "expo-router";
import { useMemo } from "react";
import { SignupWizardProvider } from '@/contexts/SignupWizardContext';

export default function SignupLayout() {
  const pathname = usePathname();
  const router = useRouter();

  const progress = useMemo(() => {
    const steps = {
      "/signup": 0.1,
      "/signup/phone-verification": 0.3,
      "/signup/account": 0.4,
      "/signup/personal-information": 0.6,
      "/signup/address": 0.8,
      "/signup/pin-setup": 1
    };

    return steps[pathname as keyof typeof steps] || 0.2;
  }, [pathname]);

  return (
    <SignupWizardProvider>
      <BackgroundContainer>
        <ProgressBarContainer>
          {progress > 0.1 && <GoBackButton onPress={() => router.back()} />}
          <ProgressBar
            progress={progress}
            width={88}
            height={8}
            borderWidth={0}
            color="rgba(35, 235, 195, 1)"
            unfilledColor="rgba(35, 235, 195, 0.1)"
          />
        </ProgressBarContainer>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="phone-verification"
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="account"
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="personal-information"
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="address"
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="pin-setup"
            options={{
              headerShown: false
            }}
          />
        </Stack>
      </BackgroundContainer>
    </SignupWizardProvider>
  );
}