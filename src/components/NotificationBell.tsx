import { motion, AnimatePresence } from 'framer-motion';
import { BellIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import useAuthStore from '../store/authStore';
import useProductStore from '../store/productStore';

export default function NotificationBell() {
  const { isAuthenticated } = useAuthStore();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hasNew, setHasNew] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      // Simule la réception de nouvelles notifications
      const interval = setInterval(() => {
        const newNotif = {
          id: Date.now(),
          title: 'Nouveau produit disponible',
          message: 'Un nouveau produit correspondant à vos critères est disponible',
          timestamp: new Date(),
        };
        setNotifications(prev => [newNotif, ...prev].slice(0, 5));
        setHasNew(true);
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const handleClick = () => {
    setShowDropdown(!showDropdown);
    setHasNew(false);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative p-2"
        onClick={handleClick}
      >
        <BellIcon className="w-6 h-6" />
        {hasNew && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full" />
        )}
      </motion.button>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50"
          >
            <div className="p-4 max-h-96 overflow-auto">
              {notifications.length === 0 ? (
                <p className="text-gray-500 text-center">Aucune notification</p>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                  >
                    <p className="font-medium">{notif.title}</p>
                    <p className="text-sm text-gray-500">{notif.message}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(notif.timestamp).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}