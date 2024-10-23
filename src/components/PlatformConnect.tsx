import { motion } from 'framer-motion';
import { useState } from 'react';
import { authService } from '../services/auth';
import useAuthStore from '../store/authStore';

interface PlatformButtonProps {
  name: string;
  icon: string;
  connected: boolean;
  onConnect: () => Promise<void>;
}

const PlatformButton = ({ name, icon, connected, onConnect }: PlatformButtonProps) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`p-4 rounded-lg flex items-center justify-center gap-2 ${
      connected ? 'bg-green-500' : 'bg-blue-500'
    } text-white`}
    onClick={onConnect}
  >
    <img src={icon} alt={name} className="w-6 h-6" />
    <span>{connected ? 'Connecté' : `Connecter ${name}`}</span>
  </motion.button>
);

export default function PlatformConnect() {
  const [loading, setLoading] = useState<string | null>(null);
  const { platforms, setPlatformConnection } = useAuthStore();

  const handleConnect = async (platform: string) => {
    try {
      setLoading(platform);
      const authUrl = await authService.getAuthUrl(platform);
      
      // Ouvrir la fenêtre d'authentification
      const width = 600;
      const height = 700;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;
      
      window.open(
        authUrl,
        'Connexion',
        `width=${width},height=${height},left=${left},top=${top}`
      );

      // Écouter le message de retour
      window.addEventListener('message', async (event) => {
        if (event.data.type === 'OAUTH_CALLBACK') {
          const response = await authService.connectPlatform(platform);
          setPlatformConnection(platform as keyof typeof platforms, true);
        }
      }, { once: true });
    } catch (error) {
      console.error('Erreur de connexion:', error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Object.entries(platforms).map(([platform, isConnected]) => (
        <PlatformButton
          key={platform}
          name={platform}
          icon={`/icons/${platform}.svg`}
          connected={isConnected}
          onConnect={() => handleConnect(platform)}
        />
      ))}
    </div>
  );
}