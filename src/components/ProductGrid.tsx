import { motion } from 'framer-motion';
import { useEffect } from 'react';
import useProductStore from '../store/productStore';
import ProductCard from './ProductCard';
import ProductFilters from './ProductFilters';
import ProductPagination from './ProductPagination';

export default function ProductGrid() {
  const { products, total, loading, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="space-y-6">
      <ProductFilters />
      
      {loading ? (
        <div className="flex justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
          />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={`${product.platform}-${product.platform_id}`} product={product} />
            ))}
          </div>
          
          <ProductPagination total={total} />
        </>
      )}
    </div>
  );
}