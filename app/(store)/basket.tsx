import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import HeaderButton from '~/components/headerButton';
import { Colors } from '~/assets/colors';
import CartItem from '~/components/cartItem';
import GeneralButton from '~/components/generalButton';
import { ScrollView } from 'react-native-gesture-handler';

const Basket = () => {
  const router = useRouter();

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
      <View style={styles.cartItemsContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
            gap: 10,
            width: '100%',
            padding: 7,
          }}>
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
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
          Order Summary
        </Text>

        <View style={styles.summaryDescription}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryItemText}>Product 1</Text>
            <Text style={styles.summaryItemText}>20 pcs.</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryItemText}>Product 2</Text>
            <Text style={styles.summaryItemText}>120 pcs.</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryItemText}>Product 3</Text>
            <Text style={styles.summaryItemText}>4 pcs.</Text>
          </View>
          <View
            style={{
              height: 2,
              width: 300,
              backgroundColor: '#D3D3D3',
              borderRadius: 20,
              alignSelf: 'center',
            }}></View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryItemText, { fontWeight: 'bold' }]}>Total products</Text>
            <Text style={[styles.summaryItemText, { fontWeight: 'bold' }]}>144 pcs.</Text>
          </View>
        </View>
        <GeneralButton
          title="Send order"
          style={{ width: '90%', height: 40, borderRadius: 7 }}
          textStyle={{ fontSize: 20, fontWeight: 'bold' }}
          OnPress={() => alert('Checkout')}
        />
      </View>
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
    // backgroundColor: 'yellow',
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
    // position: 'absolute',
    // bottom: 20,
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
});
