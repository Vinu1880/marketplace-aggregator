import create from 'zustand';
import { persist } from 'zustand/middleware';

interface SearchHistory {
  query: string;
  timestamp: number;
  filters: Record<string, any>;
}

interface SearchHistoryState {
  history: SearchHistory[];
  addToHistory: (query: string, filters: Record<string, any>) => void;
  clearHistory: () => void;
}

const useSearchHistoryStore = create<SearchHistoryState>()(
  persist(
    (set) => ({
      history: [],
      
      addToHistory: (query, filters) =>
        set((state) => ({
          history: [
            { query, filters, timestamp: Date.now() },
            ...state.history,
          ].slice(0, 10), // Garde les 10 dernières recherches
        })),
      
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'search-history-storage',
    }
  )
);

export default useSearchHistoryStore;