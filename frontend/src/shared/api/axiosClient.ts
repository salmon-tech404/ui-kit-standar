import axios from 'axios';

export const apiClient = axios.create({
  baseURL: '/api',
  withCredentials: true, // Send httpOnly cookies
});

// Auth token interceptor hookup
let getAccessToken: (() => string | null) | null = null;
let onAuthRefresh: (() => Promise<string | null>) | null = null;
let onLogout: (() => void) | null = null;

export const setupApiClientAuth = (options: {
  getAccessToken: () => string | null;
  onAuthRefresh?: () => Promise<string | null>;
  onLogout?: () => void;
}) => {
  getAccessToken = options.getAccessToken;
  onAuthRefresh = options.onAuthRefresh ?? null;
  onLogout = options.onLogout ?? null;
};

// Request Interceptor: Attach in-memory Access Token
apiClient.interceptors.request.use((config) => {
  if (getAccessToken) {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response Interceptor: Auto-Refresh Token on 401
let isRefreshing = false;
let failedQueue: Array<{ resolve: (token: string) => void; reject: (err: any) => void }> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/refresh') &&
      !originalRequest.url?.includes('/auth/login')
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        if (onAuthRefresh) {
          const newAccessToken = await onAuthRefresh();
          if (newAccessToken) {
            processQueue(null, newAccessToken);
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return apiClient(originalRequest);
          }
        }
        throw new Error('Refresh failed');
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        if (onLogout) onLogout();
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
