import { create } from 'zustand';

export interface Item {
  id: string;
  name: string;
  supplier: string;
  unit: string;
  image: string | undefined;
  category: string;
  quantity: number;
  setOrderItem?: () => void;
}

interface ItemByIdStore {
  selectedItem: Item | null;
  setSelectedItem: (item: Item | null) => void;
  getItemById: (itemId: string, array: Item[]) => void | undefined;
}

//SET THE ITEM TO BE DISPLAYED IN THE BOTTOM SHEET

export const useItemByIdStore = create<ItemByIdStore>((set) => ({
  selectedItem: null,
  setSelectedItem: (item: Item | null) => set({ selectedItem: item }),

  //SINGLE OUT ONE ITEM TO DISPLAY IN BOTTOM SHEET:
  getItemById: (id: string, array: Item[] | null) => {
    const item = array!.find((item) => item.id === id);
    if (item) {
      set({ selectedItem: item });
    } else {
      set({ selectedItem: null });
    }
  },
}));
