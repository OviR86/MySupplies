import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Dimensions } from 'react-native';

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
  return (
    <View style={styles.container}>
      <Image source={props.image} style={styles.image} />
      <Text numberOfLines={2} style={styles.titleText}>
        {props.title}
      </Text>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    width: screenWidth / 2,
    marginVertical: 20,
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
