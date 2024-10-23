import create from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types/product';

interface FavoriteState {
  favorites: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
}

const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],
      
      addFavorite: (product) => 
        set((state) => ({
          favorites: [...state.favorites, product]
        })),
      
      removeFavorite: (productId) =>
        set((state) => ({
          favorites: state.favorites.filter((p) => p.id !== productId)
        })),
      
      isFavorite: (productId) =>
        get().favorites.some((p) => p.id === productId),
    }),
    {
      name: 'favorites-storage',
    }
  )
);

export default useFavoriteStore;