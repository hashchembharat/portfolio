import { create } from "zustand";

interface GlobalState {
  selectedProductsCategory: string[];
  searchedText: string;
  updateSelectedProductsCategory: (productsCategory: string[]) => void;
  updateSearchText: (searchedText: string) => void;
}

const useGlobalStore = create<GlobalState>((set: any) => ({
  selectedProductsCategory: [],
  searchedText: "",
  updateSelectedProductsCategory: (selectedProductsCategory: string[]) =>
    set(() => ({ selectedProductsCategory })),
  updateSearchText: (searchedText: string) => set(() => ({ searchedText })),
}));

export default useGlobalStore;
