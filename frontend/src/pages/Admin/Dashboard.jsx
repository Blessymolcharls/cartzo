import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => (
  <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
    <div className="grid gap-6 md:grid-cols-2">
      <Link to="/admin/manage-products" className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Manage Products</h2>
        <p className="text-gray-600">Add, edit, or remove products in the store.</p>
      </Link>
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Orders Overview</h2>
        <p className="text-gray-600">Review recent orders and status updates.</p>
      </div>
    </div>
  </div>
);

export default Dashboard;
