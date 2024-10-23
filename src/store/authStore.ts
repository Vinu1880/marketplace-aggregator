import create from 'zustand';
import { AuthState } from '../types/auth';

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  platforms: {
    facebook: false,
    anibis: false,
    tutti: false,
    ricardo: false,
  },
  user: null,
  
  setPlatformConnection: (platform: keyof AuthState['platforms'], status: boolean) =>
    set((state) => ({
      platforms: {
        ...state.platforms,
        [platform]: status,
      },
    })),

  setUser: (user: AuthState['user']) =>
    set({ user, isAuthenticated: !!user }),

  logout: () =>
    set({
      isAuthenticated: false,
      platforms: {
        facebook: false,
        anibis: false,
        tutti: false,
        ricardo: false,
      },
      user: null,
    }),
}));

export default useAuthStore;