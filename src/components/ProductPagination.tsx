import { motion } from 'framer-motion';
import useProductStore from '../store/productStore';

interface ProductPaginationProps {
  total: number;
}

export default function ProductPagination({ total }: ProductPaginationProps) {
  const { filters, setFilters } = useProductStore();
  const totalPages = Math.ceil(total / filters.limit!);
  const currentPage = filters.page || 1;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pages.slice(
    Math.max(0, currentPage - 3),
    Math.min(totalPages, currentPage + 2)
  );

  return (
    <div className="flex justify-center space-x-2">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={currentPage === 1}
        onClick={() => setFilters({ page: currentPage - 1 })}
        className="px-4 py-2 rounded-md bg-white shadow-sm disabled:opacity-50"
      >
        Précédent
      </motion.button>

      {visiblePages.map((page) => (
        <motion.button
          key={page}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setFilters({ page })}
          className={`px-4 py-2 rounded-md shadow-sm ${
            page === currentPage
              ? 'bg-blue-500 text-white'
              : 'bg-white hover:bg-gray-50'
          }`}
        >
          {page}
        </motion.button>
      ))}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={currentPage === totalPages}
        onClick={() => setFilters({ page: currentPage + 1 })}
        className="px-4 py-2 rounded-md bg-white shadow-sm disabled:opacity-50"
      >
        Suivant
      </motion.button>
    </div>
  );
}