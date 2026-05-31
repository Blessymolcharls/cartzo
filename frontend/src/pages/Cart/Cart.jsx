import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import CartItem from '../../components/Cart/CartItem';
import CartSummary from '../../components/Cart/CartSummary';
import { sampleProducts } from '../../utils/sampleData';

const Cart = () => {
  const { cartItems, addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { showNotification } = useNotification();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-[var(--text-main)] mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="rounded-3xl bg-gray-50 p-8 text-center text-gray-600">
          <p className="text-lg font-medium mb-4">Your cart is empty.</p>
          <div className="flex items-center justify-center gap-3">
            <Link to="/products" className="inline-flex rounded-xl bg-primary-600 px-6 py-3 text-white hover:bg-primary-700">Browse products</Link>
            <button
              type="button"
              onClick={() => {
                addToCart(sampleProducts[0]);
                showNotification(`Added ${sampleProducts[0].name} to cart.`, 'success');
              }}
              className="inline-flex rounded-xl border border-gray-300 bg-white px-6 py-3 text-gray-700 hover:bg-gray-100"
            >
              Add a sample item
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-500">If the backend is not running, click "Load sample products" on the Products page to explore the UI.</p>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItem key={item.id || item._id} item={item} />
            ))}
          </div>
          <div className="space-y-6">
            <CartSummary items={cartItems} />
            {isAuthenticated ? (
              <Link
                to="/checkout"
                className="block rounded-xl bg-primary-600 px-6 py-4 text-center text-base font-semibold text-white hover:bg-primary-700"
              >
                Proceed to checkout
              </Link>
            ) : (
              <div className="space-y-3">
                <div className="rounded-xl bg-blue-50 border border-blue-200 p-4 text-center">
                  <p className="text-sm font-medium text-blue-900 mb-3">Sign in to proceed with checkout</p>
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/login"
                      className="block rounded-xl bg-primary-600 px-6 py-3 text-center text-base font-semibold text-white hover:bg-primary-700"
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/register"
                      className="block rounded-xl border border-primary-600 px-6 py-3 text-center text-base font-semibold text-primary-600 hover:bg-primary-50"
                    >
                      Create an account
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
