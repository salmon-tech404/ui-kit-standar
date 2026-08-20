import { create } from 'zustand';
import { UserResponse, authApi } from '../api/authApi';
import { setupApiClientAuth } from '@/shared/api';

interface AuthState {
  accessToken: string | null;
  user: UserResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (accessToken: string, user: UserResponse) => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => {
  // Hook up apiClient token getter and refresher
  setupApiClientAuth({
    getAccessToken: () => get().accessToken,
    onAuthRefresh: async () => {
      try {
        const data = await authApi.refreshToken();
        set({ accessToken: data.accessToken, user: data.user, isAuthenticated: true });
        return data.accessToken;
      } catch {
        return null;
      }
    },
    onLogout: () => {
      set({ accessToken: null, user: null, isAuthenticated: false });
    },
  });

  return {
    accessToken: null,
    user: null,
    isAuthenticated: false,
    isLoading: true,

    setAuth: (accessToken, user) =>
      set({
        accessToken,
        user,
        isAuthenticated: true,
        isLoading: false,
      }),

    logout: async () => {
      try {
        await authApi.logout();
      } catch (e) {}
      set({
        accessToken: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    },

    checkAuth: async () => {
      try {
        set({ isLoading: true });
        const data = await authApi.refreshToken();
        set({
          accessToken: data.accessToken,
          user: data.user,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (err) {
        set({
          accessToken: null,
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    },
  };
});
