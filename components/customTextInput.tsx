import { StyleProp, StyleSheet, Text, TextInput, TextStyle, View, ViewStyle } from 'react-native';
import React from 'react';

type TextInputType = {
  placeholder: string;
  //   contaierStyle: StyleProp<ViewStyle>;
  textStyle: StyleProp<TextStyle>;
  placeholderTextColor?: string;
  onChangeText: (text: string) => void;
  value?: string;
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
      />
    </>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({});
