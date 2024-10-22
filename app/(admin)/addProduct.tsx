import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import useAuthStore from '~/stores/authenticationStore';
import { Colors, customElevation } from '~/assets/styles';
import CustomTextInput from '~/components/customTextInput';
import GeneralButton from '~/components/generalButton';
import * as ImagePicker from 'expo-image-picker';
import DropDounProductCreate from '~/components/dropDownProductCreate';
import DB from '../db';

const AddProduct = () => {
  const { userData } = useAuthStore();
  const [productName, setProductName] = useState('');
  const [orderUnit, setOrderUnit] = useState('');
  const [image, setImage] = useState('');
  const [supplier, setSupplier] = useState('');
  const [category, setCategory] = useState('');

  const saveNewProduct = async () => {
    //NU FUNCTIONEAZA UPLOADUL PENTR POZA CEL MAI PROBABIL-DE VAZUT https://pocketbase.io/docs/files-handling/

    if (productName && orderUnit && image && supplier && category) {
      try {
        const imageResponse = await fetch(image);
        const blob = await imageResponse.blob();

        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('orderUnit', orderUnit);
        formData.append('supplier', supplier);
        formData.append('category', category);
        formData.append('image', blob, `${productName}_image.jpg`);

        // Use the DB instance to create the record
        const record = await DB.collection('supplies').create(formData);
        console.log('Record created successfully:', JSON.stringify(record, null, 2));
      } catch (error: any) {
        console.error('Error saving product:', JSON.stringify(error, null, 2));
        alert('Error saving product: ' + error.message); // Show error in alert
      }
    } else {
      alert('Please fill out or select all the options');
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    console.log(result);

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
      <DropDounProductCreate useCase="supplier" supplier={supplier} setSupplier={setSupplier} />
      <DropDounProductCreate useCase="category" category={category} setCategory={setCategory} />
      <View style={styles.addImageContainer}>
        <Text style={[styles.callToAction, { marginBottom: 20 }]}>Choose image</Text>

        <TouchableOpacity
          style={{ borderRadius: 10, overflow: 'hidden' }}
          onPress={() => takePhoto()}>
          {image ? (
            <Image style={styles.thumb} source={{ uri: image }} />
          ) : (
            <Image style={styles.thumb} source={require('assets/MY.png')} />
          )}
        </TouchableOpacity>
      </View>
      <GeneralButton title="Save product" OnPress={() => saveNewProduct()} style={{ width: 200 }} />
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
