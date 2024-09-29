import { create } from 'zustand';
import { Item } from '~/stores/itemByIdStore';

interface CartStore {
  cartItems: Item[];
  addCartItem: (item: Item) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  totalQuantity?: number;
  removeItem: (id: string) => void;
}

const useCartStore = create<CartStore>((set) => ({
  cartItems: [],
  totalQuantity: 0,
  addCartItem: (item: Item) =>
    set((state) => {
      const newCartItems = [...state.cartItems, item];
      const newTotalQuantity = newCartItems.reduce((total, item) => {
        return total + (item.quantity || 0);
      }, 0);
      return {
        cartItems: newCartItems,
        totalQuantity: newTotalQuantity,
      };
    }),

  updateItemQuantity: (id: string, quantity: number) =>
    set((state) => {
      const newCartItems = state.cartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      const newTotalQuantity = newCartItems.reduce(
        (total, item) => total + (item.quantity || 0),
        0
      );

      return {
        cartItems: newCartItems,
        totalQuantity: newTotalQuantity,
      };
    }),

  removeItem: (id: string) =>
    set((state) => {
      const newCartItems = state.cartItems.filter((item) => item.id !== id);
      const newTotalQuantity = newCartItems.reduce(
        (total, item) => total + (item.quantity || 0),
        0
      );
      return {
        cartItems: newCartItems,
        totalQuantity: newTotalQuantity,
      };
    }),
}));

export default useCartStore;
