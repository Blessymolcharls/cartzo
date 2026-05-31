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
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('jwt_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiService;
