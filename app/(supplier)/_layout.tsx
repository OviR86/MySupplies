import { Stack, useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { Colors } from '~/assets/styles';
import { HeaderButton } from '~/components/headerButton';
import useAuthStore from '~/stores/authenticationStore';

export default function Layout() {
  const { userData } = useAuthStore();
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Comenzi',
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 30, alignItems: 'center' }}>
              <Text style={{ fontSize: 11, color: Colors.inactiveGray }}>
                Welcome, {userData?.userName}
              </Text>
              <HeaderButton
                onPress={() => router.push('/user')}
                name="user-circle"
                color={Colors.inactiveGray}
                size={24}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen name="user" options={{ title: 'Options' }} />
    </Stack>
  );
}
