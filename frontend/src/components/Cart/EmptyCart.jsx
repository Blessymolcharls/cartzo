import React from 'react';
import { Link } from 'react-router-dom';

const EmptyCart = () => (
  <div className="rounded-3xl bg-gray-50 p-8 text-center text-gray-600 shadow-sm">
    <p className="mb-4 text-lg font-medium">Your cart is empty.</p>
    <Link to="/products" className="inline-flex items-center justify-center rounded-xl bg-primary-600 px-6 py-3 text-white hover:bg-primary-700">
      Browse products
    </Link>
  </div>
);

export default EmptyCart;
