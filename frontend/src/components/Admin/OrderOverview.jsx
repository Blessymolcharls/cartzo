import React from 'react';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, tone = 'gray' }) => (
  <div className="rounded-2xl bg-gray-50 p-4 text-center">
    <p className="text-sm text-gray-500">{title}</p>
    <p className={`mt-2 text-3xl font-bold ${tone === 'green' ? 'text-green-600' : tone === 'orange' ? 'text-orange-500' : 'text-gray-900'}`}>{value}</p>
  </div>
);

const OrderOverview = ({ totalOrders = 0, pending = 0, completed = 0 }) => (
  <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Order overview</h2>
      <Link to="/orders" className="text-sm font-medium text-primary-600 hover:underline">View all</Link>
    </div>
    <div className="grid gap-4 sm:grid-cols-3">
      <StatCard title="Total orders" value={totalOrders} />
      <StatCard title="Pending" value={pending} tone="orange" />
      <StatCard title="Completed" value={completed} tone="green" />
    </div>
  </div>
);

export default OrderOverview;
