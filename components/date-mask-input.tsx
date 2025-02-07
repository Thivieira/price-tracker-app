import React from 'react';
import { TextInputProps } from 'react-native';
import styled from 'styled-components/native';
import { formatAndValidateDate } from '../utils/date-mask';

const StyledInput = styled.TextInput`
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

interface DateMaskInputProps extends Omit<TextInputProps, 'onChangeText'> {
  value: string;
  onChange: (value: string, isValid: boolean) => void;
}

const DateMaskInput: React.FC<DateMaskInputProps> = ({
  value,
  onChange,
  ...props
}) => {
  const handleChangeText = (text: string) => {
    const { formattedValue, isValid } = formatAndValidateDate(text);
    onChange(formattedValue, isValid);
  };

  return (
    <StyledInput
      {...props}
      value={value}
      onChangeText={handleChangeText}
      placeholder=""
      selectionColor={'rgba(18, 3, 58, 1)'}
      placeholderTextColor={'rgba(18, 3, 58, 1)'}
      cursorColor={'rgba(18, 3, 58, 1)'}
      keyboardType="numeric"
      maxLength={10}
    />
  );
};

export default DateMaskInput; 