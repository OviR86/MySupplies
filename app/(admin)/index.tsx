import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import GeneralButton from '~/components/generalButton';
import { useRouter } from 'expo-router';
import useAuthStore from '~/stores/authenticationStore';

const AdminPannel = () => {
  const { signOut } = useAuthStore();
  const router = useRouter();
  return (
    <View style={styles.container}>
      <GeneralButton
        OnPress={() => router.push('/(auth)/signup')}
        title="Create user"
        style={{ width: '60%' }}
      />
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
