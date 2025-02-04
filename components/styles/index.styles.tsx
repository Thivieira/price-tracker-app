import { Image } from 'expo-image';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'styled-components/native'

export const BackgroundContainer = styled(View)`
flex: 1; 
background-color: #DC143C;

display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
padding: 20px;
`

export const TitleText = styled(Text)`
font-family: 'DMSans-Bold';
font-style: normal;
font-weight: 700;
font-size: 42px;
line-height: 52px;
display: flex;
align-items: center;
text-align: center;
letter-spacing: -1px;
color: #FFFFFF;
margin-top: 50px;
`

export const ImageContainer = styled(Image)`
  margin-top: 75px;
  margin-bottom: 75px;
  width: 400px;
  height: 400px;
`

export const ButtonContainer = styled(View)`
width: 100%;
`

export const ActionButton = styled(TouchableOpacity)`
width: 100%;
padding: 20px;
border-radius: 15px;
display: block;
background-color: #23EBC3;
`

export const ActionButtonText = styled(Text)`
font-family: 'DMSans-Bold';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 26px;
color: #FFFFFF;
text-align: center;
letter-spacing: -0.355556px;
`

export const MutedActionButton = styled(TouchableOpacity)`
width: 100%;
padding: 20px;
border-radius: 15px;
display: block;
`

export const MutedActionButtonText = styled(Text)`
font-family: 'DMSans-Bold';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 26px;
color: #FFFFFF;
text-align: center;
letter-spacing: -0.355556px;
`






