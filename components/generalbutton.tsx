import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React, { useState } from 'react';
import { Colors } from '~/assets/styles';
import { customElevation } from '~/assets/styles';

export type GeneralButtontype = {
  title: string;
  OnPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const GeneralButton = (props: GeneralButtontype) => {
  const [loading, setLoading] = useState(false);
  const handlePress = async () => {
    setLoading(true);

    try {
      await props.OnPress();
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => handlePress()}
      style={[styles.container, props.style, customElevation, loading && styles.disabledButton]}
      disabled={loading}>
      {loading ? (
        <ActivityIndicator color={Colors.blueGray} />
      ) : (
        <Text style={[styles.text, props.textStyle]}>{props.title}</Text>
      )}
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
  disabledButton: {
    backgroundColor: Colors.inactiveGray,
  },
});
