import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import useAuthStore from '~/stores/authenticationStore';
import { Colors } from '~/assets/styles';
import PocketBase from 'pocketbase';
import GeneralButton from '~/components/generalButton';
const url = 'https://bound-lesson.pockethost.io/';
const client = new PocketBase(url);

const AdminPannel = () => {
  const { userName } = useAuthStore();
  const router = useRouter();

  const signOutFromAdminPage = () => {
    if (client.authStore.isValid) {
      // Clear the auth store to log out the user if the token exists
      client.authStore.clear();
      console.log('User signed out successfully.');

      if (!client.authStore.isValid) {
        router.replace('/(auth)/login');
      }
    } else {
      console.log('No active session found.');
      console.log('Admin index page--> client.authStore.token:', client.authStore.token);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {userName}</Text>
      <Text style={styles.callToAction}>Choose your next action:</Text>

      <GeneralButton
        OnPress={() => router.push('/signup')}
        title="Create user"
        style={{ width: '60%' }}
      />
      <GeneralButton
        OnPress={() => alert('Add new product-TBA')}
        title="Add new product"
        style={{ width: '60%' }}
      />
      <GeneralButton
        OnPress={() => router.push('/(store)/orders')}
        title="View orders"
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
      <GeneralButton
        OnPress={() => signOutFromAdminPage()}
        title="Logout"
        style={{ width: '60%' }}
      />
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
