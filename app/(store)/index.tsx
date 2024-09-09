import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { products } from '~/assets/data';
import ListItem from '~/components/listItem';
import CategoryButton from '~/components/categoryButton';
import { Colors } from '~/assets/colors';

import PocketBase, { RecordModel } from 'pocketbase';

const url = 'https://bound-lesson.pockethost.io/';
const client = new PocketBase(url);

const Index = () => {
  const [suplyList, setSuplyList] = useState<RecordModel[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const handlecategoryPress = (category: string) => {
    if (selectedCategory == category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const uniqueCategories = [...new Set(suplyList.map((product) => product.category))];

  const filterredProducts = selectedCategory
    ? suplyList.filter((product) => product.category === selectedCategory)
    : suplyList;

  //LIST FROM POCKETBASE DB
  const getSupplyList = async () => {
    try {
      const records = await client.collection('supplies').getFullList({
        sort: '-category',
      });
      // console.log('CONSUMABILE===>', JSON.stringify(records, null, 2));
      setSuplyList(records);
    } catch (error) {
      alert(`eroare consumabile: ${error}`);
    } finally {
      console.log('SUPLY LISYT', JSON.stringify(suplyList, null, 2));
    }
  };

  useEffect(() => {
    getSupplyList();
  }, []);

  return (
    <View style={styles.container}>
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
          alignSelf: 'flex-start',
        }}
        horizontal={false}
        data={filterredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(item) => {
          return <ListItem title={item.item.name} image={{ uri: item.item.image }} />;
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 30,
    fontWeight: '300',
    marginVertical: 15,
    color: Colors.purpleDark,
  },
});
