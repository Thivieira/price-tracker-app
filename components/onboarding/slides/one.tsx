import { Hero, BackgroundImage, ScreenContainer, imageMapping } from "@/components/styles/onboarding.styles";

export default function One({
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
      <Hero source={imageMapping[image as 'price-control-togles']} contentFit="contain" />
      {/* <Title title={title} />
      <Info description={description} /> */}
    </ScreenContainer>
  )
}