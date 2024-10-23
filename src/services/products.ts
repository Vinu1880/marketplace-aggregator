import axios from 'axios';
import { Product, ProductFilters, ProductList } from '../types/product';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const productService = {
  async getProducts(filters: ProductFilters): Promise<ProductList> {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/products`, {
        params: filters,
      });
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des produits');
    }
  },

  async syncProducts(platform?: string): Promise<void> {
    try {
      await axios.get(`${API_BASE_URL}/api/products/sync`, {
        params: platform ? { platform } : undefined,
      });
    } catch (error) {
      throw new Error('Erreur lors de la synchronisation des produits');
    }
  },
};