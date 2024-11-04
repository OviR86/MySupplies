import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors, customElevation } from '~/assets/styles';
import { capitalise, formatDate } from '~/assets/helpers';
import { RecordModel } from 'pocketbase';

type OrderListItemType = {
  item: RecordModel;
  statusColors: Record<string, string>;
};

const OrderListItem = ({ item, statusColors }: OrderListItemType) => {
  return (
    <View style={[styles.itemContainer, customElevation]}>
      <View style={{ height: '100%', justifyContent: 'space-evenly' }}>
        <Text style={{ fontWeight: 'bold' }}>Order ID: {item.id.slice(0, 8).toUpperCase()}</Text>
        <Text style={{ marginTop: -16 }}>{formatDate(item.created)}</Text>
        <Text>
          Status:{' '}
          <Text
            style={{
              color: statusColors[item.status],
              fontWeight: 'bold',
            }}>
            {capitalise(item.status)}
          </Text>
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}>
        {item.items.map((item: any, index: any) => {
          return (
            <Text key={index} numberOfLines={1} style={{ alignSelf: 'center' }}>
              {capitalise(item.name)}
            </Text>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default OrderListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    marginVertical: 5,
    color: Colors.purpleDark,
  },
  listContainer: {
    flexGrow: 1,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 5,
  },
  itemContainer: {
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 8,
    flexDirection: 'row',
    width: '97%',
    height: 100,
    borderRadius: 7,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
