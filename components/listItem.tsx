import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import React, { useRef } from 'react';
import { Dimensions } from 'react-native';
import GeneralButton from './generalButton';
import BottomSheet from './bottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Colors } from '~/assets/colors';

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

  return (
    <View style={styles.container}>
      <BottomSheet ref={bottomSheetRef} />
      <Image source={props.image} style={styles.image} />
      <Text numberOfLines={2} style={styles.titleText}>
        {props.title}
      </Text>
      <GeneralButton OnPress={() => handlePress(props.title)} title="Order" />
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    width: screenWidth / 2,
    marginVertical: 20,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  titleText: {
    paddingHorizontal: 10,
  },
});
