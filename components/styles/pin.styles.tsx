import { View, Text, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
import { Image as ExpoImage } from 'expo-image';

export const Container = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 72px;
`;

export const PinContainer = styled.View`
  flex-direction: row;
  gap: 24px;
   margin-bottom: 80px;
`;

export const PinBox = styled.View<{ filled: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 6px;
  background-color: ${props => props.filled ? 'rgba(35, 235, 195, 1)' : 'rgba(35, 235, 195, 0.1)'};
`;

export const Numpad = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  row-gap: 24px;
  justify-content: space-between;
  width: 100vw;
  height: 286px;
  align-self: center;
  position: relative;
  /* transform: translateX(-50%); */
`;

export const NumButton = styled.TouchableOpacity`  width: 30%;
  height: 48px;
  border-radius: 40px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

export const NumText = styled.Text`
  font-size: 24px;
  color: rgba(18, 3, 58, 1);
  font-family: 'DMSans_400Regular';
  font-weight: 400;

`;

export const ConfirmButton = styled.TouchableOpacity<{ active: boolean }>`
  padding: 16px 32px;
  border-radius: 8px;
  width: 100%;
  align-items: center;
  background-color: ${props => props.active ? 'rgba(35, 235, 195, 1)' : 'rgba(35, 235, 195, 0.1)'};
    margin-top: 62px;
`;

export const ConfirmButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

export const DeleteIcon = styled(ExpoImage)`
  width: 24px;
  height: 24px;
`;

export const ResetText = styled.Text`
  font-family: 'DMSans_700Bold';
  font-weight: 700;
  font-size: 17px;
  line-height: 26px;
  text-align: center;
  letter-spacing: -0.355556px;
  color: rgba(18, 3, 58, 1);
`;
