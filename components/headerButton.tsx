import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '~/assets/colors';

type Props = {
  onPress: () => void;
};

const HeaderButton = ({ onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <FontAwesome name="shopping-basket" size={24} color={Colors.purpleMid} />
    </TouchableOpacity>
  );
};

export default HeaderButton;

const styles = StyleSheet.create({});
