import styled from 'styled-components/native';
import { Image } from 'expo-image';
import { View } from 'react-native';


export const CoinListMainContainer = styled(View)`
  flex: 2;

  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
  padding: 16px 0;
`;

export const CoinTextContainer = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
`;


export const CoinTitle = styled.Text`
  font-family: 'DMSans-Bold';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: -0.4px;
  color: #12033A;
`;

export const CoinSeeAll = styled.Text`
font-family: 'DMSans-Medium';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 24px;

letter-spacing: -0.3px;

color: #23EBC3;
`;

export const CoinListContainer = styled(View)`
  flex: 2;

  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
  padding: 16px 0;
`;

export const CoinEmptyStateContainer = styled.View`
  width: 100%;
  height: 120px;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
`;

export const CoinEmptyStateText = styled.Text`
  font-family: 'DMSans-Medium';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.3px;
  color: rgba(18, 3, 58, 0.8);
`;
export const CoinEmptyState = () => {
  return (
    <CoinEmptyStateContainer>
      <CoinEmptyStateText>No Coin yet, add some to get started</CoinEmptyStateText>
    </CoinEmptyStateContainer>
  )
}


export const CoinContainer = styled.View`
  width: 100%;
  height: 88px;
  background-color: #F1F3FA;
  border-radius: 12px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;


export const CoinImage = styled(Image)`
  width: 40px;
  height: 40px;
`;


export const CoinName = styled.Text`
  font-family: 'DMSans-Medium';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
`;
