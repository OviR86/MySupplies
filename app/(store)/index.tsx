import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { products } from '~/assets/data';
import ListItem from '~/components/listItem';
import CategoryButton from '~/components/categoryButton';
import { Colors } from '~/assets/colors';

const uniqueCategories = [...new Set(products.map((product) => product.category))];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const handlecategoryPress = (category: string) => {
    if (selectedCategory == category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const filterredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select supply category</Text>
      <ScrollView horizontal style={{ height: 60, marginBottom: 10 }}>
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
          return <ListItem title={item.item.title} image={{ uri: item.item.image }} />;
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
