import React, { useState } from 'react';
import styled from 'styled-components/native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue
} from 'react-native-reanimated';
import { Control, Controller, FieldErrors, FieldValues, Path } from 'react-hook-form';
import { TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ErrorMessage from './error-message';



const Container = styled.View<{ hasError?: boolean }>`
  height: ${props => props.hasError ? '88px' : '64px'};
  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 8px 0;
`;

const InputContainer = styled.View<{ isFocused: boolean; hasError?: boolean }>`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: ${props => props.hasError ? '24px' : '0'};
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

const AnimatedLabel = styled(Animated.Text)`
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

const IconContainer = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  top: 20px;
  height: 24px;
  justify-content: center;
`;

interface FloatingLabelInputProps<T extends FieldValues> extends Omit<TextInputProps, 'onChangeText'> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  rules?: object;
  isPassword?: boolean;
  error?: FieldErrors<T>;
}

const FloatingLabelInput = <T extends FieldValues>({
  label,
  control,
  name,
  rules,
  isPassword,
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
            <StyledInput
              {...props}
              value={value}
              onChangeText={onChange}
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
            />
            {isPassword && (
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