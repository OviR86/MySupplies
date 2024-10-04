import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import PocketBase, { RecordModel } from 'pocketbase';
import { Colors } from '~/assets/styles';
const url = 'https://bound-lesson.pockethost.io/';
const client = new PocketBase(url);
import { capitalise, capitaliseFirst, formatDate } from '~/assets/helpers';
import { ScrollView } from 'react-native-gesture-handler';
import { customElevation } from '~/assets/styles';

const orders = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<RecordModel[]>([]);

  const statusColors: Record<string, string> = {
    new: Colors.lightBlue,
    processing: Colors.purpleMid,
    sent: 'green',
    cancelled: 'red',
  };

  const getOrdersFromPocketbase = async () => {
    try {
      setLoading(true);
      const records = await client.collection('orders').getFullList({
        sort: '-created',
      });
      if (records != null) {
        setOrders(records);
      }
      setLoading(false);
    } catch (e: any) {
      Alert.alert(`Order send error:, ${e}`);
    }
  };

  useEffect(() => {
    getOrdersFromPocketbase();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color={Colors.purpleDark} size={'large'} />
      ) : (
        <>
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            data={orders}
            renderItem={(item) => {
              return (
                <View style={[styles.itemContainer, customElevation]}>
                  <View style={{ height: '100%', justifyContent: 'space-evenly' }}>
                    <Text style={{ fontWeight: 'bold' }}>
                      Order ID: {item.item.id.slice(0, 8).toUpperCase()}
                    </Text>
                    <Text style={{ marginTop: -16 }}>{formatDate(item.item.created)}</Text>
                    <Text>
                      Status:{' '}
                      <Text
                        style={{
                          color: statusColors[item.item.status],
                          fontWeight: 'bold',
                        }}>
                        {capitalise(item.item.status)}
                      </Text>
                    </Text>
                  </View>
                  <ScrollView
                    contentContainerStyle={{
                      alignItems: 'flex-end',
                      justifyContent: 'space-between',
                    }}>
                    {item.item.items.map((item: any, index: any) => {
                      return (
                        <Text key={index} numberOfLines={1} style={{ alignSelf: 'center' }}>
                          {capitalise(item.name)}
                        </Text>
                      );
                    })}
                  </ScrollView>
                </View>
              );
            }}
          />
        </>
      )}
    </View>
  );
};

export default orders;

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
