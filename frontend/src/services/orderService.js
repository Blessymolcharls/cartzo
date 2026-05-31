import apiService from './apiService';

export const orderService = {
  create: (orderData) => apiService.post('/orders', orderData),
  getAll: () => apiService.get('/orders'),
  getById: (id) => apiService.get(`/orders/${id}`),
  cancel: (id) => apiService.delete(`/orders/${id}`),
};
