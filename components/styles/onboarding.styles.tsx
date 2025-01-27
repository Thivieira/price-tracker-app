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
  position: relative;
  width: 100%;
  height: 500px;
  top: 0;
  margin-bottom: 278px;
`

export const Hero = styled(Image)`
  flex: 1;
  position: relative;
  width: 100%;
  height: 300px;
  top: 0;
  z-index: 1;
`

const TitleContainer = styled(View)`

`
const TitleText = styled(Text)`

`


export const InfoContainer = styled(View)`flex: 1; background-color: #DC143C;`
export const DescriptionText = styled(Text)`font-size: 16px;`






export const ImageContainer = styled(Image)`flex: 1; background-color: #DC143C;`

// Create an image mapping object
export const imageMapping = {
  'price-control-togles': require('@/assets/images/onboarding/price-control-togles.svg'),
  'manage-your-portfolio': require('@/assets/images/onboarding/manage-your-portfolio.svg'),
  'stay-secure': require('@/assets/images/onboarding/stay-secure.svg'),
} as const;

// Update the type to only allow valid image keys
export type ImageKey = keyof typeof imageMapping;

// export const Hero = ({ image }: { image: ImageKey }) => {
//   return <ImageContainer>
//     <Image source={imageMapping[image]} style={{ width: '100%', height: '100%' }} />
//   </ImageContainer>
// }



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

export const AnimatedDot = styled(Animated.View) <{ isActive: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  margin: 0 4px;
  background-color: ${({ isActive }: { isActive: boolean }) => isActive ? '#12033A' : 'rgba(18, 3, 58, 0.2)'};
`

export const Dot: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: isActive ? 1.2 : 1 }],
      backgroundColor: isActive ? '#12033A' : 'rgba(18, 3, 58, 0.2)',
    };
  });

  return <AnimatedDot style={animatedStyle} />;
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