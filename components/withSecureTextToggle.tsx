import React, { useState } from 'react';
import { View, Button } from 'react-native';
import CustomTextInput from './customTextInput';
import Feather from '@expo/vector-icons/Feather';
import { Colors } from '~/assets/styles';

const withSecureTextToggle = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P) => {
    const [secureText, setSecureText] = useState(true);

    const toggleSecureTextEntry = () => {
      setSecureText(!secureText);
    };

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <Component {...(props as P)} secureTextEntry={secureText} />

        <Feather
          name={secureText ? 'eye' : 'eye-off'}
          size={24}
          color={Colors.purpleMid}
          onPress={toggleSecureTextEntry}
          style={{ position: 'absolute', right: 20, top: 13 }}
        />
      </View>
    );
  };
};

// Exporting the enhanced component
export default withSecureTextToggle(CustomTextInput);
