import { ScreenContainer } from "@/components/styles/onboarding.styles";
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
      {/* <Hero image={image as 'stay-secure'} /> */}
      {/* <Title title={title} />
      <Info description={description} /> */}
    </ScreenContainer>
  )
}