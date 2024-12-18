import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { Dimensions } from 'react-native';
import GeneralButton from './generalButton';
import BottomSheet from './bottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { customElevation } from '~/assets/styles';
import { capitalise } from '~/assets/helpers';
import useAuthStore from '~/stores/authenticationStore';
import { useItemByIdStore } from '~/stores/itemByIdStore';
const screenWidth = Dimensions.get('window').width;

export type ListItemType = {
  name: string;
  image: ImageSourcePropType;
  setOrderItem: () => void;
};

const ListItem = (props: ListItemType) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const { userData } = useAuthStore();
  const handlePress = () => {
    bottomSheetRef.current?.present();
    props.setOrderItem();
  };
  const handleOpenDetails = () => {
    props.setOrderItem();
  };

  return (
    <View style={[styles.container, customElevation]}>
      <BottomSheet ref={bottomSheetRef} />
      <Image source={props.image} style={styles.image} />
      <View
        style={{
          backgroundColor: '#f6f5f6',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            height: 100,
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text numberOfLines={2} style={styles.titleText}>
            {capitalise(props.name)}
          </Text>
          {userData?.role === 'admin' ? (
            <GeneralButton OnPress={() => handleOpenDetails()} title="Details" />
          ) : (
            <GeneralButton OnPress={() => handlePress()} title="Order" />
          )}
        </View>
      </View>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6f5f6',
    width: screenWidth / 2.1,
    height: 280,
    marginVertical: 20,
    marginHorizontal: 3,
    alignItems: 'center',
    borderColor: '#f6f5f6',
    borderWidth: 1,
    borderRadius: 7,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 180,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 15,
  },
  titleText: {
    paddingHorizontal: 10,
    fontSize: 16,
  },
});
