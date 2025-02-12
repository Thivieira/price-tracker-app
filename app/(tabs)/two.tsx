import { useCurrency } from '@/contexts/CurrencyContext';
import { styled } from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const Separator = styled.View`
  height: 1px;
  width: 80%;
`;

const Text = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const ChangeCurrencyButton = styled.TouchableOpacity`
  background-color: #000;
  padding: 10px;
  border-radius: 5px;
`;

const ChangeCurrencyButtonText = styled.Text`
  color: #ffffff;
`;




export default function TabTwoScreen() {
  const { currency, setCurrency } = useCurrency();
  return (
    <Container>
      <Title>Tab Two</Title>
      <Separator lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text>{currency}</Text>
      <ChangeCurrencyButton onPress={() => setCurrency('BRL')}>
        <ChangeCurrencyButtonText>Change Currency</ChangeCurrencyButtonText>
      </ChangeCurrencyButton>
      {/* <SelectCurrencyContainer>
        <SelectCurrencyButton onPress={() => setCurrency('BRL')}>
          <Text>BRL</Text>
        </SelectCurrencyButton>
      </SelectCurrencyContainer> */}
      {/* <EditScreenInfo path="app/(tabs)/two.tsx" /> */}
    </Container>
  );
}
