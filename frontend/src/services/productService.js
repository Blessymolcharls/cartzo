import apiService from './apiService';
import { sampleProducts } from '../utils/sampleData';

const PRODUCT_STORAGE_KEY = 'cartzo_local_products';

const loadLocalProducts = () => {
  try {
    return JSON.parse(localStorage.getItem(PRODUCT_STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};

const saveLocalProducts = (products) => {
  localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(products));
};

const getFallbackProducts = () => {
  const localProducts = loadLocalProducts();
  return localProducts.length > 0 ? localProducts : sampleProducts;
};

const getFallbackProduct = (id) => {
  return getFallbackProducts().find((product) => product._id === id || product.slug === id || product.id === id);
};

const fallbackIfOffline = async (promise, fallback) => {
  try {
    return await promise;
  } catch (error) {
    if (!error.response) {
      return { data: fallback() };
    }
    throw error;
  }
};

export const productService = {
  getAll: (params) => fallbackIfOffline(apiService.get('/products', { params }), getFallbackProducts),
  getFeatured: () => fallbackIfOffline(apiService.get('/products/featured'), () => getFallbackProducts().slice(0, 5)),
  getBestsellers: () => fallbackIfOffline(apiService.get('/products/bestsellers'), () => getFallbackProducts().slice(0, 5)),
  getNewArrivals: () => fallbackIfOffline(apiService.get('/products/new-arrivals'), () => getFallbackProducts().slice(0, 5)),
  getById: (id) => fallbackIfOffline(apiService.get(`/products/${id}`), () => getFallbackProduct(id)),
  
  create: (data) => apiService.post('/products', data),
  update: (id, data) => apiService.put(`/products/${id}`, data),
  delete: (id) => apiService.delete(`/products/${id}`),
};
