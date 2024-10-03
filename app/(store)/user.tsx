import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import GeneralButton from '~/components/generalButton';

import { useRouter } from 'expo-router';

const User = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text>User</Text>
      <GeneralButton OnPress={() => router.push('/orders')} title="Orders" />
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
