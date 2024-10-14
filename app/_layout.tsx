import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Href, Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PocketBase from 'pocketbase';
const url = 'https://bound-lesson.pockethost.io/';
const client = new PocketBase(url);

export default function Layout() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      console.log(
        'Main _layout file: checkAuth-client.authStore.isValid-->',
        client.authStore.isValid
      );

      const isValidAuth = client.authStore.isValid;
      const userRole = client.authStore.model?.role;

      if (isValidAuth && userRole) {
        // User is authenticated, route based on their role
        if (userRole === 'supplier') {
          router.replace('/(supplier)');
        } else if (userRole === 'store') {
          router.replace('/(store)');
        } else if (userRole === 'admin') {
          router.replace('/(admin)');
        }
      } else {
        // No valid authentication, send to login
        router.replace('/login');
      }
    };

    checkAuth();
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
