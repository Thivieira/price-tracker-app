import { styled } from "styled-components/native";
import {
  AuthContainer,
  AuthContentContainer,
  AuthTitle,
  AuthSubtitle,
  AuthFormContainer
} from "./common.styles";
import { SignUpFormNextButton } from "./signup.styles";

export const SignInContainer = AuthContainer;
export const SignInContentContainer = AuthContentContainer;
export const SignInTitle = styled(AuthTitle)`
  margin-bottom: 12px;
  color: rgba(18, 3, 58, 1);
`;
export const SignInSubtitle = styled(AuthSubtitle)`
  margin-top: 12px;
  color: rgba(104, 104, 115, 1);
`;
export const SignInFormContainer = styled(AuthFormContainer)`
  margin-top: 40px;
`;

export const SignInFormNextButton = styled(SignUpFormNextButton)`
`;