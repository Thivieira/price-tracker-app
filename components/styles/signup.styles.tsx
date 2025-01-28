import { styled } from "styled-components/native";
import { View } from "react-native";
import * as Progress from 'react-native-progress';

export const BackgroundContainer = styled(View)`
  flex: 1;
  background-color: #fff;
`;

export const ProgressBarContainer = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;


export const ProgressBar = styled(Progress.Bar)`
  margin-top: 50px;
`;


