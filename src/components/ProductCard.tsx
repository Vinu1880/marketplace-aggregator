import { motion } from 'framer-motion';
import Image from 'next/image';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { Product } from '../types/product';
import useFavoriteStore from '../store/favoriteStore';
import useAuthStore from '../store/authStore';

interface ProductCardProps {
  product: Product;
  showComparison?: boolean;
}

export default function ProductCard({ product, showComparison }: ProductCardProps) {
  const { isAuthenticated } = useAuthStore();
  const { isFavorite, addFavorite, removeFavorite } = useFavoriteStore();
  const favorite = isFavorite(product.id);

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden relative"
    >
      {isAuthenticated && (
        <button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md"
        >
          {favorite ? (
            <HeartSolidIcon className="w-6 h-6 text-red-500" />
          ) : (
            <HeartIcon className="w-6 h-6 text-gray-500" />
          )}
        </button>
      )}

      <div className="relative h-48">
        <Image
          src={product.images[0] || '/placeholder.jpg'}
          alt={product.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded-full text-sm font-medium">
          {product.platform}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{product.title}</h3>
        <p className="text-gray-500 text-sm mb-2">{product.location}</p>
        
        {showComparison && (
          <div className="mb-2 text-sm">
            <p className="text-green-600">
              -15% par rapport au prix moyen
            </p>
            <p className="text-gray-500">
              Prix moyen: {(product.price * 1.15).toFixed(2)} {product.currency}
            </p>
          </div>
        )}

        <div className="flex justify-between items-center">
          <p className="text-xl font-bold">{product.price} {product.currency}</p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm"
          >
            Voir l'annonce
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}