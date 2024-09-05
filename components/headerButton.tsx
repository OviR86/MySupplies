import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

type IconName = keyof typeof FontAwesome.glyphMap;

type Props = {
  onPress: () => void;
  name: IconName;
  color: string;
  size: number;
};

const HeaderButton = ({ onPress, name, color, size }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <FontAwesome name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};

export default HeaderButton;

const styles = StyleSheet.create({});
