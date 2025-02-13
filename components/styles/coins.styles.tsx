import styled from 'styled-components/native';
import { Image } from 'expo-image';
import { View, TouchableOpacity } from 'react-native';


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
    flex-direction: column;
  flex-wrap: wrap;
  padding: 16px 0;
`;

export const CoinEmptyStateContainer = styled.View`
  width: 100%;
  height: 80px;
  background-color: rgba(241, 243, 250, 0.5);
  border-radius: 12px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
`;

export const CoinEmptyStateLeft = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const CoinEmptyStateCircle = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 100px;
  background-color: rgba(18, 3, 58, 0.1);
`;

export const CoinEmptyStateSymbol = styled.View`
  width: 60px;
  height: 24px;
  border-radius: 6px;
  background-color: rgba(18, 3, 58, 0.1);
`;

export const CoinEmptyStatePrice = styled.View`
  width: 80px;
  height: 20px;
  border-radius: 6px;
  background-color: rgba(18, 3, 58, 0.1);
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
      <CoinEmptyStateLeft>
        <CoinEmptyStateCircle />
        <CoinEmptyStateSymbol />
      </CoinEmptyStateLeft>
      <CoinEmptyStatePrice />
    </CoinEmptyStateContainer>
  )
}


export const CoinContainer = styled.TouchableOpacity<{ isEven: boolean }>`
  width: 100%;
  height: 80px;
  background-color: ${props => props.isEven ? '#F1F3FA' : '#FFFFFF'};
  border-radius: 12px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
`;

export const CoinImageContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;


export const CoinImage = styled(Image)`
  width: 50px;
  height: 50px;
  border-radius: 100px;
`;


export const CoinName = styled.Text`
  font-family: 'DMSans-Bold';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
`;

export const CoinPrice = styled.Text`
font-family: 'DMSans-Regular';
font-style: normal;
font-weight: 400;
font-size: 18px;
line-height: 20px;
text-align: right;
color: #12033A;
`;
