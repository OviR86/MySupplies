import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import ListItem from '~/components/listItem';
import CategoryButton from '~/components/categoryButton';
import { Colors } from '~/assets/styles';
import { useItemByIdStore } from '~/stores/itemByIdStore';
import { useSupliesStore } from '~/stores/productListStore';
import { router, useFocusEffect } from 'expo-router';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { getSupplyList, loading, mappedSupplies, uniqueCategories } = useSupliesStore();
  const getItemById = useItemByIdStore((state) => state.getItemById);

  //GET LIST FROM POCKETBASE DB
  // useEffect(() => {
  //   getSupplyList();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      getSupplyList();
    }, [])
  );

  //CATEGORY BUTTONS FUNCTIONALITY-RADIO BUTTON STYLE
  const handlecategoryPress = (category: string) => {
    if (selectedCategory == category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  //FILTER BY CATEGORY FUNCTIONALITY
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
            style={{ height: 60, marginBottom: 5 }}
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
            renderItem={({ item }) => {
              return (
                <ListItem
                  name={item.name}
                  image={{ uri: item.image }}
                  setOrderItem={() => {
                    getItemById(item.id, mappedSupplies);
                    router.push('/productDetails');
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

export default Products;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    marginVertical: 5,
    color: Colors.purpleDark,
  },
});
