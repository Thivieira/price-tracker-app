import React, { useState } from 'react';
import styled from 'styled-components/native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { TextInputProps } from 'react-native';

/**
 * 
 * 
*
*
*width: 312px;
*height: 64px;
*
*
* 
*flex: none;
*order: 1;
*flex - grow: 0;
*
*
*
*
*box - sizing: border - box;
*
*position: absolute;
*left: 0 %;
*right: 0 %;
*top: 0 %;
*bottom: 0 %;
*
*
*background: #FFFFFF;
*
*border: 1px solid rgba(18, 3, 58, 0.1);
*border - radius: 16px;
*
*
*
*
*position: absolute;
*width: 66px;
*height: 24px;
*left: 20px;
*top: 20px;
*
*
*font - family: 'DM Sans';
*font - style: normal;
*font - weight: 500;
*font - size: 14px;
*line - height: 24px;
*
*display: flex;
*align - items: center;
*letter - spacing: -0.3px;
*
*
*color: #686873;
*
 * 
 * 
 * 
 * 
 * 
 */


const Container = styled.View`
  height: 64px;
  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 8px 0;
`;

const InputContainer = styled.View<{ isFocused: boolean }>`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #FFFFFF;
  border: 1px solid ${props => props.isFocused ? 'rgba(18, 3, 58, 0.4)' : 'rgba(18, 3, 58, 0.1)'};
  border-radius: 16px;
  padding: 0;
  transition: border-color 0.2s ease;
`;

const StyledInput = styled.TextInput`
  flex: 1;
  padding-top: 20px;
  padding-left: 20px;
  font-family: 'DMSans_500Medium';
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
  font-family: 'DMSans_500Medium';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: #686873;
  letter-spacing: -0.3px;
  display: flex;
  align-items: center;
`;

interface FloatingLabelInputProps<T extends FieldValues> extends Omit<TextInputProps, 'onChangeText'> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  rules?: object;
}

const FloatingLabelInput = <T extends FieldValues>({
  label,
  control,
  name,
  rules,
  ...props
}: FloatingLabelInputProps<T>) => {
  const [isFocused, setIsFocused] = useState(false);

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
    <Container>
      <InputContainer isFocused={isFocused}>
        <AnimatedLabel style={animatedLabelStyle}>
          {label}
        </AnimatedLabel>
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
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
            />
          )}
        />
      </InputContainer>
    </Container>
  );
};

export default FloatingLabelInput;