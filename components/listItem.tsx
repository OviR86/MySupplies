import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Dimensions } from 'react-native';
import GeneralButton from './generalbutton';

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
  const handlePress = (title: string | undefined) => {
    alert(`Pressed: ${title}`);
  };

  return (
    <View style={styles.container}>
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
