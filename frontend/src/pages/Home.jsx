import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="max-w-5xl mx-auto px-4 py-10">
    <section className="rounded-3xl bg-white p-10 shadow-lg">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Cartzo</h1>
      <p className="text-gray-600 text-lg mb-8">
        A modern ecommerce storefront built with React, Tailwind CSS, and Axios.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/products" className="inline-flex items-center justify-center rounded-xl bg-primary-600 px-6 py-3 text-white hover:bg-primary-700">
          Browse Products
        </Link>
        <Link to="/cart" className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-6 py-3 text-gray-700 hover:bg-gray-100">
          View Cart
        </Link>
      </div>
    </section>
  </div>
);

export default Home;
