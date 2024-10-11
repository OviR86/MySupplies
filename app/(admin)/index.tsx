import { StyleSheet, View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import useAuthStore from '~/stores/authenticationStore';
import { Colors } from '~/assets/styles';
import PocketBase from 'pocketbase';
import GeneralButton from '~/components/generalButton';
const url = 'https://bound-lesson.pockethost.io/';
const client = new PocketBase(url);

const AdminPannel = () => {
  const { userName, signOut } = useAuthStore();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text>Pula mea, {userName}</Text>

      <GeneralButton
        OnPress={() => router.push('/signup')}
        title="Create user"
        style={{ width: '60%' }}
      />
      <GeneralButton
        OnPress={() => router.push('/(store)/orders')}
        title="View orders"
        style={{ width: '60%' }}
      />
      <View
        style={{
          width: '80%',
          borderColor: Colors.inactiveGray,
          borderBottomWidth: 1,
          marginBottom: 10,
        }}></View>
      <GeneralButton OnPress={() => signOut(router)} title="Logout" style={{ width: '60%' }} />
    </View>
  );
};

export default AdminPannel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    gap: 20,
  },
});
