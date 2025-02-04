import React from 'react';
import styled from 'styled-components/native';

const ErrorText = styled.Text`
  position: absolute;
  bottom: 0;
  left: 4px;
  font-family: 'DMSans-Regular';
  font-size: 12px;
  line-height: 16px;
  color: #FF3B30;
`;

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <ErrorText>{message}</ErrorText>;
};

export default ErrorMessage; 