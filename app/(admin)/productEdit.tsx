import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import useAuthStore from '~/stores/authenticationStore';
import { Colors, customElevation } from '~/assets/styles';
import CustomTextInput from '~/components/customTextInput';
import GeneralButton from '~/components/generalButton';
import * as ImagePicker from 'expo-image-picker';
import DropDounProductCreate from '~/components/dropDownProductCreate';
import DB from '../db';
import { router } from 'expo-router';
import { useItemByIdStore } from '~/stores/itemByIdStore';

const EditProduct = () => {
  const { userData } = useAuthStore();
  const { selectedItem } = useItemByIdStore();
  const [productName, setProductName] = useState('');
  const [orderUnit, setOrderUnit] = useState('');
  const [image, setImage] = useState<string | undefined>('');
  const [supplier, setSupplier] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (selectedItem) {
      setSupplier(selectedItem.supplier);
      setCategory(selectedItem.category);
      setProductName(selectedItem.name);
      setOrderUnit(selectedItem.unit);
      setImage(selectedItem?.image);
    }
  }, []);

  const takePhoto = async (): Promise<void> => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    console.log('ImagePickerResult-->', result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const updateProduct = async () => {
    if (productName && orderUnit && supplier && category && image) {
      try {
        const formData = new FormData();

        formData.append('name', productName);
        formData.append('unit', orderUnit);
        formData.append('supplier', supplier);
        formData.append('category', category);

        const imageData = {
          uri: image,
          type: 'image/*',
          name: `${productName}_image`,
        };

        formData.append('image', imageData as unknown as Blob);

        await DB.collection('supplies').update(`${selectedItem?.id}`, formData);
        alert('Product updated successfully');
        router.back();
      } catch (error: any) {
        // console.error('Error saving product:', JSON.stringify(error, null, 2));
        alert('Error saving updates: ' + error.message);
      }
    } else {
      alert('Please fill out or select all the options');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>{userData?.userName},</Text>
      <Text style={styles.callToAction}>This is where you can modify a product.</Text>
      <Text style={[styles.callToAction, { marginBottom: 20 }]}>Change details as needed!</Text>
      <DropDounProductCreate useCase="supplier" supplier={supplier} setSupplier={setSupplier} />
      <DropDounProductCreate useCase="category" category={category} setCategory={setCategory} />
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
        <Text style={[styles.callToAction, { marginBottom: 5 }]}>Tap to change image</Text>
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
      <GeneralButton title="Save product" OnPress={() => updateProduct()} style={{ width: 200 }} />
    </View>
  );
};

export default EditProduct;

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
