import { styled } from 'styled-components/native';
import { TouchableOpacity, TextInput } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

export const Header = styled.View`
  width: 100%;
  height: 100px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
`;

export const Title = styled.Text`
  font-family: 'DMSans-Bold';
  text-align: center;
  color: #12033A;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 34px;
  text-align: center;
  letter-spacing: -0.8px;
`;

export const ExchangeContainer = styled.View`
  padding: 24px;
  gap: 24px;
`;

export const CurrencySelector = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background-color: #F8F9FE;
  border-radius: 16px;
  gap: 12px;
`;

export const CurrencyText = styled.Text`
  font-family: 'DMSans-Medium';
  font-size: 16px;
  color: #12033A;
`;

export const AmountInput = styled(TextInput)`
  flex: 1;
  font-family: 'DMSans-Medium';
  font-size: 16px;
  text-align: right;
  color: #12033A;
`;

export const SwapButton = styled(TouchableOpacity)`
  align-self: center;
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: #23EBC3;
  justify-content: center;
  align-items: center;
`;

export const ConvertButton = styled(TouchableOpacity)`
  width: 100%;
  height: 56px;
  background-color: #23EBC3;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
`;

export const ConvertButtonText = styled.Text`
  font-family: 'DMSans-Bold';
  font-size: 16px;
  color: #FFFFFF;
`;

export const PriceText = styled.Text`
  font-family: 'DMSans-Medium';
  font-size: 14px;
  color: #686873;
  margin-top: 8px;
  margin-left: 16px;
`; 