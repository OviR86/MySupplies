import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import withBadge from './withBadge';

type IconName = keyof typeof FontAwesome.glyphMap;

type Props = {
  onPress: () => void;
  name: IconName;
  color: string;
  size: number;
  style?: StyleProp<ViewStyle>;
};

const HeaderButton = ({ onPress, name, color, size, style }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <FontAwesome name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};

const HeaderButtonWithBadge = withBadge(HeaderButton);

export { HeaderButton, HeaderButtonWithBadge };
