import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors, customElevation } from '~/assets/styles';
import { capitalise } from '~/assets/helpers';
import CustomTextInput from '~/components/customTextInput';
import GeneralButton from '~/components/generalButton';
import DropDownMenu from '~/components/dropDownMenu';
import PocketBase from 'pocketbase';
import { useRouter } from 'expo-router';
import useAuthStore from '~/stores/authenticationStore';
import WithSecureTextToggle from '~/components/withSecureTextToggle';
const url = 'https://bound-lesson.pockethost.io/';
const client = new PocketBase(url);
client.autoCancellation(false);

const Signup = () => {
  const router = useRouter();
  const { setUserName, setEmail, setPassword, role, userName, email, password } = useAuthStore();
  console.log('role-->', role);

  const createUser = async () => {
    const data = {
      username: userName,
      email: email,
      emailVisibility: true,
      password: password,
      passwordConfirm: password,
      role: role,
    };
    console.log('Create user data--->', data);

    try {
      const record = await client.collection('users').create(data);

      const authData = await client.collection('users').authWithPassword(email, password);
      if (authData) {
        const userRole = capitalise(client.authStore.model?.role);
        alert(`${userRole} account created.`);
      }
    } catch (error: any) {
      console.error('Error creating user:', error.message);
    } finally {
      setPassword('');
      setUserName('');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to MySupplies</Text>
      <Text style={styles.callToAction}>This is where you create a new user account.</Text>

      <DropDownMenu />

      <CustomTextInput
        textStyle={[styles.textInput, customElevation]}
        placeholder="Username..."
        placeholderTextColor={Colors.inactiveGray}
        onChangeText={(text) => setUserName(text)}
        value={userName}
      />
      <CustomTextInput
        textStyle={[styles.textInput, customElevation]}
        placeholder="Email..."
        placeholderTextColor={Colors.inactiveGray}
        onChangeText={(text) => setEmail(text)}
        value={email}
        inputMode="email"
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
        title="Create user"
        OnPress={() => createUser()}
        style={{ width: '80%', marginVertical: 10 }}
      />
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 25,
  },
  textInput: {
    color: 'black',
    width: '80%',
    padding: 10,
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
  },
  callToAction: {
    color: Colors.inactiveGray,
    fontSize: 16,
    marginBottom: 20,
    marginTop: -25,
    textAlign: 'center',
  },
});
