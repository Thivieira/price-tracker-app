import styled from 'styled-components/native';
import { Image } from 'expo-image';
import { View } from 'react-native';

export const BookmarksContainer = styled.View`
  position: relative;
  margin-top: 24px;
  flex-direction: column;
  align-items: center;
  padding: 0 12px;
  position: relative;
  width: 100%;
  justify-content: center;
  padding: 0 24px;
`;


export const BookmarksTextContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;


export const BookmarksTitle = styled.Text`
  font-family: 'DMSans-Bold';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: -0.4px;
  color: #12033A;
`;

export const BookmarksSeeAll = styled.Text`
font-family: 'DMSans-Medium';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 24px;

letter-spacing: -0.3px;

color: #23EBC3;
`;

export const BookmarksCoinsContainer = styled(View)`
  flex: 2;

  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
  padding: 16px 0;
`;

export const BookmarksEmptyStateContainer = styled.View`
  width: 100%;
  height: 120px;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
`;

export const BookmarksEmptyStateText = styled.Text`
  font-family: 'DMSans-Medium';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.3px;
  color: rgba(18, 3, 58, 0.8);
`;
export const BookmarksEmptyState = () => {
  return (
    <BookmarksEmptyStateContainer>
      <BookmarksEmptyStateText>No bookmarks yet, add some to get started</BookmarksEmptyStateText>
    </BookmarksEmptyStateContainer>
  )
}