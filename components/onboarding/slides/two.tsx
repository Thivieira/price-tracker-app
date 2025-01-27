import { BackgroundImage, DescriptionText, Hero, imageMapping, InfoContainer, ScreenContainer, TitleText } from "../../styles/onboarding.styles";


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
      <InfoContainer>
        <TitleText>{title}</TitleText>
        <DescriptionText>{description}</DescriptionText>
      </InfoContainer>
    </ScreenContainer>
  )
}
