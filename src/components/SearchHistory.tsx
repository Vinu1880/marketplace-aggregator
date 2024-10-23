import { motion } from 'framer-motion';
import useSearchHistoryStore from '../store/searchHistoryStore';
import useProductStore from '../store/productStore';

export default function SearchHistory() {
  const { history, clearHistory } = useSearchHistoryStore();
  const { setFilters } = useProductStore();

  const applySearch = (query: string, filters: Record<string, any>) => {
    setFilters({ ...filters, search: query });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-lg shadow-md p-4"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Historique des recherches</h3>
        <button
          onClick={clearHistory}
          className="text-sm text-red-500 hover:text-red-600"
        >
          Effacer
        </button>
      </div>

      <div className="space-y-2">
        {history.map((item, index) => (
          <motion.button
            key={item.timestamp}
            whileHover={{ scale: 1.02 }}
            className="w-full text-left p-2 rounded-md hover:bg-gray-50"
            onClick={() => applySearch(item.query, item.filters)}
          >
            <p className="font-medium">{item.query || 'Recherche sans texte'}</p>
            <p className="text-sm text-gray-500">
              {new Date(item.timestamp).toLocaleDateString()}
            </p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}