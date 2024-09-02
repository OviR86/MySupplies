import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '~/assets/colors';

export type GeneralButtontype = {
  title: string;
  OnPress: () => void;
};

const GeneralButton = (props: GeneralButtontype) => {
  return (
    <TouchableOpacity onPress={props.OnPress} style={styles.container}>
      <Text style={styles.text}>{props.title}</Text>
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
    width: 70,
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
  text: {
    fontWeight: '400',
    fontSize: 13,
    marginHorizontal: 10,
    color: 'white',
  },
});
