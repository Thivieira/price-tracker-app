import { View } from "react-native";
import { BackgroundImage, Hero, imageMapping, ScreenContainer } from "../../styles/onboarding.styles";


export default function Two({
  image,
  title,
  description
}: {
  image: string;
  title: string;
  description: string;
}) {
  return (
    <ScreenContainer>
      <BackgroundImage
        source={require('@/assets/images/onboarding/top-shelf.svg')}
        contentFit="cover"
      />
      <Hero source={imageMapping[image as 'manage-your-portfolio']} />
      {/* <Title title={title} />
      <Info description={description} /> */}
    </ScreenContainer>
  )
}
