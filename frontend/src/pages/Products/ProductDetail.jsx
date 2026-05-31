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
      <div className="rounded-3xl bg-white p-8 shadow-lg text-gray-900">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Left: Product Image */}
          <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-50 rounded-2xl border border-gray-100">
            <img 
              src={product.image || '/logo192.png'} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
            {isOutOfStock && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[2px] rounded-2xl">
                <span className="text-white font-bold tracking-widest uppercase border border-white/40 px-4 py-2 rounded-full">
                  Sold Out
                </span>
              </div>
            )}
          </div>

          {/* Right: Product Details */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-4 text-gray-900">{product.name}</h1>
              
              {product.rating != null && (
                <div className="flex items-center gap-1 text-[var(--primary)] text-sm mb-4">
                  <span className="text-yellow-500">★</span>
                  <span className="font-semibold text-gray-800">{product.rating}</span>
                  <span className="text-gray-500 text-xs">({product.numReviews || 0} reviews)</span>
                </div>
              )}

              <p className="text-gray-600 mb-6 leading-relaxed">{product.description || 'No description available.'}</p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-gray-100 pt-6">
              <div>
                <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                {product.stock != null && (
                  <p className="text-sm mt-1 text-gray-500">{product.stock > 0 ? `${product.stock} items in stock` : 'Out of stock'}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  addToCart(product);
                  showNotification(`Added ${product.name} to cart.`, 'success');
                }}
                disabled={isOutOfStock}
                className={`rounded-xl px-8 py-4 font-semibold text-white transition-all duration-300 shadow-md ${
                  isOutOfStock 
                    ? 'cursor-not-allowed bg-gray-300' 
                    : 'bg-primary-600 hover:bg-primary-700 hover:shadow-lg active:scale-95'
                }`}
              >
                {isOutOfStock ? 'Out of stock' : 'Add to cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
