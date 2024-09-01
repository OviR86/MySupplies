import { Href, Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

export default function Layout() {
  const [initialRoute, setInitialRoute] = useState<Href<string | object>>('/(store)');
  const router = useRouter();

  useEffect(() => {
    return router.replace(initialRoute);
  }, [initialRoute]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="(supplier)" />
      <Stack.Screen name="(store)" />
    </Stack>
  );
}
