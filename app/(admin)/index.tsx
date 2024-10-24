import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import useAuthStore from '~/stores/authenticationStore';
import { Colors } from '~/assets/styles';
import GeneralButton from '~/components/generalButton';

const AdminPannel = () => {
  const { userData, signOut } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    signOut(router);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {userData?.userName}</Text>
      <Text style={styles.callToAction}>Choose your next action:</Text>
      <GeneralButton
        OnPress={() => router.push('/orders')}
        title="View orders"
        style={{ width: '60%' }}
      />
      <GeneralButton
        OnPress={() => router.push('/users')}
        title="View users"
        style={{ width: '60%' }}
      />

      <GeneralButton
        OnPress={() => router.push('/products')}
        title="View products"
        style={{ width: '60%' }}
      />

      <GeneralButton
        OnPress={() => alert('View abandoned carts-TBA')}
        title="View abandoned carts"
        style={{ width: '60%' }}
      />

      <View
        style={{
          width: '80%',
          borderColor: Colors.inactiveGray,
          borderBottomWidth: 1,
          marginBottom: 10,
        }}></View>
      <GeneralButton OnPress={() => handleLogout()} title="Logout" style={{ width: '60%' }} />
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
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  callToAction: {
    color: Colors.inactiveGray,
    fontSize: 16,
    marginBottom: 25,
    textAlign: 'center',
  },
});
