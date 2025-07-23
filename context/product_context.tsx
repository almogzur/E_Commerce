'use client';
import { Product } from '@/util/zod/types';
import React, { createContext, useContext, useState, ReactNode } from 'react';



type ProductContextType = {
  product: Product | null;
  setProduct: (product: Product) => void;
  clearProduct: () => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {

  const [product, setProduct] = useState<Product | null>(null);

  const clearProduct = () => setProduct(null);

  return (
    <ProductContext.Provider value={{ product, setProduct, clearProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};
