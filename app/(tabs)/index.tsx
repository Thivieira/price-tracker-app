import { Button, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TabOneScreen() {
  const clearAsyncStorage = async () => {
    console.log('Clearing Async Storage');
    await AsyncStorage.clear();

    const getAllKeys = await AsyncStorage.getAllKeys();
    console.log('Async Storage cleared', getAllKeys);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One test</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      <Button title="Clear Async Storage" onPress={clearAsyncStorage} />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
