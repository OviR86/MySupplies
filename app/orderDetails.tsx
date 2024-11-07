import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import DB from './db';
import { RecordModel } from 'pocketbase';
import { Colors, customElevation, statusColors } from '~/assets/styles';
import { capitalise, formatDate } from '~/assets/helpers';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import StatusChangeBottomSheet from '~/components/statusChangeBottomSheet';

const OrderDetails = () => {
  const { orderId } = useLocalSearchParams();
  const [order, setOrder] = useState<RecordModel | null>(null);
  const [loading, setLoading] = useState(false);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handleStatusPress = () => {
    bottomSheetRef.current?.present();
  };

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const fetchedOrder = await DB.collection('orders').getOne(orderId as string);
      setOrder(fetchedOrder);
    } catch (error) {
      alert(`Error fetching order: ${error}`);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={Colors.purpleDark} size="large" />
      </View>
    );
  }

  if (!order) {
    return <Text>No order found.</Text>;
  }

  return (
    <View style={styles.container}>
      <StatusChangeBottomSheet ref={bottomSheetRef} />
      <View style={styles.orderDetailsText}>
        <Text style={styles.orderText}>
          Order ID:{' '}
          <Text style={[styles.orderText, { fontWeight: 'bold' }]}>
            {order.id.slice(0, 8).toUpperCase()}
          </Text>
        </Text>
        <Text style={styles.orderText}>
          Date:{' '}
          <Text style={[styles.orderText, { fontWeight: 'bold' }]}>
            {formatDate(order.created)}
          </Text>
        </Text>
      </View>

      <Text
        numberOfLines={3}
        style={[styles.orderText, { alignSelf: 'flex-start', marginLeft: 7 }]}>
        Deliver to:{' '}
        <Text style={[styles.orderText, { fontWeight: 'bold', textAlign: 'right' }]}>
          {order.user}
        </Text>
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.orderText}>Status: </Text>
        <TouchableOpacity
          onPress={() => handleStatusPress()}
          style={[{ backgroundColor: 'white', padding: 7, borderRadius: 5 }, customElevation]}>
          <Text style={{ color: statusColors[order.status], fontSize: 14 }}>
            {capitalise(order.status)}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionHeader}>Products:</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ width: '100%' }}
        contentContainerStyle={{ alignItems: 'center', paddingVertical: 15, gap: 10 }}
        data={order.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.productContainer, customElevation]}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text>{capitalise(item.name)}</Text>
              <View style={styles.quantityRow}>
                <Text style={styles.quantityText}>Quantity: {item.quantity} X </Text>
                <Text style={styles.unitText}> {item.unit}</Text>
              </View>
              <Text style={styles.unitText}>
                Supplied by:{' '}
                <Text style={[styles.unitText, { color: 'black', fontWeight: 'bold' }]}>
                  {item.supplier.toUpperCase()}
                </Text>
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    marginBottom: 10,
    alignItems: 'center',
  },
  orderDetailsText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 7,
    gap: 15,
  },
  orderText: {
    fontSize: 16,
    marginVertical: 2,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  productContainer: {
    flexDirection: 'row',
    width: '97%',
    height: 130,
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  productImage: {
    width: 110,
    height: 110,
    borderRadius: 10,
    flex: 1,
    resizeMode: 'contain',
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    flexShrink: 1,
    marginBottom: 5,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 14,
    color: Colors.darkGray,
  },
  unitText: {
    fontSize: 14,
    color: Colors.darkGray,
  },
});
