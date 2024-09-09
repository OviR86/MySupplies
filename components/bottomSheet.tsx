import { Image, StyleSheet, Text, View } from 'react-native';
import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackgroundProps,
  BottomSheetModal,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import HeaderButton from './headerButton';
import { Colors } from '~/assets/colors';
import GeneralButton from './generalButton';

const BottomSheet = forwardRef<BottomSheetModal>((props, ref) => {
  const [quantity, setQuantity] = useState(0);

  const snapPoints = useMemo(() => ['80%'], []);

  const { dismiss } = useBottomSheetModal();

  const cancelOrder = () => {
    dismiss();
    setQuantity(0);
  };

  const addToCart = () => {
    dismiss();
    setQuantity(0);
  };

  const renderBackdrop = useCallback(
    (props: BottomSheetBackgroundProps) => (
      <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />
    ),
    []
  );
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
    console.log('Plus');
  };
  const decreaseQuantity = () => {
    if (quantity <= 0) {
      setQuantity(0);
    } else {
      setQuantity(quantity - 1);
    }
    console.log('Minus');
  };
  return (
    <BottomSheetModal ref={ref} snapPoints={snapPoints} backdropComponent={renderBackdrop}>
      <View style={styles.container}>
        <Image
          source={{ uri: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg' }}
          style={styles.image}
        />
        <Text style={styles.nameText} numberOfLines={3}>
          Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops
        </Text>
        <View style={styles.quantitySelectorContainer}>
          <View style={{ height: 4, width: 300, backgroundColor: 'gray', borderRadius: 20 }}></View>
          <Text style={{ fontSize: 27, fontWeight: '300', marginTop: -10 }}>Order Quantity</Text>
          <View style={styles.selectorButtonsContainer}>
            <HeaderButton
              name="minus-circle"
              color={quantity == 0 ? '#D3D3D3' : Colors.purpleMid}
              onPress={decreaseQuantity}
              size={40}
            />
            <View style={styles.quantityContainer}>
              <Text style={styles.quantityText}>{quantity}</Text>
            </View>

            <HeaderButton
              name="plus-circle"
              color={Colors.purpleMid}
              onPress={increaseQuantity}
              size={40}
            />
          </View>
          <View style={{ marginTop: 15, flexDirection: 'row', gap: 45, alignItems: 'center' }}>
            <GeneralButton
              title="Add to basket"
              OnPress={() => addToCart()}
              style={{ height: 35 }}
            />
            <GeneralButton
              title="Cancel"
              OnPress={() => cancelOrder()}
              style={styles.cancelButtonStyle}
              textStyle={{ color: 'red' }}
            />
          </View>
        </View>
      </View>
    </BottomSheetModal>
  );
});

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    gap: 10,
  },
  image: {
    height: '50%',
    width: '60%',
    resizeMode: 'contain',
  },
  nameText: {
    fontSize: 20,
    textAlign: 'center',
  },
  quantitySelectorContainer: {
    flex: 1,
    marginTop: 10,
    gap: 15,
    alignItems: 'center',
  },
  selectorButtonsContainer: {
    flexDirection: 'row',
    gap: 40,
    alignItems: 'center',
  },
  quantityContainer: {
    minWidth: 50,
    minHeight: 50,
    backgroundColor: Colors.purpleMid,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  quantityText: {
    fontSize: 23,
    color: 'white',
    fontWeight: '500',
    padding: 3,
  },
  cancelButtonStyle: {
    backgroundColor: 'white',
    borderColor: 'red',
    borderWidth: 1,
  },
});
