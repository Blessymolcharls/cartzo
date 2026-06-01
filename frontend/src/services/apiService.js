import axios from 'axios';
import { API_BASE_URL, STORAGE_KEYS } from '../utils/constants';

const apiService = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

apiService.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_KEYS.JWT_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors globally
apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url || '';
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    // Always log errors to console for debugging
    console.error(`[API Error] ${error.config?.method?.toUpperCase()} ${url} → ${status}: ${message}`);

    // Don't intercept login/register endpoints — they return 401 for bad credentials
    // and the component catch block needs to handle that to show the error message
    const isAuthEndpoint = url.includes('/login') || url.includes('/register');

    if (status === 401 && !isAuthEndpoint) {
      localStorage.removeItem('jwt_token');
      const isAdminRoute = url.includes('/admin');
      window.location.href = isAdminRoute ? '/admin/login' : '/login';
    }

    return Promise.reject(error);
  }
);

export default apiService;
