import React, { useState, useEffect } from 'react';
import { useNotification } from '../../context/NotificationContext';
import { productService } from '../../services/productService';
import ProductForm from '../../components/Admin/ProductForm';
import ProductTable from '../../components/Admin/ProductTable';
import OrderOverview from '../../components/Admin/OrderOverview';
import ErrorMessage from '../../components/Common/ErrorMessage';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const { showNotification } = useNotification();

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await productService.getAll();
      setProducts(response.data);
    } catch (err) {
      setError('Unable to load products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductSubmit = async (productData) => {
    setSaving(true);
    setError(null);

    try {
      if (productData._id || productData.id) {
        await productService.update(productData._id || productData.id, productData);
        showNotification('Product updated successfully.', 'success');
      } else {
        await productService.create(productData);
        showNotification('Product added successfully.', 'success');
      }
      setSelectedProduct(null);
      await fetchProducts();
    } catch (err) {
      setError('Unable to save product.');
      showNotification('Unable to save product.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleDeleteProduct = async (productId) => {
    setLoading(true);
    setError(null);
    try {
      await productService.delete(productId);
      showNotification('Product deleted successfully.', 'success');
      await fetchProducts();
    } catch (err) {
      setError('Unable to delete product.');
      showNotification('Unable to delete product.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Manage Products</h1>
      {error && <ErrorMessage message={error} />}
      <div className="grid gap-8 xl:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <ProductForm
            initialProduct={selectedProduct}
            onSubmit={handleProductSubmit}
            onCancel={() => setSelectedProduct(null)}
            saving={saving}
          />
          <ProductTable
            products={products}
            loading={loading}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        </div>
        <OrderOverview totalOrders={72} pending={12} completed={60} />
      </div>
    </div>
  );
};

export default ManageProducts;
