import { Image } from 'expo-image';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'styled-components/native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

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
  height: 500px;
  top: 0;
`

export const Hero = styled(Image)`
  position: absolute;
  width: 250px;
  height: 250px;
  top: 100px;
  z-index: 2;
  align-self: center;
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
font-family: 'DMSans_700Bold';
font-style: normal;
font-weight: 700;
font-size: 36px;
line-height: 46px;
text-align: center;
letter-spacing: -1px;
color: rgba(18, 3, 58, 1);
`
export const DescriptionText = styled(Text)`
position: relative;
top: 20px;
font-family: 'DMSans_500Medium';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 24px;
text-align: center;
letter-spacing: -0.3px;
color: rgba(18, 3, 58, 0.8);
`

export const ImageContainer = styled(Image)`flex: 1; background-color: #DC143C;`

export const imageMapping = {
  'price-control-togles': require('@/assets/images/onboarding/price-control-togles.svg'),
  'manage-your-portfolio': require('@/assets/images/onboarding/manage-your-portfolio.svg'),
  'stay-secure': require('@/assets/images/onboarding/stay-secure.svg'),
} as const;

export type ImageKey = keyof typeof imageMapping;

export const ActionContainer = styled(View)`flex: 1; background-color: #DC143C;`

export const FooterContainer = styled(View)`
  width: 100%;
  padding: 20px 40px;
  justify-content: space-between;
  align-items: center;
  display: flex;
  flex-direction: row;
  background-color: #ffffff;
  margin-bottom: 30px;
`

export const DotsContainer = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const AnimatedDot = styled(AnimatedTouchable) <{ isActive: boolean, onPress: () => void }>`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  margin: 0 4px;
  background-color: ${({ isActive }) => isActive ? '#12033A' : 'rgba(18, 3, 58, 0.2)'};
`

export const Dot: React.FC<{ isActive: boolean, onPress: () => void }> = ({ isActive, onPress }) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: isActive ? 1.2 : 1 }],
      backgroundColor: isActive ? '#12033A' : 'rgba(18, 3, 58, 0.2)',
    };
  });

  return <AnimatedDot style={animatedStyle} onPress={onPress} />;
};


export const MutedActionButton = styled(TouchableOpacity)`
  display: flex; 
  align-items: center; 
  text-align: center;
`
export const MutedActionButtonText = styled(Text)`
font-family: 'DMSans_700Bold'; 
font-style: normal; 
font-weight: 700; 
font-size: 16px; 
line-height: 26px; 
letter-spacing: -0.355556px; 
color: rgba(18, 3, 58, 0.4);
`

export const NextActionButton = styled(TouchableOpacity)`
  display: flex;
  align-items: center;
  text-align: center;
`

export const NextActionButtonText = styled(Text)`
font-family: 'DMSans_700Bold';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 26px;  
letter-spacing: -0.355556px;
color: #12033A;
`