import { Stack, usePathname } from 'expo-router';


export default function CryptoLayout() {
  const pathname = usePathname();
  console.log('pathname in layout', pathname);
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[symbol]" options={{ headerShown: false }} />
    </Stack>
  );

}
