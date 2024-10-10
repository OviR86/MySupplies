import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import GeneralButton from '~/components/generalButton';
import PocketBase from 'pocketbase';
import { useRouter } from 'expo-router';

import useAuthStore from '~/stores/authenticationStore';
const url = 'https://bound-lesson.pockethost.io/';
const client = new PocketBase(url);
const User = () => {
  const { signOut } = useAuthStore();
  const router = useRouter();
  return (
    <View style={styles.container}>
      <GeneralButton
        OnPress={() => router.replace('/orders')}
        title="Orders"
        style={{ width: '60%' }}
      />
      <GeneralButton OnPress={() => signOut(router)} title="Logout" style={{ width: '60%' }} />
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
    gap: 20,
  },
});
