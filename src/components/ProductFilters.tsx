import { motion } from 'framer-motion';
import { useCallback } from 'react';
import { debounce } from 'lodash';
import useProductStore from '../store/productStore';

export default function ProductFilters() {
  const { filters, setFilters } = useProductStore();

  const debouncedSetFilters = useCallback(
    debounce((newFilters) => setFilters(newFilters), 300),
    [setFilters]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-4 rounded-lg shadow-md space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Plateforme</label>
          <select
            value={filters.platform || ''}
            onChange={(e) => setFilters({ platform: e.target.value || undefined })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Toutes</option>
            <option value="facebook">Facebook</option>
            <option value="anibis">Anibis</option>
            <option value="tutti">Tutti</option>
            <option value="ricardo">Ricardo</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Recherche</label>
          <input
            type="text"
            placeholder="Rechercher..."
            onChange={(e) => debouncedSetFilters({ search: e.target.value || undefined })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Prix min</label>
          <input
            type="number"
            min="0"
            onChange={(e) => debouncedSetFilters({ min_price: e.target.value ? Number(e.target.value) : undefined })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Prix max</label>
          <input
            type="number"
            min="0"
            onChange={(e) => debouncedSetFilters({ max_price: e.target.value ? Number(e.target.value) : undefined })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <select
            value={filters.sort_by}
            onChange={(e) => setFilters({ sort_by: e.target.value })}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="created_at">Date</option>
            <option value="price">Prix</option>
            <option value="title">Titre</option>
          </select>
          
          <select
            value={filters.sort_order}
            onChange={(e) => setFilters({ sort_order: e.target.value as 'asc' | 'desc' })}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="desc">Décroissant</option>
            <option value="asc">Croissant</option>
          </select>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setFilters({
            platform: undefined,
            search: undefined,
            min_price: undefined,
            max_price: undefined,
            sort_by: 'created_at',
            sort_order: 'desc',
          })}
          className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
        >
          Réinitialiser
        </motion.button>
      </div>
    </motion.div>
  );
}