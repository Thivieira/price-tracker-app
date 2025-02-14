import CurrencyPicker from '@/components/currency-picker';
import { useAuth } from '@/contexts/AuthContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useOnboarding } from '@/contexts/OnboardingContext';
import Toast from 'react-native-toast-message';
import { styled } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 24px;
`;

export const ContentContainer = styled.View`
  flex: 1;
  align-items: flex-start;
  justify-content: center;
`;

export const Title = styled.Text`
  font-family: 'DMSans-Bold';
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 46px;
  text-align: center;
  letter-spacing: -1px;
  color: #12033A;
  margin-bottom: 20px;
  text-align: center;
  width: 100%;
`;

export const Separator = styled.View`
  height: 1px;
  width: 80%;
  background-color: rgba(18, 3, 58, 0.1);
  margin: 20px 0;
  align-self: center;
`;

export const CurrencyText = styled.Text`
  font-family: 'DMSans-Medium';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
  text-align: center;
  letter-spacing: -0.4px;
  color: rgba(18, 3, 58, 0.8);
  margin: 10px 0;
`;

export const LogoutButton = styled.TouchableOpacity`
  background: #FF3B30;
  border-radius: 16px;
  padding: 16px 32px;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  align-self: center;
  margin-top: 50px;
`;

export const LogoutButtonText = styled.Text`
  font-family: 'DMSans-Bold';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 26px;
  text-align: center;
  letter-spacing: -0.355556px;
  color: #FFFFFF;
`;

export const ConfirmButton = styled.TouchableOpacity<{ active: boolean }>`
  padding: 16px 32px;
  border-radius: 8px;
  align-items: center;
  background-color: ${props => props.active ? 'rgba(35, 235, 195, 0.3)' : 'rgba(35, 235, 195, 0.1)'};
`;

export const ConfirmButtonText = styled.Text`
  color: #323232;
  font-size: 16px;
  font-weight: bold;
`;


export default function TabTwoScreen() {
  const { currency } = useCurrency();
  const { signOut } = useAuth();
  const { isOnboardingComplete, clearOnboardingStatus } = useOnboarding();

  const handleLogout = () => {
    signOut();
  };

  return (
    <Container>
      <ContentContainer>
        <Title>Settings</Title>
        <Separator />
        <CurrencyText>Current Currency: {currency}</CurrencyText>
        <CurrencyPicker />
        <CurrencyText>Onboarding Status: {isOnboardingComplete ? 'Complete' : 'Incomplete'}</CurrencyText>
        <ConfirmButton active={true} onPress={() => {
          clearOnboardingStatus();
          Toast.show({
            text1: 'Onboarding status cleared',
            type: 'success',
          });
        }}>
          <ConfirmButtonText>Allow Onboarding</ConfirmButtonText>
        </ConfirmButton>
        <LogoutButton onPress={handleLogout}>
          <LogoutButtonText>Logout</LogoutButtonText>
        </LogoutButton>
      </ContentContainer>
    </Container>
  );
}
