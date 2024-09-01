import { useRouter, Stack } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import HeaderButton from '~/components/headerButton';

export default function Layout() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Produse',
          headerRight: () => <HeaderButton onPress={() => router.push('/basket')} />,
        }}
      />
      <Stack.Screen
        name="basket"
        options={{
          title: 'Checkout',
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}
