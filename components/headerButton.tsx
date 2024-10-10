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

const HeaderButton = (props: Props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      <FontAwesome name={props.name} size={props.size} color={props.color} />
    </TouchableOpacity>
  );
};

const HeaderButtonWithBadge = withBadge(HeaderButton);

export { HeaderButton, HeaderButtonWithBadge };
