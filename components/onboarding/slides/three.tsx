import { BackgroundImage, Hero, imageMapping, ScreenContainer } from "@/components/styles/onboarding.styles";
import { View } from "react-native";

export default function Three({
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
      <Hero source={imageMapping[image as 'stay-secure']} />
      {/* <Title title={title} />
      <Info description={description} /> */}
    </ScreenContainer>
  )
}