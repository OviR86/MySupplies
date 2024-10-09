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
  setUserName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setRole: (role: string) => void;
  signOut: (router: Router) => void;
};

const useAuthStore = create<AuthState>((set) => ({
  userName: '',
  email: '',
  password: '',
  role: '',
  setUserName: (name) => set({ userName: name }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setRole: (role) => set({ role }),

  signOut: (router: Router) => {
    if (client.authStore.token) {
      // Clear the auth store to log out the user if the token exists
      client.authStore.clear();
      console.log('User signed out successfully.');
    } else {
      console.log('No active session found.');
    }

    // Redirect to the login screen regardless of whether the token exists
    router.replace('/login');
  },
}));

export default useAuthStore;
