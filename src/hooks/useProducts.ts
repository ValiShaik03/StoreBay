import { useState, useEffect } from 'react';
import { database } from '../lib/database';
import { Product } from '../types';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await database.getProducts();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product: Omit<Product, 'id' | 'created_at'>) => {
    try {
      const newProduct = await database.addProduct(product);
      setProducts(prev => [newProduct, ...prev]);
      return newProduct;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add product');
      throw err;
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      const updatedProduct = await database.updateProduct(id, updates);
      if (updatedProduct) {
        setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p));
      }
      return updatedProduct;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update product');
      throw err;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const success = await database.deleteProduct(id);
      if (success) {
        setProducts(prev => prev.filter(p => p.id !== id));
      }
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete product');
      throw err;
    }
  };

  return { 
    products, 
    loading, 
    error, 
    refetch: fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct
  };
};