import { Image, StyleSheet, Text, View } from 'react-native';
import React, { forwardRef, useCallback, useMemo } from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackgroundProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import HeaderButton from './headerButton';
import { Colors } from '~/assets/colors';

const BottomSheet = forwardRef<BottomSheetModal>((props, ref) => {
  const snapPoints = useMemo(() => ['80%'], []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackgroundProps) => (
      <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />
    ),
    []
  );
  const increaseQuantity = () => {
    alert('Plus');
  };
  const decreaseQuantity = () => {
    alert('Minus');
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
        <View style={{ flex: 1, marginTop: 20, gap: 15, alignItems: 'center' }}>
          <Text>Order Quantity</Text>
          <View style={{ flexDirection: 'row', gap: 30, alignItems: 'center' }}>
            <HeaderButton
              name="minus-circle"
              color={Colors.purpleMid}
              onPress={decreaseQuantity}
              size={45}
            />
            <Text>20</Text>
            <HeaderButton
              name="plus-circle"
              color={Colors.purpleMid}
              onPress={increaseQuantity}
              size={45}
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
});
