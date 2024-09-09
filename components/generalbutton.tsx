import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import React from 'react';
import { Colors } from '~/assets/colors';
import { customElevation } from '~/assets/styles';

export type GeneralButtontype = {
  title: string;
  OnPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const GeneralButton = (props: GeneralButtontype) => {
  return (
    <TouchableOpacity
      onPress={props.OnPress}
      style={[styles.container, props.style, customElevation]}>
      <Text style={[styles.text, props.textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default GeneralButton;

const styles = StyleSheet.create({
  container: {
    height: 30,
    backgroundColor: Colors.purpleMid,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    minWidth: 70,
    marginHorizontal: 10,
    marginTop: 5,
  },
  text: {
    fontWeight: '400',
    fontSize: 13,
    marginHorizontal: 10,
    color: 'white',
  },
});
