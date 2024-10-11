import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomTextInput from '~/components/customTextInput';
import { Colors, customElevation } from '~/assets/styles';
import PocketBase, { AsyncAuthStore, RecordAuthResponse } from 'pocketbase';
import { useRouter } from 'expo-router';
import useAuthStore from '~/stores/authenticationStore';

import AsyncStorage from '@react-native-async-storage/async-storage';
import WithSecureTextToggle from '~/components/withSecureTextToggle';
import GeneralButton from '~/components/generalButton';

// const store = new AsyncAuthStore({
//   save: async (serialized) => AsyncStorage.setItem('pb_auth', serialized),
//   initial: AsyncStorage.getItem('pb_auth'),
// });
const url = 'https://bound-lesson.pockethost.io/';
const client = new PocketBase(url);
client.autoCancellation(false);

const Login = () => {
  const [recoverPassword, setRecoverPassword] = useState(false);
  const { setUserName, setEmail, setPassword, setRole, role, userName, email, password, setId } =
    useAuthStore();
  const router = useRouter();

  const recover = () => {
    setRecoverPassword(!recoverPassword);
    setEmail('');
    setPassword('');
    setUserName('');
  };

  const handleLogin = async () => {
    try {
      const authData = await client.collection('users').authWithPassword(userName, password);
      if (authData) {
        const user = client.authStore.model;
        console.log('User from login screen--->', user);
        if (user) {
          setUserName(user.username);
          setRole(user.role);
          setId(user.id);

          if (user.role) {
            if (role === 'supplier') {
              router.replace('/(supplier)');
            }
            if (user.role === 'store') {
              router.replace('/(store)');
            } else if (user.role === 'admin') {
              router.replace('/(admin)');
            }
          }
        }
      }
    } catch (error: any) {
      alert(` Login error: ${error}`);
      console.log(error.data);
    } finally {
      setPassword('');
    }
  };

  return (
    <View style={styles.container}>
      {recoverPassword ? (
        <>
          <Text style={styles.welcome}>Forgot Password?</Text>
          <Text style={styles.callToAction}>
            Type your account email where you will receive a password reset link.
          </Text>
          <CustomTextInput
            textStyle={[styles.textInput, customElevation]}
            placeholder="Email..."
            placeholderTextColor={Colors.inactiveGray}
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <GeneralButton
            title="Send email"
            OnPress={() => {}}
            style={{ width: '80%', marginVertical: 10 }}
          />
          <Text onPress={() => recover()} style={styles.recoverText}>
            Go back
          </Text>
        </>
      ) : (
        <>
          <Text style={styles.welcome}>Welcome to MySupplies</Text>
          <Text style={styles.callToAction}>
            Login with your credentials to start ordering supplies.
          </Text>
          <CustomTextInput
            textStyle={[styles.textInput, customElevation]}
            placeholder="Username..."
            placeholderTextColor={Colors.inactiveGray}
            onChangeText={(text) => setUserName(text)}
            value={userName}
          />

          <WithSecureTextToggle
            textStyle={[styles.textInput, customElevation]}
            placeholder="Password..."
            placeholderTextColor={Colors.inactiveGray}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
          />
          <GeneralButton
            title="Login"
            OnPress={() => handleLogin()}
            style={{ width: '80%', marginVertical: 10 }}
          />
          <Text>
            Forgot password?{' '}
            <Text onPress={() => recover()} style={styles.recoverText}>
              Recover
            </Text>
          </Text>
        </>
      )}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 90,
    height: 90,
  },
  textInput: {
    color: 'black',
    width: '80%',
    padding: 10,
    marginBottom: 25,
    borderColor: Colors.purpleMid,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 30,
  },
  recoverText: {
    color: Colors.purpleMid,
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
  },
  welcome: {
    fontSize: 25,
    fontWeight: 'bold',

    marginBottom: 5,
  },
  callToAction: {
    color: Colors.inactiveGray,
    fontSize: 16,
    marginBottom: 25,
    textAlign: 'center',
  },
});
