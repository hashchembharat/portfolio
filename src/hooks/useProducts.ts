import { useEffect, useState } from 'react';
import { ProductModel } from '../types/ProductModel';

type UseProductsResult = {
  products: ProductModel[];
  isLoading: boolean;
  error: Error | null;
};

/**
 * useProducts - loads products from a configurable URL.
 * It defaults to public/assets/data/products.json but can be overridden
 * by setting VITE_PRODUCTS_URL in your environment.
 */
export function useProducts(url?: string): UseProductsResult {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    const defaultUrl = `${import.meta.env.BASE_URL || '/'}assets/data/products.json`;
    const fetchUrl = url || (import.meta.env.VITE_PRODUCTS_URL as string) || defaultUrl;

    setIsLoading(true);
    setError(null);

    fetch(fetchUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load ${fetchUrl}: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!mounted) return;
        if (Array.isArray(data)) setProducts(data as ProductModel[]);
        else setProducts([]);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err as Error);
        setProducts([]);
      })
      .finally(() => {
        if (!mounted) return;
        setIsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [url]);

  return { products, isLoading, error };
}
