import { BackgroundImage, ScreenContainer } from "@/components/styles/onboarding.styles";

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
      {/* <Hero image={image as 'price-control-togles'} />
      <Title title={title} />
      <Info description={description} /> */}
    </ScreenContainer>
  )
}