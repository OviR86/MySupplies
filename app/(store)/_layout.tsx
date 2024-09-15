import { useRouter, Stack } from 'expo-router';
import { View } from 'react-native';
import { Colors } from '~/assets/styles';
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
                onPress={() => router.push('/user')}
                name="user-circle"
                color={Colors.inactiveGray}
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
      <Stack.Screen
        name="user"
        options={{
          headerShown: false,
          title: 'User',
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}
