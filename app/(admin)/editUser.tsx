import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Colors, customElevation } from '~/assets/styles';
import CustomTextInput from '~/components/customTextInput';
import GeneralButton from '~/components/generalButton';
import DropDownMenu from '~/components/dropDownMenu';
import useAuthStore from '~/stores/authenticationStore';
import DB from '../db';
import { router } from 'expo-router';

const EditUser = () => {
  const { setUserName, setEmail, setRole, role, userName, email, userData, id } = useAuthStore();

  const saveEdit = async () => {
    const data = {
      username: userName,
      email: email,
      role: role,
    };

    try {
      if (data.email === '' || data.role === '' || data.username === '') {
        alert('Fill out all the fields!');
      } else {
        await DB.collection('users').update(id, data);
        alert('User details updated successfully');
        setUserName('');
        setEmail('');
        setRole('');
        router.push('/(admin)');
      }
    } catch (error) {
      console.log('Error updating user:', JSON.stringify(error, null, 2));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>{userData?.userName},</Text>
      <Text style={styles.callToAction}>This is where you can change a user's details.</Text>

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

      <GeneralButton
        title="Save edited details"
        OnPress={() => saveEdit()}
        style={{ width: '80%', marginVertical: 10 }}
      />
    </View>
  );
};

export default EditUser;

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
