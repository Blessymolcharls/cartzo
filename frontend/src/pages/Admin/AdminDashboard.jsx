import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import apiService from '../../services/apiService';

const StatCard = ({ title, value, sub }) => (
  <div className="bg-[#0f0f0f] border border-white/8 rounded-xl p-5">
    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">{title}</p>
    <p className="text-3xl font-bold text-white">{value}</p>
    {sub && <p className="text-xs text-gray-500 mt-1">{sub}</p>}
  </div>
);

const statusStyle = (status) => {
  switch (status) {
    case 'Delivered': return 'bg-green-500/10 text-green-400 border border-green-500/20';
    case 'Shipped':   return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
    case 'Cancelled': return 'bg-red-500/10 text-red-400 border border-red-500/20';
    default:          return 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20';
  }
};

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalProducts: 0, totalOrders: 0, totalUsers: 0, revenue: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [productsRes, ordersRes, usersRes] = await Promise.all([
          apiService.get('/products?pageSize=1000'),
          apiService.get('/orders'),
          apiService.get('/auth/users'),
        ]);

        const products = productsRes.data.products || productsRes.data || [];
        const orders   = ordersRes.data || [];
        const users    = usersRes.data || [];

        const revenue = orders.reduce((acc, o) => acc + (o.totalPrice || 0), 0);

        setStats({
          totalProducts: products.length,
          totalOrders:   orders.length,
          totalUsers:    users.length,
          revenue:       revenue.toFixed(2),
        });

        setRecentOrders(orders.slice(0, 6));
        setLowStock(products.filter(p => p.stock < 10).slice(0, 6));
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="text-gray-500 text-sm py-10 text-center">Loading dashboard...</div>;
  if (error)   return <div className="text-red-400 text-sm py-10 text-center">{error}</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">Welcome back, {user?.name}.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Revenue"  value={`₹${stats.revenue}`} />
        <StatCard title="Total Orders"   value={stats.totalOrders} />
        <StatCard title="Total Products" value={stats.totalProducts} />
        <StatCard title="Total Users"    value={stats.totalUsers} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-[#0f0f0f] border border-white/8 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/8">
            <h2 className="text-sm font-semibold text-white">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-white/8 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="px-5 py-3 font-medium">ID</th>
                  <th className="px-5 py-3 font-medium">Customer</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.length === 0 ? (
                  <tr><td colSpan="5" className="px-5 py-6 text-center text-gray-600">No orders yet</td></tr>
                ) : recentOrders.map(order => (
                  <tr key={order._id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                    <td className="px-5 py-3.5 text-[var(--primary)] font-mono text-xs">#{order._id.slice(-8).toUpperCase()}</td>
                    <td className="px-5 py-3.5 text-white">{order.user?.name || 'Guest'}</td>
                    <td className="px-5 py-3.5 text-gray-400">{new Date(order.createdAt).toLocaleDateString('en-IN')}</td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle(order.orderStatus)}`}>
                        {order.orderStatus || 'Pending'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right text-white font-medium">₹{(order.totalPrice || 0).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock */}
        <div className="bg-[#0f0f0f] border border-white/8 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/8 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Low Stock</h2>
            {lowStock.length > 0 && (
              <span className="text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full">
                {lowStock.length}
              </span>
            )}
          </div>
          <div className="divide-y divide-white/5">
            {lowStock.length === 0 ? (
              <p className="text-gray-600 text-sm text-center py-6">All products are well stocked.</p>
            ) : lowStock.map(product => (
              <div key={product._id} className="flex items-center justify-between px-5 py-3 hover:bg-white/3 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  {product.image && (
                    <img src={product.image} alt={product.name} className="w-8 h-8 rounded-lg object-cover bg-black flex-shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="text-sm text-white truncate">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.category}</p>
                  </div>
                </div>
                <span className={`text-sm font-bold flex-shrink-0 ml-3 ${product.stock === 0 ? 'text-red-400' : 'text-yellow-400'}`}>
                  {product.stock}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
