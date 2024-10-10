import { InputModeOptions, StyleProp, TextInput, TextStyle } from 'react-native';
import React from 'react';

type TextInputType = {
  placeholder: string;
  textStyle: StyleProp<TextStyle>;
  placeholderTextColor?: string;
  onChangeText: (text: string) => void;
  value?: string;
  secureTextEntry?: boolean;
  inputMode?: InputModeOptions | undefined;
};

const CustomTextInput = (props: TextInputType) => {
  return (
    <>
      <TextInput
        placeholder={props.placeholder}
        style={props.textStyle}
        placeholderTextColor={props.placeholderTextColor}
        onChangeText={props.onChangeText}
        value={props.value}
        secureTextEntry={props.secureTextEntry}
        inputMode={props.inputMode}
      />
    </>
  );
};

export default CustomTextInput;
