import { create } from 'zustand';
import { Item } from '~/stores/itemByIdStore';

interface CartStore {
  cartItems: Item[];
  addCartItem: (item: Item) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
}

const useCartStore = create<CartStore>((set) => ({
  cartItems: [],
  addCartItem: (item: Item) =>
    set((state) => ({
      cartItems: [...state.cartItems, item],
    })),

  updateItemQuantity: (id: string, quantity: number) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) => (item.id === id ? { ...item, quantity } : item)),
    })),
}));

export default useCartStore;
