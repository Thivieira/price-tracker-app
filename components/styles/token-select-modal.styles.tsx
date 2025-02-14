import styled from 'styled-components/native';

export const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
`;

export const ModalContainer = styled.View`
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 20px;
  shadow-color: #000;
  shadow-offset: 0px -2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
  max-height: 80%;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

export const SearchContainer = styled.View`
  margin-bottom: 20px;
`;

export const SearchInput = styled.TextInput`
  background-color: #f5f5f5;
  padding: 12px;
  border-radius: 10px;
  font-size: 16px;
`;

export const CoinItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 15px 0;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

export const CoinInfo = styled.View`
  margin-left: 15px;
`;

export const CoinName = styled.Text`
  font-size: 16px;
  font-weight: 600;
`;

export const CoinSymbol = styled.Text`
  font-size: 14px;
  color: #666;
  margin-top: 4px;
`;

export const CloseButton = styled.TouchableOpacity`
  padding: 8px;
`;

export const CloseButtonText = styled.Text`
  font-size: 20px;
  color: #666;
`; 