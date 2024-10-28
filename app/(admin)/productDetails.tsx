import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { capitalise } from '~/assets/helpers';
import { useItemByIdStore } from '~/stores/itemByIdStore';
import { Colors } from '~/assets/styles';
import GeneralButton from '~/components/generalButton';
const { height } = Dimensions.get('window');
import { customElevation } from '~/assets/styles';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import ProductDeleteBottomSheet from '~/components/productDeleteBottomSheet';
import { router } from 'expo-router';
import DB from '../db';

const ProductDetails = () => {
  const [loading, setLoading] = useState(false);
  const { selectedItem } = useItemByIdStore();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const openDeleteSheet = () => {
    bottomSheetRef.current?.present();
  };

  const handleProductDelete = async () => {
    try {
      if (!selectedItem) {
        return;
      } else {
        setLoading(true);
        await DB.collection('supplies').delete(`${selectedItem.id}`);
        alert(`${selectedItem.name} deleted`);
        setLoading(false);
        router.back();
      }
    } catch (error) {
      alert(`Product delete error, ${error}`);
    } finally {
    }
  };

  const handleEditPress = () => {
    router.replace('/productEdit');
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={Colors.purpleMid} />
        </View>
      ) : (
        <>
          {selectedItem && (
            <ProductDeleteBottomSheet
              ref={bottomSheetRef}
              productId={selectedItem.id}
              productName={selectedItem.name}
              onDelete={() => handleProductDelete()}
            />
          )}

          <View style={[styles.imageContainer, customElevation]}>
            <Image source={{ uri: selectedItem?.image }} style={styles.image} />
          </View>

          <View style={[styles.textContainer, customElevation]}>
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
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <GeneralButton title="Edit" OnPress={() => handleEditPress()} />
            <GeneralButton
              title="Delete"
              style={{ backgroundColor: 'white' }}
              textStyle={{ color: 'red' }}
              OnPress={() => openDeleteSheet()}
            />
          </View>
        </>
      )}
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
  textContainer: {
    width: '98%',
    paddingVertical: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    gap: 7,
  },
  name: {
    fontSize: 20,
    textAlign: 'center',
  },
  suppliedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  detailsText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Colors.inactiveGray,
  },
  detailsText2: {
    fontSize: 15,
    color: Colors.purpleDark,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 60,
    marginTop: 25,
  },
});
