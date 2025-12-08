import { create } from "zustand";

interface ProductState {
  products: string[];
  addProduct: (product: string) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  addProduct: (product) =>
    set((state) => ({ products: [...state.products, product] })),
}));
