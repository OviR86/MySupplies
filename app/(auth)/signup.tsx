import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Colors, customElevation } from '~/assets/styles';
import CustomTextInput from '~/components/customTextInput';
import GeneralButton from '~/components/generalButton';
import DropDownMenu from '~/components/dropDownMenu';
import PocketBase from 'pocketbase';
import { useRouter } from 'expo-router';
import useAuthStore from '~/stores/authenticationStore';
const url = 'https://bound-lesson.pockethost.io/';
const client = new PocketBase(url);

const Signup = () => {
  const router = useRouter();

  const { createUser, setUserName, setEmail, setPassword, setRole, role } = useAuthStore();

  const handleCreateUser = async () => {
    createUser();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to MySupplies</Text>
      <Text style={styles.callToAction}>This is where you create a new user account.</Text>

      <DropDownMenu role={role} setRole={setRole} />

      <CustomTextInput
        textStyle={[styles.textInput, customElevation]}
        placeholder="Username..."
        placeholderTextColor={Colors.inactiveGray}
        onChangeText={(text) => setUserName(text)}
      />
      <CustomTextInput
        textStyle={[styles.textInput, customElevation]}
        placeholder="Email..."
        placeholderTextColor={Colors.inactiveGray}
        onChangeText={(text) => setEmail(text)}
      />
      <CustomTextInput
        textStyle={[styles.textInput, customElevation]}
        placeholder="Password..."
        placeholderTextColor={Colors.inactiveGray}
        onChangeText={(text) => setPassword(text)}
      />

      <GeneralButton
        title="Create user"
        OnPress={() => handleCreateUser()}
        style={{ width: '80%', marginVertical: 10 }}
      />
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 25 },

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
