import { BackgroundContainer, ProgressBar, ProgressBarContainer } from "@/components/styles/signup.styles";
import { Stack, usePathname } from "expo-router";
import { useMemo } from "react";

export default function SignupLayout() {
  const pathname = usePathname();

  const progress = useMemo(() => {
    const steps = {
      "/signup": 0.1,
      "/signup/phone-verification": 0.3,
      "/signup/personal-information": 0.4,
      "/signup/address": 0.6,
      "/signup/pin-setup": 0.8
    };

    return steps[pathname as keyof typeof steps] || 0.2;
  }, [pathname]);

  return (
    <BackgroundContainer>
      <ProgressBarContainer>
        <ProgressBar
          progress={progress}
          width={200}
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
  );
}