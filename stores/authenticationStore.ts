import { create } from 'zustand';
import PocketBase from 'pocketbase';
import { Router } from 'expo-router';

const url = 'https://bound-lesson.pockethost.io/';
const client = new PocketBase(url);

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
      await client.authStore.clear();
      console.log('User signed out successfully.');
      set({
        userName: '',
        email: '',
        password: '',
        role: '',
        id: '',
      });

      router.replace('/(auth)/login');
      console.log(
        'LOGOUT from auth store router.replace--success--client.authStore-->',
        client.authStore
      );
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  },
}));

export default useAuthStore;
