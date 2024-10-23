import { motion } from 'framer-motion';
import { Product } from '../types/product';

interface ProductComparisonProps {
  products: Product[];
  onClose: () => void;
}

export default function ProductComparison({ products, onClose }: ProductComparisonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="p-4 border-b sticky top-0 bg-white">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Comparaison des produits</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <div key={product.id} className="space-y-4">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h3 className="font-semibold">{product.title}</h3>
                <div className="space-y-2">
                  <p>Prix: {product.price} {product.currency}</p>
                  <p>Plateforme: {product.platform}</p>
                  <p>Localisation: {product.location}</p>
                </div>
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                  Voir l'annonce
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}