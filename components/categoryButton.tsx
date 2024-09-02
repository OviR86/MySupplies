import { StyleSheet, Text } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Colors } from '~/assets/colors';

type Props = {
  category: string;
  onPress: (category: string) => void;
  isSelected: boolean;
};

const capitaliseFirstLetter = (text: string) => {
  return text
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const CategoryButton = ({ category, onPress, isSelected }: Props) => {
  return (
    <TouchableOpacity
      style={[styles.container, isSelected && styles.selectedContainer]}
      onPress={() => onPress(category)}>
      <Text style={[styles.text, isSelected && styles.selectedText]}>
        {capitaliseFirstLetter(category)}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryButton;

const styles = StyleSheet.create({
  container: {
    height: 30,
    backgroundColor: Colors.blueGray,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    minWidth: 100,
    marginHorizontal: 10,
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  selectedContainer: {
    backgroundColor: Colors.purpleMid,
  },
  text: {
    fontWeight: '400',
    fontSize: 13,
    marginHorizontal: 10,
  },
  selectedText: {
    color: 'white',
  },
});
