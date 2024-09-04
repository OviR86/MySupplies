import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Href, Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {
  const [initialRoute, setInitialRoute] = useState<Href<string | object>>('/(store)');
  const router = useRouter();

  useEffect(() => {
    return router.replace(initialRoute);
  }, [initialRoute]);

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="(supplier)" />
          <Stack.Screen name="(store)" />
        </Stack>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
