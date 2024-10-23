import create from 'zustand';
import { Product, ProductFilters, ProductList } from '../types/product';
import { productService } from '../services/products';

interface ProductState {
  products: Product[];
  total: number;
  loading: boolean;
  error: string | null;
  filters: ProductFilters;
  setFilters: (filters: Partial<ProductFilters>) => void;
  fetchProducts: () => Promise<void>;
  syncProducts: (platform?: string) => Promise<void>;
}

const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  total: 0,
  loading: false,
  error: null,
  filters: {
    page: 1,
    limit: 20,
    sort_by: 'created_at',
    sort_order: 'desc',
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
    get().fetchProducts();
  },

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await productService.getProducts(get().filters);
      set({
        products: response.items,
        total: response.total,
        loading: false,
      });
    } catch (error) {
      set({
        error: 'Erreur lors de la récupération des produits',
        loading: false,
      });
    }
  },

  syncProducts: async (platform?) => {
    try {
      await productService.syncProducts(platform);
      get().fetchProducts();
    } catch (error) {
      set({ error: 'Erreur lors de la synchronisation des produits' });
    }
  },
}));

export default useProductStore;