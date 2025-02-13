import CurrencyPicker from '@/components/currency-picker';
import { useAuth } from '@/contexts/AuthContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { styled } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 24px;
`;

export const ContentContainer = styled.View`
  flex: 1;
  align-items: center;
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
`;

export const Separator = styled.View`
  height: 1px;
  width: 80%;
  background-color: rgba(18, 3, 58, 0.1);
  margin: 20px 0;
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

export default function TabTwoScreen() {
  const { currency } = useCurrency();
  const { signOut } = useAuth();

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
        <LogoutButton onPress={handleLogout}>
          <LogoutButtonText>Logout</LogoutButtonText>
        </LogoutButton>
      </ContentContainer>
    </Container>
  );
}
