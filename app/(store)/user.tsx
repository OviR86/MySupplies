import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const User = () => {
  return (
    <View style={styles.container}>
      <Text>User</Text>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
