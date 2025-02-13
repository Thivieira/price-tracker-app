import styled from 'styled-components/native';

export const PriceRowContainer = styled.View<{ isEven: boolean }>`
  width: 100%;
  height: 80px;
  background-color: ${props => props.isEven ? '#F1F3FA' : '#FFFFFF'};
  border-radius: 12px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
`;

export const LabelContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const Label = styled.Text`
  font-family: 'DMSans-Medium';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #121212;
`;

export const Price = styled.Text`
  font-family: 'DMSans-Medium';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: right;
  color: #000000;
`; 