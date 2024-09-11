import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import React, { useRef } from 'react';
import { Dimensions } from 'react-native';
import GeneralButton from './generalButton';
import BottomSheet from './bottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Colors } from '~/assets/colors';
import { customElevation } from '~/assets/styles';

const screenWidth = Dimensions.get('window').width;

type RatingType = {
  rate: number;
  count: number;
};

type ListItemType = {
  id?: number;
  title?: string;
  price?: number;
  description?: string;
  category?: string;
  image?: ImageSourcePropType;
  rating?: RatingType;
};

const ListItem = (props: ListItemType) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handlePress = (title: string | undefined) => {
    // alert(`Pressed: ${title}`);
    bottomSheetRef.current?.present();
  };

  const capitalise = (str: string | undefined) => {
    if (str != undefined) {
      return str
        .split(' ')
        .map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
    } else return;
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
            {capitalise(props.title)}
          </Text>
          <GeneralButton OnPress={() => handlePress(props.title)} title="Order" />
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
