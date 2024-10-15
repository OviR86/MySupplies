import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Href, Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PocketBase, { AsyncAuthStore, RecordAuthResponse } from 'pocketbase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuthStore from '~/stores/authenticationStore';

const url = 'https://bound-lesson.pockethost.io/';

const store = new AsyncAuthStore({
  save: async (serialized) => {
    console.log('token=====>', serialized);
    AsyncStorage.setItem('pb_auth', serialized);
  },
  initial: AsyncStorage.getItem('pb_auth'),
});

const client = new PocketBase(url, store);
client.autoCancellation(false);
export default function Layout() {
  const router = useRouter();
  const { setUserName, setEmail, setPassword, setRole, role, userName, email, password, setId } =
    useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      console.log(
        'Main _layout file: checkAuth-client.authStore.isValid-->',
        client.authStore.isValid
      );

      const isValidAuth = client.authStore.isValid;
      if (isValidAuth) {
        const user = client.authStore.model;
        setUserName(user?.username);
        setRole(user?.role);
        setId(user?.id);
      }
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
