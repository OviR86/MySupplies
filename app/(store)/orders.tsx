import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import PocketBase, { RecordModel } from 'pocketbase';
import { Colors } from '~/assets/styles';
const url = 'https://bound-lesson.pockethost.io/';
const client = new PocketBase(url);

const orders = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<RecordModel[]>([]);

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
          <Text>Orders:</Text>
          <FlatList
            data={orders}
            renderItem={(item) => {
              return (
                <View style={{ marginTop: 15 }}>
                  <Text>{item.item.id}</Text>
                  <Text>{item.item.user}</Text>
                  <Text>{item.item.status}</Text>
                  {item.item.items.map((item: any, index: any) => {
                    return <Text key={index}>{item.name}</Text>;
                  })}
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
});
