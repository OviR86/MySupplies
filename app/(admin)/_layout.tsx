import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { router, Stack } from 'expo-router';
import { HeaderButton } from '~/components/headerButton';
import { Colors } from '~/assets/styles';

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Admin pannel' }} />
      <Stack.Screen name="signup" options={{ title: 'Create new user account' }} />
      <Stack.Screen name="orders" options={{ title: 'Orders admin' }} />
      <Stack.Screen
        name="users"
        options={{
          title: 'Users',
          headerRight: () => (
            <HeaderButton
              name="user-plus"
              color={Colors.purpleDark}
              size={23}
              onPress={() => router.replace('/signup')}
            />
          ),
        }}
      />
      <Stack.Screen name="editUser" options={{ title: 'Edit user details' }} />
      <Stack.Screen name="addProduct" options={{ title: 'Add new product' }} />
      <Stack.Screen
        name="products"
        options={{
          title: 'Products',
          headerRight: () => (
            <View style={styles.addProductContainer}>
              <Text style={{ color: Colors.inactiveGray }}>Add product:</Text>
              <HeaderButton
                name="plus-square-o"
                color={Colors.purpleDark}
                size={30}
                onPress={() => router.push('/addProduct')}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen name="productDetails" options={{ title: 'Product details' }} />
    </Stack>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({
  addProductContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
