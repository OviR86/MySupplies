import { useRouter, Stack } from 'expo-router';
import { View } from 'react-native';
import { Colors } from '~/assets/colors';
import HeaderButton from '~/components/headerButton';

export default function Layout() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Produse',
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 30 }}>
              <HeaderButton
                onPress={() => router.push('/basket')}
                name="user-circle"
                color="#b9b7bd"
                size={24}
              />
              <HeaderButton
                onPress={() => router.push('/basket')}
                name="shopping-basket"
                color={Colors.purpleMid}
                size={24}
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
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}
