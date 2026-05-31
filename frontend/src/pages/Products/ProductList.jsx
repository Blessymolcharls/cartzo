import React, { useEffect, useState } from 'react';
import { productService } from '../../services/productService';
import { useNotification } from '../../context/NotificationContext';
import Loading from '../../components/Common/Loading';
import ProductCard from '../../components/Product/ProductCard';
import { sampleProducts } from '../../utils/sampleData';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getAll();
        setProducts(response.data);
      } catch (err) {
        setError('Unable to load products from server. You can try a retry or load sample products to preview the UI.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <Loading />;
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Products</h1>
      </div>
      {error && (
        <div className="mb-6 rounded-3xl border border-error-200 bg-error-50 p-6 text-error-700">
          <p className="mb-3">{error}</p>
          <div className="flex gap-3">
            <button onClick={() => { setLoading(true); setError(null); setProducts([]); setTimeout(() => { setLoading(false); }, 200); window.location.reload(); }} className="rounded-xl bg-primary-600 px-4 py-2 text-white">Retry</button>
            <button
            onClick={() => {
              setProducts(sampleProducts);
              showNotification('Loaded sample products for preview.', 'info');
            }}
            className="rounded-xl border border-gray-300 bg-white px-4 py-2"
          >Load sample products</button>
          </div>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {products.length > 0 ? (
          products.map((product) => <ProductCard key={product._id || product.id} product={product} />)
        ) : (
          <div className="rounded-3xl bg-gray-50 p-8 text-center text-gray-600">
            <p className="mb-4">No products available at the moment.</p>
            <div className="flex items-center justify-center gap-3">
              <button
              onClick={() => {
                setProducts(sampleProducts);
                showNotification('Loaded sample products for preview.', 'info');
              }}
              className="rounded-xl bg-primary-600 px-6 py-3 text-white hover:bg-primary-700"
            >Load sample products</button>
              <button onClick={() => { setLoading(true); setTimeout(() => { setLoading(false); }, 300); window.location.reload(); }} className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-gray-700 hover:bg-gray-100">Retry</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
