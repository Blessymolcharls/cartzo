import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
    <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity ${color}`}></div>
    <div className="flex items-center justify-between mb-4 relative z-10">
      <h3 className="text-gray-400 font-medium">{title}</h3>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-white/5 ${color.replace('bg-', 'text-')}`}>
        {icon}
      </div>
    </div>
    <div className="text-3xl font-bold text-white relative z-10">{value}</div>
  </div>
);

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    revenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };
        
        // Fetch products, orders, and users in parallel
        const [productsRes, ordersRes, usersRes] = await Promise.all([
          axios.get('/api/products?pageSize=1000', config),
          axios.get('/api/orders', config),
          axios.get('/api/auth/users', config)
        ]);

        const products = productsRes.data.products || productsRes.data;
        const orders = ordersRes.data;
        const users = usersRes.data;

        // Calculate Revenue
        const revenue = orders.reduce((acc, order) => acc + (order.isPaid ? order.totalPrice : 0), 0);

        setStats({
          totalProducts: products.length,
          totalOrders: orders.length,
          totalUsers: users.length,
          revenue: revenue.toFixed(2),
        });

        setRecentOrders(orders.slice(0, 5));
        
        // Find Low Stock (less than 10)
        setLowStock(products.filter(p => p.stock < 10).slice(0, 5));

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-400 py-10">Loading dashboard data...</div>;
  }

  return (
    <div className="space-y-8 animate-[fadeIn_0.5s_ease-out]">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome back, {user?.name}. Here's what's happening in your store.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value={`$${stats.revenue}`} icon="💰" color="bg-green-500" />
        <StatCard title="Total Orders" value={stats.totalOrders} icon="🛒" color="bg-blue-500" />
        <StatCard title="Total Products" value={stats.totalProducts} icon="📦" color="bg-purple-500" />
        <StatCard title="Total Users" value={stats.totalUsers} icon="👥" color="bg-[var(--primary)]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-gray-400 text-sm">
                  <th className="pb-3 font-medium">Order ID</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Total</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {recentOrders.length === 0 ? (
                  <tr><td colSpan="5" className="py-4 text-center text-gray-500">No recent orders</td></tr>
                ) : (
                  recentOrders.map(order => (
                    <tr key={order._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 text-[var(--primary)]">#{order._id.substring(18)}</td>
                      <td className="py-4 text-white">{order.user?.name || 'Guest'}</td>
                      <td className="py-4 text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          order.orderStatus === 'Delivered' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                          order.orderStatus === 'Shipped' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                          'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                        }`}>
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="py-4 text-right font-medium text-white">${order.totalPrice.toFixed(2)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Low Stock Alerts</h2>
            <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-1 rounded-lg text-xs font-bold">{lowStock.length}</span>
          </div>
          <div className="space-y-4">
            {lowStock.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">All products are well stocked.</p>
            ) : (
              lowStock.map(product => (
                <div key={product._id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <img src={product.image || '/placeholder.png'} alt={product.name} className="w-10 h-10 rounded-lg object-cover bg-black" />
                    <div>
                      <h4 className="text-sm font-medium text-white line-clamp-1">{product.name}</h4>
                      <p className="text-xs text-gray-400">{product.category}</p>
                    </div>
                  </div>
                  <div className={`text-sm font-bold ${product.stock === 0 ? 'text-red-500' : 'text-yellow-500'}`}>
                    {product.stock} left
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
