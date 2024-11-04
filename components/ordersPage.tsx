import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import PocketBase, { RecordModel } from 'pocketbase';
import { Colors } from '~/assets/styles';
import { capitalise, formatDate } from '~/assets/helpers';
import { ScrollView } from 'react-native-gesture-handler';
import { customElevation } from '~/assets/styles';
import useAuthStore from '~/stores/authenticationStore';
import DB from '~/app/db';
import OrderListItem from './orderListItem';

const Orders = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<RecordModel[]>([]);
  const { userData } = useAuthStore();

  const statusColors: Record<string, string> = {
    new: Colors.lightBlue,
    processing: Colors.purpleMid,
    sent: 'green',
    cancelled: 'red',
  };

  const getOrdersFromPocketbase = async () => {
    console.log('getOrdersFromPocketbase role--->', userData?.role);

    try {
      setLoading(true);
      if (userData?.role === 'admin' || userData?.role === 'supplier') {
        const records = await DB.collection('orders').getFullList({
          sort: '-created',
        });
        if (records != null) {
          setOrders(records);
        }
      } else {
        const records = await DB.collection('orders').getFullList({
          filter: `userId="${userData?.id}"`,
          sort: '-created',
        });
        if (records != null) {
          setOrders(records);
        }
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
            renderItem={({ item }) => <OrderListItem item={item} statusColors={statusColors} />}
          />
        </>
      )}
    </View>
  );
};

export default Orders;

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
