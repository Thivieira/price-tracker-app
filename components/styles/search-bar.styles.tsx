import { Image } from 'expo-image';
import styled from 'styled-components/native';

export const SearchBarContainer = styled.View`
  position: relative;
  align-items: center;
  position: relative;
  width: 100%;
  padding: 0 24px;
`;

export const SearchInputContainer = styled.View`
  align-items: center;
  width: 100%;
`;


export const SearchInput = styled.TextInput`
  padding: 10px;
  padding-left: 35px;
  width: 100%; 
  height: 48px;
  background: rgba(241, 243, 250, 1);
  border: 1px solid rgba(41, 45, 50, 0.1);
  border-radius: 100px;
  color: rgba(18, 3, 58, 1);
`;

export const SearchIcon = styled(Image)`
  position: absolute;
  left: 15px;
  top: 16px;
  width: 16px;
  height: 16px;
  z-index: 1;
  color: #c4c3d4;
`
