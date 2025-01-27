import { Hero, BackgroundImage, ScreenContainer, imageMapping, InfoContainer, DescriptionText, TitleText } from "@/components/styles/onboarding.styles";

export default function One({
  image,
  title,
  description
}: {
  image: string;
  title: string;
  description: string;
}) {
  const source = imageMapping[image as keyof typeof imageMapping];

  return (
    <ScreenContainer>
      <BackgroundImage
        source={require('@/assets/images/onboarding/top-shelf.svg')}
        contentFit="cover"
      />
      <Hero
        source={source}
        contentFit="contain"
      />
      <InfoContainer>
        <TitleText>{title}</TitleText>
        <DescriptionText>{description}</DescriptionText>
      </InfoContainer>
    </ScreenContainer>
  );
}