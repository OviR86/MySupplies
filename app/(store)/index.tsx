import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import ListItem from '~/components/listItem';
import CategoryButton from '~/components/categoryButton';
import { Colors } from '~/assets/styles';
import PocketBase, { RecordModel } from 'pocketbase';
import { useItemByIdStore } from '~/stores/itemByIdStore';

const url = 'https://bound-lesson.pockethost.io/';
const client = new PocketBase(url);
client.autoCancellation(false);

const Index = () => {
  const [suplyList, setSuplyList] = useState<RecordModel[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getItemById = useItemByIdStore((state) => state.getItemById);

  //CATEGORY BUTTONS FUNCTIONALITY-RADIO BUTTON STYLE
  const handlecategoryPress = (category: string) => {
    if (selectedCategory == category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  //GET LIST FROM POCKETBASE DB
  useEffect(() => {
    setLoading(true);
    getSupplyList();
  }, []);

  const getSupplyList = async () => {
    try {
      const records = await client.collection('supplies').getFullList({
        sort: '-category',
      });

      setSuplyList(records);
      setLoading(false);
    } catch (error: any) {
      alert(error);
    }
  };

  //CREATE AN ARRAY OF CATEGORIES TO BE DISPLAYED WITH CATEGORY BUTTONS IN THE FILTER FUNCTIONALITY
  const uniqueCategories = [...new Set(suplyList.map((product) => product.category))];

  //CREATE IMAGE URL FOR POCKETBASE STORRED IMAGES
  const buildImageURL = (fileName: string, collectionId: string, itemId: string) => {
    return `${url}api/files/${collectionId}/${itemId}/${fileName}`;
  };

  //CREATE A NEW SUPPLIES LIST CONTAINING IMAGES WITH VALID URL'S
  const mappedSupplies = suplyList.map((suply) => ({
    id: suply.id,
    name: suply.name,
    supplier: suply.supplier,
    unit: suply.unit,
    image: buildImageURL(suply.image, suply.collectionId, suply.id),
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
            keyExtractor={(item) => item.id}
            renderItem={(item) => {
              return (
                <ListItem
                  name={item.item.name}
                  image={{ uri: item.item.image }}
                  setOrderItem={() => {
                    getItemById(item.item.id, mappedSupplies);
                  }}
                />
              );
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
