import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { Colors } from '~/assets/styles';
import useAuthStore from '~/stores/authenticationStore';
import GeneralButton from '~/components/generalButton';

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
