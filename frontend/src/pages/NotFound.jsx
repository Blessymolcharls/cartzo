import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
    <div className="rounded-3xl bg-white p-10 text-center shadow-lg">
      <h1 className="text-5xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-gray-600 mb-6">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="inline-flex items-center justify-center rounded-xl bg-primary-600 px-6 py-3 text-white hover:bg-primary-700">
        Return home
      </Link>
    </div>
  </div>
);

export default NotFound;
