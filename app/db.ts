import AsyncStorage from '@react-native-async-storage/async-storage';
import PocketBase, { AsyncAuthStore } from 'pocketbase';

export const url = 'https://PLACEHOLDER_POCKETBASE_URL/';

const store = new AsyncAuthStore({
  save: async (serialized) => {
    console.log('token=====>', serialized);
    AsyncStorage.setItem('pb_auth', serialized);
  },
  initial: AsyncStorage.getItem('pb_auth'),

  clear: async () => AsyncStorage.removeItem('pb_auth'),
});

const DB = new PocketBase(url, store);
DB.autoCancellation(false);

export default DB;
