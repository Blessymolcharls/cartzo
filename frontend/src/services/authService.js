import apiService from './apiService';

export const authService = {
  register: (data) => apiService.post('/auth/register', data),
  login: (data) => apiService.post('/auth/login', data),
  logout: () => {
    localStorage.removeItem('jwt_token');
    return Promise.resolve();
  },
  getProfile: () => apiService.get('/auth/profile'),
  updateProfile: (data) => apiService.put('/auth/profile', data),
};
