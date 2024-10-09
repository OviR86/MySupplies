import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import PocketBase from 'pocketbase';

const url = 'https://bound-lesson.pockethost.io/';
const client = new PocketBase(url);

type AuthState = {
  userName: string;
  email: string;
  password: string;
  role: string;
  setUserName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setRole: (role: string) => void;
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

  signOut: () => {
    client.authStore.clear(); // Clear session

    // await AsyncStorage.removeItem('userData'); // Remove persisted data
  },
}));

export default useAuthStore;
