import React, { useState } from 'react';
import {
  useAnimatedStyle,
  withSpring,
  useSharedValue
} from 'react-native-reanimated';
import { Control, Controller, FieldErrors, FieldValues, Path } from 'react-hook-form';
import { TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ErrorMessage from './error-message';
import DateMaskInput from './date-mask-input';
import { Container, InputContainer, AnimatedLabel, IconContainer, StyledInput } from './styles/floating-label-input.styles';

interface FloatingLabelInputProps<T extends FieldValues> extends Omit<TextInputProps, 'onChangeText'> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  rules?: object;
  isPassword?: boolean;
  showEye?: boolean;
  isDate?: boolean;
  isNumeric?: boolean;
  error?: FieldErrors<T>;
}

const FloatingLabelInput = <T extends FieldValues>({
  label,
  control,
  name,
  rules,
  isPassword,
  isDate,
  showEye = true,
  isNumeric,
  ...props
}: FloatingLabelInputProps<T>) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const labelPosition = useSharedValue(isFocused ? 4 : 16);

  const animatedLabelStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: withSpring(labelPosition.value) }],
  }));

  const handleFocus = () => {
    setIsFocused(true);
    labelPosition.value = 4;
  };

  const handleBlur = (hasValue: boolean) => {
    setIsFocused(false);
    if (!hasValue) {
      labelPosition.value = 16;
    }
  };

  const handleChangeText = (text: string, onChange: (...event: any[]) => void) => {
    if (isNumeric) {
      // Remove any non-digit characters
      const numericValue = text.replace(/\D/g, '');
      onChange(numericValue);
    } else {
      onChange(text);
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
        <Container hasError={!!error}>
          <InputContainer isFocused={isFocused} hasError={!!error}>
            <AnimatedLabel style={animatedLabelStyle}>
              {label}
            </AnimatedLabel>
            {isDate ? (
              <DateMaskInput
                {...props}
                value={value}
                onChange={(newValue, isValid) => {
                  onChange(newValue);
                }}
                onFocus={handleFocus}
                onBlur={() => {
                  onBlur();
                  handleBlur(!!value);
                }}
              />
            ) : (
              <StyledInput
                {...props}
                value={value}
                onChangeText={(text) => handleChangeText(text, onChange)}
                onFocus={handleFocus}
                onBlur={() => {
                  onBlur();
                  handleBlur(!!value);
                }}
                placeholder=""
                selectionColor={'rgba(18, 3, 58, 1)'}
                placeholderTextColor={'rgba(18, 3, 58, 1)'}
                cursorColor={'rgba(18, 3, 58, 1)'}
                secureTextEntry={isPassword && !showPassword}
                keyboardType={isNumeric ? 'numeric' : 'default'}
              />
            )}
            {isPassword && showEye && (
              <IconContainer onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={24}
                  color="rgba(18, 3, 58, 0.4)"
                />
              </IconContainer>
            )}
          </InputContainer>
          {error && <ErrorMessage message={error.message} />}
        </Container>
      )}
    />
  );
};

export default FloatingLabelInput;