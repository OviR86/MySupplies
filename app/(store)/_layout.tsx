import { useRouter, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Colors } from '~/assets/styles';
import { HeaderButton, HeaderButtonWithBadge } from '~/components/headerButton';
import useAuthStore from '~/stores/authenticationStore';
import useCartStore from '~/stores/cartStore';

export default function Layout() {
  const { cartItems, totalQuantity } = useCartStore();
  const { userName, id } = useAuthStore();

  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Produse',
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 30, alignItems: 'center' }}>
              <Text style={{ fontSize: 11, color: Colors.inactiveGray }}>Welcome, {userName}</Text>
              <HeaderButton
                onPress={() => router.push('/user')}
                name="user-circle"
                color={Colors.inactiveGray}
                size={24}
              />
              <HeaderButtonWithBadge
                onPress={() => router.push('/basket')}
                name="shopping-basket"
                color={Colors.purpleDark}
                size={24}
                showBadge={cartItems.length === 0 ? false : true}
                badgeNumber={totalQuantity}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="basket"
        options={{
          headerShown: false,
          title: 'Checkout',
        }}
      />
      <Stack.Screen
        name="user"
        options={{
          title: 'User',
        }}
      />
      <Stack.Screen
        name="orders"
        options={{
          title: 'Orders',
        }}
      />
    </Stack>
  );
}
