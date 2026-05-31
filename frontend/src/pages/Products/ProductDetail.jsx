import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useNotification } from '../../context/NotificationContext';
import { productService } from '../../services/productService';
import { sampleProducts } from '../../utils/sampleData';
import Loading from '../../components/Common/Loading';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { showNotification } = useNotification();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productService.getById(id);
        setProduct(response.data);
      } catch (err) {
        // Try to fallback to local sample data when backend is unavailable
        const demo = sampleProducts.find((p) => (p._id || p.id) === id);
        if (demo) {
          setProduct(demo);
        } else {
          setError('Unable to load product details');
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <div className="rounded-3xl bg-error-50 p-6 text-error-700">{error}</div>;
  if (!product) return <div className="rounded-3xl bg-gray-50 p-6 text-gray-600">Product not found.</div>;

  const isOutOfStock = product.stock === 0;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product.description || 'No description available.'}</p>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="text-2xl font-semibold text-gray-900">₹{product.price}</span>
            {product.stock != null && (
              <p className="text-sm text-gray-500">{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              addToCart(product);
              showNotification(`Added ${product.name} to cart.`, 'success');
            }}
            disabled={isOutOfStock}
            className={`rounded-xl px-6 py-3 text-white ${isOutOfStock ? 'cursor-not-allowed bg-gray-400' : 'bg-primary-600 hover:bg-primary-700'}`}
          >
            {isOutOfStock ? 'Out of stock' : 'Add to cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
