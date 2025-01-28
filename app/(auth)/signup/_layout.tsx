import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function SignupLayout() {
  useFonts({
    'TwemojiMozilla': require('./node_modules/react-native-international-phone-number/lib/assets/fonts/TwemojiMozilla.woff2'),
  });

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="phone-verification" options={{ headerShown: false }} />
      <Stack.Screen name="personal-information" options={{ headerShown: false }} />
      <Stack.Screen name="address" options={{ headerShown: false }} />
      <Stack.Screen name="pin-setup" options={{ headerShown: false }} />
    </Stack>
  )
}