import { View } from "react-native";
import { Hero, ScreenContainer } from "../../styles/onboarding.styles";


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
      {/* <Hero image={image as 'manage-your-portfolio'} /> */}
      {/* <Title title={title} />
      <Info description={description} /> */}
    </ScreenContainer>
  )
}
