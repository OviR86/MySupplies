import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '~/assets/colors';
import HeaderButton from './headerButton';
import { customElevation } from '~/assets/styles';

const CartItem = () => {
  const [quantity, setQuantity] = useState(0);
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
    console.log('Plus');
  };
  const decreaseQuantity = () => {
    if (quantity <= 0) {
      setQuantity(0);
    } else {
      setQuantity(quantity - 1);
    }
    console.log('Minus');
  };

  const deleteItem = () => {
    alert('deleted');
  };

  return (
    <View style={[styles.container]}>
      <Image
        source={{ uri: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg' }}
        style={{ height: 70, width: 70, overflow: 'hidden' }}
      />
      <View
        style={{
          height: '100%',
          alignItems: 'baseline',
          justifyContent: 'space-evenly',
          flex: 1,
          marginLeft: 15,
        }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold' }} numberOfLines={2}>
          Enjoy my NEW self-produced ELECTION Special filmed at Comedy Mothership in Austin TX!
        </Text>
        <Text style={{ color: Colors.purpleDark, fontSize: 15, fontWeight: '500' }}>Cargus</Text>
      </View>
      <View
        style={{
          height: '100%',
          alignItems: 'flex-end',
          justifyContent: 'space-evenly',
          flex: 1,
          marginRight: 5,
        }}>
        <Text style={{ color: '#3b3b3b', fontSize: 15 }}>Sets of 10</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}>
          <HeaderButton
            name={quantity == 0 ? 'trash-o' : 'minus-circle'}
            color={quantity == 0 ? 'red' : Colors.purpleMid}
            onPress={quantity == 0 ? deleteItem : decreaseQuantity}
            size={25}
          />
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityText}>{quantity}</Text>
          </View>

          <HeaderButton
            name="plus-circle"
            color={Colors.purpleMid}
            onPress={increaseQuantity}
            size={25}
          />
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 90,
    paddingHorizontal: 4,
    borderRadius: 7,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityContainer: {
    minWidth: 30,
    minHeight: 30,
    backgroundColor: Colors.purpleMid,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  quantityText: {
    fontSize: 15,
    color: 'white',
    fontWeight: '400',
    padding: 3,
  },
});
