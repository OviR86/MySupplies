import { create } from 'zustand';
import DB, { url } from '../app/db';
import { RecordModel } from 'pocketbase';

interface mappedSuppliesType {
  id: string;
  name: any;
  supplier: any;
  unit: any;
  image: string;
  category: any;
}

interface SuppliesState {
  suplyList: RecordModel[];
  uniqueCategories: string[];
  mappedSupplies: mappedSuppliesType[];
  loading: boolean;
  getSupplyList: () => Promise<void>;
}
//GET PRODUCTS LIST FROM POCKETBASE DB
export const useSupliesStore = create<SuppliesState>((set) => ({
  suplyList: [],
  uniqueCategories: [],
  mappedSupplies: [],
  loading: false,
  getSupplyList: async () => {
    set({ loading: true });
    try {
      const records = await DB.collection('supplies').getFullList({
        sort: '-category',
      });

      //CREATE IMAGE URL FOR POCKETBASE STORRED IMAGES
      const buildImageURL = (fileName: string, collectionId: string, itemId: string): string => {
        return `${url}api/files/${collectionId}/${itemId}/${fileName}`;
      };

      //CREATE A NEW SUPPLIES LIST CONTAINING IMAGES WITH VALID URL'S
      const mappedSupplies = records.map((suply) => ({
        id: suply.id,
        name: suply.name as string, // Ensuring proper typing
        supplier: suply.supplier as string,
        unit: suply.unit as string,
        image: buildImageURL(suply.image, suply.collectionId, suply.id),
        category: suply.category as string,
      }));

      ///CREATE AN ARRAY OF CATEGORIES TO BE DISPLAYED WITH CATEGORY BUTTONS IN THE FILTER FUNCTIONALITY
      const uniqueCategories = [...new Set(records.map((product) => product.category))];
      set({ suplyList: records, uniqueCategories, mappedSupplies, loading: false });
    } catch (error: any) {
      console.log('getSupplyList error-->', JSON.stringify(error, null, 2));
      set({ loading: false });
    }
  },
}));
