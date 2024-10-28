import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { capitalise } from '~/assets/helpers';
import { useItemByIdStore } from '~/stores/itemByIdStore';
import { Colors } from '~/assets/styles';
import GeneralButton from '~/components/generalButton';
const { height } = Dimensions.get('window');

const ProductDetails = () => {
  const { selectedItem } = useItemByIdStore();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: selectedItem?.image }} style={styles.image} />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{capitalise(selectedItem?.name)}</Text>
        <View style={{ alignItems: 'center' }}>
          <View style={styles.suppliedContainer}>
            <Text style={styles.detailsText}>Supplied by: </Text>
            <Text style={styles.detailsText2}>{selectedItem?.supplier.toUpperCase()} </Text>
          </View>
          <View style={styles.suppliedContainer}>
            <Text style={styles.detailsText}>Order unit: </Text>
            <Text style={styles.detailsText2}>{selectedItem?.unit}</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <GeneralButton title="Edit" OnPress={() => {}} />
            <GeneralButton
              title="Delete"
              style={{ backgroundColor: 'white' }}
              textStyle={{ color: 'red' }}
              OnPress={() => {}}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 20,
  },
  imageContainer: {
    width: '98%',
    height: height * 0.58,
    backgroundColor: 'white',
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 5,
    padding: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  name: {
    fontSize: 25,
    textAlign: 'center',
  },
  suppliedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  detailsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.inactiveGray,
  },
  detailsText2: {
    fontSize: 20,
    color: Colors.purpleDark,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 60,
    marginTop: 25,
  },
});
