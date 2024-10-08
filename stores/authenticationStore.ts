import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import PocketBase from 'pocketbase';
import { useRouter } from 'expo-router';
const url = 'https://bound-lesson.pockethost.io/';
const client = new PocketBase(url);
const router = useRouter();

type AuthState = {
  userName: string;
  email: string;
  password: string;
  role: string;
  setUserName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setRole: (role: string) => void;
  createUser: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
};

const useAuthStore = create<AuthState>((set, get) => ({
  userName: '',
  email: '',
  password: '',
  role: '',
  setUserName: (name) => set({ userName: name }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setRole: (role) => set({ role }),

  //CREATE ACCOUNT

  createUser: async () => {
    const { userName, email, password, role, setEmail, setPassword, setRole, setUserName } = get();
    const data = {
      username: userName,
      email: email,
      emailVisibility: true,
      password: password,
      passwordConfirm: password,
      role: role,
    };
    try {
      const record = await client.collection('users').create(data);

      //   await AsyncStorage.setItem('userData', JSON.stringify(record)); // Persist data
    } catch (error) {
      console.error('Error creating user:', error);
    }
  },

  signIn: async (email, password) => {
    try {
      const record = await client.collection('users').authWithPassword(email, password);

      //   await AsyncStorage.setItem('userData', JSON.stringify(record)); // Persist data
    } catch (error) {
      console.error('Error signing in:', error);
    }
  },

  signOut: () => {
    client.authStore.clear(); // Clear session

    // await AsyncStorage.removeItem('userData'); // Remove persisted data
  },
}));

export default useAuthStore;
