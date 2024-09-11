import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { products } from '~/assets/data'; //KEEP IT JUST IN CASE
import ListItem from '~/components/listItem';
import CategoryButton from '~/components/categoryButton';
import { Colors } from '~/assets/colors';

import PocketBase, { RecordModel } from 'pocketbase';

const url = 'https://bound-lesson.pockethost.io/';
const client = new PocketBase(url);

const Index = () => {
  const [suplyList, setSuplyList] = useState<RecordModel[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  //CATEGORY BUTTONS FUNCTIONALITY-RADIO BUTTON STYLE
  const handlecategoryPress = (category: string) => {
    if (selectedCategory == category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const uniqueCategories = [...new Set(suplyList.map((product) => product.category))];

  //GET LIST FROM POCKETBASE DB
  const getSupplyList = async () => {
    try {
      setLoading(true);
      const records = await client.collection('supplies').getFullList({
        sort: '-category',
      });
      // console.log('CONSUMABILE===>', JSON.stringify(records, null, 2));
      setSuplyList(records);
      setLoading(false);
    } catch (error) {
      alert(`Unable to retrieve supplies: ${error}`);
    }
  };

  //CREATE IMAGE URL FOR POCKETBASE STORRED IMAGES
  const buildImageURL = (fileName: string, collectionId: string, itemId: string) => {
    return `${url}api/files/${collectionId}/${itemId}/${fileName}`;
  };

  useEffect(() => {
    getSupplyList();
  }, []);

  //CREATE A NEW SUPPLIES LIST CONTAINING IMAGES WITH VALID URL'S
  const mappedSupplies = suplyList.map((suply) => ({
    id: suply.id,
    name: suply.name,
    supplier: suply.supplier,
    unit: suply.unit,
    imageURL: buildImageURL(suply.image, suply.collectionId, suply.id),
    category: suply.category,
  }));

  //FILTER BY CATEGORI FUNCTIONALITY
  const filterredProducts = selectedCategory
    ? mappedSupplies.filter((product) => product.category === selectedCategory)
    : mappedSupplies;

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color={Colors.purpleDark} size={'large'} />
      ) : (
        <>
          <Text style={styles.title}>Select supply category</Text>
          <ScrollView
            horizontal
            style={{ height: 60, marginBottom: 10 }}
            showsHorizontalScrollIndicator={false}>
            {uniqueCategories.map((category, index) => {
              return (
                <CategoryButton
                  category={category}
                  key={index}
                  onPress={() => {
                    handlecategoryPress(category);
                  }}
                  isSelected={selectedCategory == category}
                />
              );
            })}
          </ScrollView>

          <FlatList
            numColumns={2}
            contentContainerStyle={{
              paddingBottom: 5,
              backgroundColor: 'white',
            }}
            horizontal={false}
            data={filterredProducts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={(item) => {
              return <ListItem title={item.item.name} image={{ uri: item.item.imageURL }} />;
            }}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 30,
    fontWeight: '300',
    marginVertical: 15,
    color: Colors.purpleDark,
  },
});
