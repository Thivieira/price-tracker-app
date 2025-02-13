import { Image } from "expo-image";
import { TouchableOpacity } from "react-native";
import { styled } from "styled-components/native";

export const CryptoSymbolScreenTitleContainer = styled.View`
  flex-direction: column;
  align-items: center;
  height: 200px;
  width: 100%;
  margin-top: 180px;
`;

export const CoinImage = styled(Image)`
  width: 76px;
  height: 76px;
  border-radius: 100px;
`;

export const CryptoSymbolScreenTitleText = styled.Text`
  font-family: 'DMSans-Bold';
  font-size: 24px;
  line-height: 34px;
  text-align: center;
  letter-spacing: -0.4px;
  color: #ffffff;
  margin-top: 5px;
`;

export const CoinPrice = styled.Text`
  font-family: 'DMSans-Bold';
  font-size: 24px;
  line-height: 34px;
  text-align: center;
  letter-spacing: -0.4px;
  color: #ffffff;
`;


export const FavoriteButton = ({ onPress, isFavorite }: { onPress: () => void, isFavorite: boolean }) => {
  const FavoriteButtonTouchable = styled(TouchableOpacity)`
    position: absolute;
    top: 45px;
    right: 24px;
  `;

  return <FavoriteButtonTouchable onPress={onPress}>
    <Image
      source={isFavorite ? require("@/assets/images/favorite-filled.svg") : require("@/assets/images/favorite.svg")}
      style={{ width: 20, height: 18 }}
      contentFit="contain"
    />
  </FavoriteButtonTouchable>
}

export const TitleSection = styled.View`
  height: 40px;
  margin-top: 175px;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  position: relative;
`;

export const TitleText = styled.Text`
  position: relative;
  left: 20px;
  font-family: 'DMSans-Bold';
  font-weight: 700;
  letter-spacing: -0.4px;
  font-style: normal;
  font-size: 18px;
  line-height: 24px;
  color: #000000;
`;
