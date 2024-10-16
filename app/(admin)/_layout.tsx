import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { router, Slot, Stack } from 'expo-router';
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
              onPress={() => router.push('/signup')}
            />
          ),
        }}
      />
    </Stack>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
