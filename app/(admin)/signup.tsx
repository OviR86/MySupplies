import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors, customElevation } from '~/assets/styles';
import { capitalise } from '~/assets/helpers';
import CustomTextInput from '~/components/customTextInput';
import GeneralButton from '~/components/generalButton';
import DropDownMenu from '~/components/dropDownMenu';
import useAuthStore from '~/stores/authenticationStore';
import WithSecureTextToggle from '~/components/withSecureTextToggle';
import DB from '../db';
import { router } from 'expo-router';

const Signup = () => {
  const { setUserName, setEmail, setPassword, setRole, role, userName, email, password, userData } =
    useAuthStore();

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
      const record = await DB.collection('users').create(data);

      if (record) {
        const temporaryRole = capitalise(record.role);
        alert(`New ${temporaryRole} account created.`);
      }
      router.replace('/(admin)/users');
    } catch (error: any) {
      console.error('Error creating user:', JSON.stringify(error, null, 2));
    } finally {
      setPassword('');
      setUserName('');
      setEmail('');
      setRole('');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>{userData?.userName},</Text>
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
