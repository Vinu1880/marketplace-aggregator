import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import PlatformConnect from '../components/PlatformConnect';
import ProductGrid from '../components/ProductGrid';
import useAuthStore from '../store/authStore';

export default function Home() {
  const { isAuthenticated, platforms } = useAuthStore();
  const hasConnectedPlatforms = Object.values(platforms).some(Boolean);

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Marketplace Aggregator
        </h1>
        
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Connectez vos plateformes
          </h2>
          <PlatformConnect />
        </div>

        {hasConnectedPlatforms && <ProductGrid />}
      </motion.div>
    </Layout>
  );
}