import React, { createContext, useContext } from 'react';
import { useProducts } from '../hooks/useProducts';
import { ProductModel } from '../types/ProductModel';

type ProductsContextValue = {
  products: ProductModel[];
  isLoading: boolean;
};

const ProductsContext = createContext<ProductsContextValue | undefined>(undefined);

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { products, isLoading } = useProducts();
  return (
    <ProductsContext.Provider value={{ products, isLoading }}>
      {children}
    </ProductsContext.Provider>
  );
};

export function useProductsContext() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error('useProductsContext must be used within ProductsProvider');
  return ctx;
}
