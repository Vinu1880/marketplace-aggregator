import axios from 'axios';
import { OAuthResponse } from '../types/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const authService = {
  async connectPlatform(platform: string): Promise<OAuthResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/${platform}/connect`);
      return response.data;
    } catch (error) {
      throw new Error(`Échec de la connexion à ${platform}`);
    }
  },

  async disconnectPlatform(platform: string): Promise<void> {
    try {
      await axios.post(`${API_BASE_URL}/auth/${platform}/disconnect`);
    } catch (error) {
      throw new Error(`Échec de la déconnexion de ${platform}`);
    }
  },

  async getAuthUrl(platform: string): Promise<string> {
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/${platform}/url`);
      return response.data.url;
    } catch (error) {
      throw new Error(`Impossible d'obtenir l'URL d'authentification pour ${platform}`);
    }
  },
};