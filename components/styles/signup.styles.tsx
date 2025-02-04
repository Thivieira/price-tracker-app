import { styled } from "styled-components/native";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import * as Progress from 'react-native-progress';
import { Image } from "expo-image";
import {
  AuthContainer,
  AuthContentContainer,
  AuthTitle,
  AuthSubtitle,
  AuthFormContainer
} from "./common.styles";

export const SignUpContainer = AuthContainer;
export const SignUpContentContainer = AuthContentContainer;
export const SignUpTitle = AuthTitle;
export const SignUpSubtitle = AuthSubtitle;
export const SignUpFormContainer = AuthFormContainer;

export const BackgroundContainer = styled(View)`
  flex: 1;
  background-color: #fff;
`;

export const SignUpIndexContainer = styled(View)`
  flex: 1;
  background-color: #fff;
  padding: 24px;
`;

export const SignUpPhoneVerificationContainer = styled(SignUpIndexContainer)`
  background-color: #fff;
`;

export const GoBackButton = ({ onPress }: { onPress: () => void }) => {
  const GoBackButtonTouchable = styled(TouchableOpacity)`
    position: absolute;
    top: 45px;
    left: 24px;
  `;

  return (
    <GoBackButtonTouchable onPress={onPress}>
      <Image
        source={require("@/assets/images/arrow-left.svg")}
        style={{ width: 14, height: 14 }}
        contentFit="contain"
        alt="Go back"
      />
    </GoBackButtonTouchable>
  )
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

export const PhoneFormContainer = styled(View)`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const PhoneFormTitle = styled(Text)`
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

export const PhoneFormAlreadyHaveAccountTextContainer = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const PhoneFormAlreadyHaveAccountText = styled(Text)`
  font-family: 'DMSans-Medium';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.3px;
  color: rgba(18, 3, 58, 0.8);
  margin-top: 15px;
  height: 60px;
  margin-right: 10px;
`;

export const PhoneFormAlreadyHaveAccountLink = styled(TouchableOpacity)`
  margin-left: 10px;
  margin-bottom: 22px;
`;

export const PhoneFormAlreadyHaveAccountLinkText = styled(Text)`
  font-family: 'DMSans-Bold';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 26px;
  letter-spacing: -0.355556px;
  color: #23EBC3;
`;

export const PhoneFormTermsAndConditionsTextContainer = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 140px;
  padding: 0px 20px;
`;

export const PhoneFormTermsAndConditionsText = styled(Text)`
  font-family: 'DMSans-Medium';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.3px;
  color: rgba(18, 3, 58, 0.4);
`;

export const PhoneFormTermsAndConditionsLink = styled(TouchableOpacity)`
  margin-left: 4px;
  margin-right: 4px;
`;

export const PhoneFormTermsAndConditionsLinkText = styled(Text)`
  font-family: 'DMSans-Medium';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.3px;
  color: rgba(18, 3, 58, 1);
`;

export const VerificationFormContainer = styled(View)`
    flex: 1;
    background-color: #fff;
`;

export const VerificationFormTitle = styled(PhoneFormTitle)`
  margin-top: 4px;
  margin-bottom: 0px;
`;

export const VerificationFormSubtitle = styled(PhoneFormTitle)`
font-family: 'DMSans-Medium';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 24px;
display: flex;
align-items: center;
text-align: center;
letter-spacing: -0.3px;
color: rgba(18, 3, 58, 0.8);
margin-top: 4px;
margin-bottom: 100px;
`;

interface VerificationFormUnitInputProps {
  isFocused: boolean;
}

export const VerificationFormUnitInput = styled(TextInput) <VerificationFormUnitInputProps>`
  width: 65px;
  height: 65px;
  margin: 0 6px;
  border-radius: 20px;
  border-width: 1px;
  border-color: ${props => props.isFocused ? 'rgba(18, 3, 58, 1)' : 'rgba(18, 3, 58, 0.1)'};
  font-size: 24px;
  font-family: 'DMSans-Bold';
  text-align: center;
  color: #12033A;
  background-color: #fff;
  padding: 10px;
`;

export const VerificationFormUnitInputContainer = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 32px;
`;

export const VerificationFormAlreadyHaveAccountLink = styled(TouchableOpacity)`
  margin-top: 26px;
  justify-content: center;
  align-items: center;
`;

export const VerificationFormAlreadyHaveAccountLinkText = styled(Text)`
  font-family: 'DMSans-Bold';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 26px;
  letter-spacing: -0.355556px;
  color: #23EBC3;
`;

export const SignUpPersonalInformationContainer = styled(View)`
  flex: 1;
  background-color: #fff;
  padding: 24px;
`;

export const SignUpPersonalInformationTitle = styled(Text)`
  font-family: 'DMSans-Bold';
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 46px;
  text-align: center;
  letter-spacing: -1px;
  color: #12033A;
`;

export const SignUpPersonalInformationSubtitle = styled(Text)`
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

export const SignUpPersonalInformationFormContainer = styled(View)`
  background-color: #fff;
  padding: 24px;
  flex-shrink: 1;
`;

export const SignUpFormNextButton = ({ onPress }: { onPress: () => void }) => {
  const SignUpFormNextButtonContainer = styled(TouchableOpacity)`
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
    <SignUpFormNextButtonContainer onPress={onPress}>
      <Image
        source={require("@/assets/images/right-caret.svg")}
        style={{ width: 24, height: 24 }}
        contentFit="contain"
        alt="Next"
      />
    </SignUpFormNextButtonContainer>
  )
}