import apiService from './apiService';

export const cartService = {
  getCart: () => apiService.get('/cart'),
  saveCart: (cartData) => apiService.post('/cart', cartData),
  clearCart: () => apiService.delete('/cart'),
};
