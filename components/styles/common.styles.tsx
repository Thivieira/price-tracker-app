import { styled } from "styled-components/native";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import * as Progress from 'react-native-progress';
import { Image } from "expo-image";

export const AuthContainer = styled(View)`
  flex: 1;
  background-color: #fff;
`;

export const AuthContentContainer = styled(View)`
  flex: 1;
  background-color: #fff;
  padding: 24px;
`;

export const AuthTitle = styled(Text)`
  font-family: 'DMSans-Bold';
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 46px;
  text-align: center;
  letter-spacing: -1px;
  color: #12033A;
  margin-top: 15px;
  margin-bottom: 120px;
`;

export const AuthSubtitle = styled(Text)`
  font-family: 'DMSans-Medium';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.3px;
  color: rgba(18, 3, 58, 0.8);
  margin-top: 4px;
`;

export const AuthFormContainer = styled(View)`
  background-color: #fff;
  padding: 24px;
  flex-shrink: 1;
`;

export const AuthLink = styled(TouchableOpacity)`
  margin-left: 10px;
  margin-bottom: 22px;
`;

export const AuthLinkText = styled(Text)`
  font-family: 'DMSans-Bold';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 26px;
  letter-spacing: -0.355556px;
  color: #23EBC3;
`;

export const AuthNavigationButton = ({ onPress }: { onPress: () => void }) => {
  const ButtonContainer = styled(TouchableOpacity)`
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
    <ButtonContainer onPress={onPress}>
      <Image
        source={require(`@/assets/images/right-caret.svg`)}
        style={{ width: 24, height: 24 }}
        contentFit="contain"
        alt={direction === 'right' ? 'Next' : 'Back'}
      />
    </ButtonContainer>
  );
};

export const ProgressBarContainer = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 60px;
`;

export const ProgressBar = styled(Progress.Bar)`
  margin-top: 50px;
`; 