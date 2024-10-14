import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Slot, Stack } from 'expo-router';

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Admin pannel' }} />
      <Stack.Screen name="signup" options={{ title: 'Create new user account' }} />
      <Stack.Screen name="orders" options={{ title: 'Orders admin' }} />
    </Stack>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
