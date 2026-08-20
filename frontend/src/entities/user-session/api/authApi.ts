import { apiClient } from '@/shared/api';

export interface UserResponse {
  id: string;
  email: string;
  name: string;
  tier: 'free' | 'pro' | 'enterprise';
  credits: number;
}

export const authApi = {
  register: async (payload: { email: string; password: string; name: string }) => {
    const { data } = await apiClient.post<{ accessToken: string; user: UserResponse }>('/auth/register', payload);
    return data;
  },

  login: async (payload: { email: string; password: string }) => {
    const { data } = await apiClient.post<{ accessToken: string; user: UserResponse }>('/auth/login', payload);
    return data;
  },

  refreshToken: async () => {
    const { data } = await apiClient.post<{ accessToken: string; user: UserResponse }>('/auth/refresh');
    return data;
  },

  logout: async () => {
    const { data } = await apiClient.post('/auth/logout');
    return data;
  },

  getMe: async () => {
    const { data } = await apiClient.get<{ user: UserResponse }>('/auth/me');
    return data.user;
  },
};
