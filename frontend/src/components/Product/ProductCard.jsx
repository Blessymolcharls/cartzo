import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useNotification } from '../../context/NotificationContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { showNotification } = useNotification();
  const isOutOfStock = product.stock === 0;

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-4 h-56 overflow-hidden rounded-3xl bg-gray-100">
        <img src={product.image || '/logo192.png'} alt={product.name} className="h-full w-full object-cover" />
      </div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h2>
      <p className="text-gray-600 mb-4 line-clamp-3">{product.description || 'Delicious product details coming soon.'}</p>
      <div className="flex items-center justify-between gap-3">
        <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              addToCart(product);
              showNotification(`Added ${product.name} to cart.`, 'success');
            }}
            disabled={isOutOfStock}
            className={`rounded-full px-4 py-2 text-sm font-semibold text-white transition ${isOutOfStock ? 'cursor-not-allowed bg-gray-400' : 'bg-primary-600 hover:bg-primary-700'}`}
          >
            {isOutOfStock ? 'Out of stock' : 'Add'}
          </button>
          <Link to={`/products/${product._id || product.id}`} className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200">
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
