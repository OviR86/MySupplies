import { create } from 'zustand';
import { Router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PocketBase, { AsyncAuthStore, RecordAuthResponse } from 'pocketbase';

import DB from '~/app/db';
type AuthState = {
  userName: string;
  email: string;
  password: string;
  role: string;
  id: string;
  setUserName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setRole: (role: string) => void;
  setId: (id: string) => void;
  signOut: (router: Router) => void;
};

const useAuthStore = create<AuthState>((set) => ({
  userName: '',
  email: '',
  password: '',
  role: '',
  id: '',
  setUserName: (name) => set({ userName: name }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setRole: (role) => set({ role }),
  setId: (id) => set({ id }),

  signOut: async (router: Router) => {
    try {
      await DB.authStore.clear();
      console.log('User signed out successfully.');
      set({
        userName: '',
        email: '',
        password: '',
        role: '',
        id: '',
      });

      router.replace('/(auth)/login');
      console.log('LOGOUT from auth store router.replace--success--DB.authStore-->', DB.authStore);
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  },
}));

export default useAuthStore;
