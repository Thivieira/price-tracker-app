import { useState } from 'react';
import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import { Text } from "@/components/Themed";

interface PhoneFormProps {
  onNext: (phone: string) => void;
}

export default function PhoneForm({ onNext }: PhoneFormProps) {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (phone.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }
    onNext(phone);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your phone number</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone number"
        keyboardType="phone-pad"
        autoFocus
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Pressable
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Next</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 