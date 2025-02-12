import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

export const Container = styled.View<{ hasError?: boolean }>`
  height: ${props => props.hasError ? '120px' : '64px'};
  flex: none;
  flex-grow: 0;
  margin: 8px 0;
`;

export const InputContainer = styled.View<{ isFocused: boolean; hasError?: boolean }>`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: ${props => props.hasError ? '60px' : '0'};
  background: #FFFFFF;
  border: 1px solid ${props =>
    props.hasError
      ? '#FF3B30'
      : props.isFocused
        ? 'rgba(18, 3, 58, 0.4)'
        : 'rgba(18, 3, 58, 0.1)'
  };
  border-radius: 16px;
  padding: 0;
  transition: border-color 0.2s ease;
`;

export const StyledInput = styled.TextInput`
  flex: 1;
  padding-top: 20px;
  padding-left: 20px;
  font-family: 'DMSans-Medium';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: #686873;
  letter-spacing: -0.3px;
`;

export const AnimatedLabel = styled(Animated.Text)`
  position: absolute;
  left: 20px;
  right: 20px;
  height: 24px;
  font-family: 'DMSans-Medium';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: #686873;
  letter-spacing: -0.3px;
  display: flex;
  align-items: center;
`;

export const IconContainer = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  top: 20px;
  height: 24px;
  justify-content: center;
`;