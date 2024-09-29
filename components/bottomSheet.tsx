import { Image, StyleSheet, Text, View } from 'react-native';
import React, { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackgroundProps,
  BottomSheetModal,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import { HeaderButton } from './headerButton';
import { Colors } from '~/assets/styles';
import GeneralButton from './generalButton';
import { Item, useItemByIdStore } from '~/stores/itemByIdStore';
import { capitalise, capitaliseFirst } from '~/assets/helpers';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import useCartStore from '~/stores/cartStore';

const BottomSheet = forwardRef<BottomSheetModal>((props, ref) => {
  const [quantity, setQuantity] = useState(0);
  const [cartItem, setCartItem] = useState<Item | null>(null);
  const { addCartItem, cartItems } = useCartStore();

  const selectedItem: Item | null = useItemByIdStore((state) => state.selectedItem);

  const snapPoints = useMemo(() => ['80%'], []);

  const { dismiss } = useBottomSheetModal();

  const closeBottomSheet = () => {
    dismiss();
    setQuantity(0);
  };

  const addQuantity = (item: Item, quantity: number) => {
    //DE REZOLVAT TYPE PENTRY UPDATEDOBJECT
    const updatedObject = {
      ...item,
      quantity,
    };
    setCartItem(updatedObject);
  };

  useEffect(() => {
    if (cartItem != null) {
      addCartItem(cartItem!);
    }
  }, [cartItem]);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackgroundProps) => (
      <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />
    ),
    []
  );
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    if (quantity <= 0) {
      setQuantity(0);
    } else {
      setQuantity(quantity - 1);
    }
  };
  return (
    <BottomSheetModal ref={ref} snapPoints={snapPoints} backdropComponent={renderBackdrop}>
      <HeaderButton
        name="times-circle"
        color="red"
        onPress={() => closeBottomSheet()}
        size={35}
        style={{ position: 'absolute', right: 21 }}
      />
      <View style={styles.container}>
        <Image source={{ uri: selectedItem?.image }} style={styles.image} />
        <Text style={styles.nameText} numberOfLines={3}>
          {capitalise(selectedItem?.name)}
        </Text>
        <View style={styles.quantitySelectorContainer}>
          <View style={{ height: 4, width: 300, backgroundColor: 'gray', borderRadius: 20 }}></View>
          <Text style={{ fontSize: 27, fontWeight: '300', marginTop: -10 }}>
            {capitaliseFirst(selectedItem?.unit)}{' '}
            <FontAwesome name="times-circle" size={24} color={Colors.inactiveGray} />
          </Text>
          <View style={styles.selectorButtonsContainer}>
            <HeaderButton
              name="minus-circle"
              color={quantity == 0 ? Colors.inactiveGray : Colors.purpleMid}
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
            {quantity != 0 ? (
              <GeneralButton
                title="Add to basket"
                OnPress={() => {
                  if (selectedItem != null) addQuantity(selectedItem, quantity);
                  closeBottomSheet();
                }}
                style={{ height: 35, width: 150 }}
              />
            ) : (
              <GeneralButton
                title="Close"
                OnPress={() => closeBottomSheet()}
                style={{ height: 35, backgroundColor: Colors.inactiveGray, width: 150 }}
              />
            )}
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
    width: '90%',
    resizeMode: 'cover',
    borderRadius: 15,
    overflow: 'hidden',
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
