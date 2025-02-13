import { Stack, usePathname } from 'expo-router';

export default function CryptoLayout() {
  const pathname = usePathname();
  console.log('pathname in layout for crypto: ', pathname);
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="bookmarks"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="[symbol]"
        options={{
          headerShown: false
        }}
      />
    </Stack>
  );
}
