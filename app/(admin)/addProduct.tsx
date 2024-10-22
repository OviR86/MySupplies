import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import useAuthStore from '~/stores/authenticationStore';
import { Colors, customElevation } from '~/assets/styles';
import CustomTextInput from '~/components/customTextInput';
import GeneralButton from '~/components/generalButton';
import * as ImagePicker from 'expo-image-picker';

const AddProduct = () => {
  const { userData } = useAuthStore();
  const [productName, setProductName] = useState('');
  const [orderUnit, setOrderUnit] = useState('');
  const [image, setImage] = useState('');
  console.log(image);

  const saveNewProduct = async () => {
    try {
    } catch (error) {}
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>{userData?.userName},</Text>
      <Text style={styles.callToAction}>This is where you can add a new product.</Text>
      <Text style={[styles.callToAction, { marginBottom: 20 }]}>Fill out all the details!</Text>

      <CustomTextInput
        textStyle={[styles.textInput, customElevation]}
        placeholder="Product name..."
        placeholderTextColor={Colors.inactiveGray}
        onChangeText={(text) => setProductName(text)}
        value={productName}
      />
      <CustomTextInput
        textStyle={[styles.textInput, customElevation]}
        placeholder="Order unit..."
        placeholderTextColor={Colors.inactiveGray}
        onChangeText={(text) => setOrderUnit(text)}
        value={orderUnit}
      />
      <View style={styles.addImageContainer}>
        <Text style={[styles.callToAction, { marginBottom: 20 }]}>Choose image</Text>

        <TouchableOpacity
          style={{ borderRadius: 10, overflow: 'hidden' }}
          onPress={() => {
            takePhoto();
          }}>
          <Image style={styles.thumb} source={image != null ? image : require('assets/MY.png')} />
        </TouchableOpacity>
      </View>
      <GeneralButton title="Save product" OnPress={() => {}} style={{ width: 200 }} />
    </View>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 25,
  },
  welcome: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 15,
  },
  callToAction: {
    color: Colors.inactiveGray,
    fontSize: 16,
    marginTop: -25,
    textAlign: 'center',
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
  addImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  thumb: {
    width: 100,
    height: 100,
  },
});
