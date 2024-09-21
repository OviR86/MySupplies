import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import HeaderButton from '~/components/headerButton';
import { Colors } from '~/assets/styles';
import CartItem from '~/components/cartItem';
import GeneralButton from '~/components/generalButton';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import useCartStore from '~/stores/cartStore';
import { capitalise } from '~/assets/helpers';

const Basket = () => {
  const [totalQuantity, setTotalQuantity] = useState<number | null>(0);
  const router = useRouter();
  const { cartItems } = useCartStore();

  //ADD THE QUANTITIES FROM EVERY CART ITEM
  useEffect(() => {
    const mappedQuantity = cartItems.reduce((total, item) => {
      return item && item.quantity ? total + item.quantity : total;
    }, 0);
    setTotalQuantity(mappedQuantity);
  }, [cartItems]);

  //DISPLAYS IF NO CART ITEMS
  const EmptyCartView = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          gap: 25,
          marginBottom: 60,
        }}>
        <Text style={{ fontSize: 25, color: Colors.inactiveGray, fontWeight: '300' }}>
          Your cart is empty
        </Text>
        <MaterialCommunityIcons name="cart-remove" size={250} color={Colors.inactiveGray} />
      </View>
    );
  };

  //DISPLAYS IF AT LEAT ONE CART ITEM
  const FullCart = () => {
    return (
      <>
        <View style={styles.cartItemsContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: 'center',
              gap: 10,
              width: '100%',
              padding: 7,
            }}>
            {cartItems.map((item, key) => {
              if (item != null)
                return (
                  <CartItem
                    key={key}
                    image={item.image}
                    name={item.name}
                    unit={item.unit}
                    quantity={item.quantity}
                    supplier={item.supplier}
                  />
                );
            })}
          </ScrollView>
        </View>

        <View style={styles.summaryContainer}>
          <Text
            style={{
              fontWeight: '600',
              fontSize: 20,
              alignSelf: 'flex-start',
              marginBottom: 5,
            }}>
            Order Summary:
          </Text>

          <View style={styles.summaryDescription}>
            <ScrollView
              style={{ minHeight: 30, maxHeight: 100 }}
              contentContainerStyle={{ gap: 6 }}
              showsVerticalScrollIndicator={false}>
              {cartItems.map((item, key) => {
                if (item != null)
                  return (
                    <View style={styles.summaryItem} key={key}>
                      <Text style={styles.summaryItemText}>{capitalise(item.name)}</Text>
                      <Text style={styles.summaryItemText}>{item.quantity}</Text>
                    </View>
                  );
              })}
            </ScrollView>

            <View style={styles.underline}></View>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryItemText, { fontWeight: 'bold' }]}>Total products:</Text>
              <Text style={[styles.summaryItemText, { fontWeight: 'bold' }]}>
                {totalQuantity} pcs.
              </Text>
            </View>
          </View>
          <GeneralButton
            title="Send order"
            style={{ width: '90%', height: 40, borderRadius: 7 }}
            textStyle={{ fontSize: 20, fontWeight: 'bold' }}
            OnPress={() => alert('Checkout')}
          />
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <HeaderButton
          name="arrow-circle-left"
          size={32}
          color={Colors.purpleMid}
          onPress={() => router.back()}
          style={styles.backButton}
        />
        <Text style={{ fontSize: 27, fontWeight: '300' }}>Cart</Text>
      </View>
      {cartItems.length == 0 ? <EmptyCartView /> : <FullCart />}
    </View>
  );
};

export default Basket;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
  },
  titleContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  cartItemsContainer: {
    width: '100%',
    flex: 3.2,
    marginBottom: 10,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 30,
  },
  summaryContainer: {
    flex: 1.9,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 7,
  },
  summaryDescription: {
    minHeight: 100,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 7,
    paddingHorizontal: 5,
    paddingVertical: 5,
    gap: 7,
    marginBottom: 5,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  summaryItemText: {
    fontSize: 15,
  },
  underline: {
    height: 2,
    width: 300,
    backgroundColor: '#D3D3D3',
    borderRadius: 20,
    alignSelf: 'center',
  },
});
