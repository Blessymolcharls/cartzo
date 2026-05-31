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
  return getFallbackProducts().find((product) => product._id === id || product.id === id);
};

const createLocalProduct = (data) => {
  const timestampId = `local-${Date.now()}`;
  const product = {
    ...data,
    _id: data._id || data.id || timestampId,
    id: data.id || timestampId,
  };
  const products = [...loadLocalProducts(), product];
  saveLocalProducts(products);
  return product;
};

const updateLocalProduct = (id, data) => {
  const products = loadLocalProducts();
  const updated = products.map((product) =>
    product._id === id || product.id === id
      ? { ...product, ...data, _id: id, id }
      : product
  );
  saveLocalProducts(updated);
  return updated.find((product) => product._id === id || product.id === id);
};

const deleteLocalProduct = (id) => {
  const products = loadLocalProducts().filter((product) => product._id !== id && product.id !== id);
  saveLocalProducts(products);
  return products;
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
  getAll: () => fallbackIfOffline(apiService.get('/products'), getFallbackProducts),
  getById: (id) => fallbackIfOffline(apiService.get(`/products/${id}`), () => getFallbackProduct(id)),
  create: (data) => fallbackIfOffline(apiService.post('/products', data), () => createLocalProduct(data)),
  update: (id, data) => fallbackIfOffline(apiService.put(`/products/${id}`, data), () => updateLocalProduct(id, data)),
  delete: (id) => fallbackIfOffline(apiService.delete(`/products/${id}`), () => deleteLocalProduct(id)),
};
