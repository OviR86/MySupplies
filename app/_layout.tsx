import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Href, Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PocketBase from 'pocketbase';
const url = 'https://bound-lesson.pockethost.io/';
const client = new PocketBase(url);

export default function Layout() {
  const router = useRouter();

  useEffect(() => {
    if (!client.authStore.token) {
      router.replace('/(auth)/login');
    }
  }, []);

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
          <Stack
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(supplier)" />
            <Stack.Screen name="(store)" />
          </Stack>
          <StatusBar style="auto" />
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
