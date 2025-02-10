import { Image } from 'expo-image';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'styled-components/native';
import * as Progress from 'react-native-progress';

export const BackgroundContainer = styled(View)`flex: 1; background-color: #ffffff;`

export const ScreenContainer = styled(View)`
flex: 1;
width: 100%;
background-color: #ffffff;
position: relative;
align-items: center;
`

export const BackgroundImage = styled(Image)`
  position: absolute;
  width: 100%;
  height: 280px;
  top: -10px;
`

export const InfoContainer = styled(View)`
  position: absolute;
  bottom: 120px;
  width: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
`

export const TitleText = styled(Text)`
font-family: 'DMSans-Bold';
font-style: normal;
font-weight: 700;
font-size: 36px;
line-height: 46px;
text-align: center;
letter-spacing: -1px;
color: #fff;
margin-top: 100px;
`

export const DescriptionText = styled(Text)`
position: relative;
top: 20px;
font-family: 'DMSans-Medium';
font-style: normal;
font-weight: 500;

font-size: 14px;
line-height: 24px;
text-align: center;
letter-spacing: -0.3px;
color: rgba(18, 3, 58, 0.8);
`

export const Spacer = styled(View)`
position: absolute;
  align-self: flex-end;
  bottom: 52px;
  right: 28px;
`





interface ExchangeBtnProps {
  onPress: () => void;
}

export const ExchangeBtn = ({ onPress }: ExchangeBtnProps) => {
  const ExchangeBtnContainer = styled(TouchableOpacity)`
    background: #23EBC3;
    border-radius: 16px;
    padding: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 58px;
    height: 58px;
  `;

  return (
    <Spacer>
      <ExchangeBtnContainer onPress={onPress}>
        <Image
          source={require("@/assets/images/exchange.svg")}
          style={{ width: 24, height: 24 }}
          contentFit="contain"
          alt="Exchange"
        />
      </ExchangeBtnContainer>
    </Spacer>
  )
}