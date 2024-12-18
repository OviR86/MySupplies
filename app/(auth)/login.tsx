import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import CustomTextInput from '~/components/customTextInput';
import { Colors, customElevation } from '~/assets/styles';
import { useRouter } from 'expo-router';
import useAuthStore from '~/stores/authenticationStore';
import WithSecureTextToggle from '~/components/withSecureTextToggle';
import GeneralButton from '~/components/generalButton';

import DB from '../db';
const Login = () => {
  const [recoverPassword, setRecoverPassword] = useState(false);
  const { setUserName, setEmail, setPassword, userName, email, password, setUserData } =
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
      const authData = await DB.collection('users').authWithPassword(userName, password);
      if (authData) {
        const user = DB.authStore.model;
        console.log('User from login screen--->', user);
        if (user) {
          setUserData({
            userName: user.username,
            email: user.email,
            role: user.role,
            id: user.id,
          });
          if (user.role) {
            if (user.role === 'store') {
              router.replace('/(store)');
            } else if (user.role === 'admin') {
              router.replace('/(admin)');
            } else if (user.role === 'supplier') {
              router.replace('/(supplier)');
            }
          }
        }
      }
    } catch (error: any) {
      alert(` Login error: ${error}`);
      console.log(error.data);
    } finally {
      setPassword('');
      console.log('Login page--> DB.authStore.token:', DB.authStore.token);
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
