import { BackgroundContainer, ProgressBar, ProgressBarContainer } from "@/components/styles/signup.styles";
import { Stack } from "expo-router";

export default function SignupLayout() {
  return (
    <BackgroundContainer>
      <ProgressBarContainer>
        <ProgressBar progress={0.3} width={200} borderWidth={0} color="rgba(35, 235, 195, 1)" unfilledColor="rgba(35, 235, 195, 0.1)" />
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
  )
}