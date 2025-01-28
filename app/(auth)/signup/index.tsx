import { useRouter } from 'expo-router';
import { View } from 'react-native';
import PhoneForm from '../../../components/signup/phone-form';

export default function SignUpPhone() {
  const router = useRouter();

  const handleNext = (phone: string) => {
    // Store phone in global state or pass via router params
    router.push({
      pathname: '/(auth)/signup/phone-verification',
      params: { phone }
    });
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <PhoneForm onNext={handleNext} />
    </View>
  );
}