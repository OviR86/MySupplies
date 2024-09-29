import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '~/assets/styles';
import { HeaderButton } from './headerButton';
import { capitalise, capitaliseFirst } from '~/assets/helpers';
import useCartStore from '~/stores/cartStore';

type CartItemType = {
  id: string;
  name: string;
  supplier: string;
  unit: string;
  image: string | undefined;
  quantity: number;
};

const CartItem = (props: CartItemType) => {
  const { updateItemQuantity, removeItem } = useCartStore();

  const increaseQuantity = () => {
    updateItemQuantity(props.id, props.quantity + 1);
  };
  const decreaseQuantity = () => {
    if (props.quantity > 0) {
      updateItemQuantity(props.id, props.quantity - 1);
    }
  };

  const deleteItem = () => {
    Alert.alert('Delete item', `Are you sure you want to detele ${props.name}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Ok',
        style: 'default',
        onPress: () => {
          removeItem(props.id);
        },
      },
    ]);
  };

  return (
    <View style={[styles.container]}>
      <Image source={{ uri: props.image }} style={{ height: 70, width: 70, overflow: 'hidden' }} />
      <View
        style={{
          height: '100%',
          alignItems: 'baseline',
          justifyContent: 'space-evenly',
          flex: 1,
          marginLeft: 15,
        }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold' }} numberOfLines={2}>
          {capitalise(props.name)}
        </Text>
        <Text style={{ color: Colors.purpleDark, fontSize: 15, fontWeight: '500' }}>
          {capitalise(props.supplier)}
        </Text>
      </View>
      <View
        style={{
          height: '100%',
          alignItems: 'flex-end',
          justifyContent: 'space-evenly',
          flex: 1,
          marginRight: 5,
        }}>
        <Text style={{ color: '#3b3b3b', fontSize: 15 }}>{capitaliseFirst(props.unit)}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}>
          <HeaderButton
            name={props.quantity == 1 ? 'trash-o' : 'minus-circle'}
            color={props.quantity == 1 ? 'red' : Colors.purpleMid}
            onPress={props.quantity == 1 ? deleteItem : decreaseQuantity}
            size={25}
          />
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityText}>{props.quantity}</Text>
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
