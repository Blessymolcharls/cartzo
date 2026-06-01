import React, { useState, useEffect } from 'react';
import apiService from '../../services/apiService';
import { useNotification } from '../../context/NotificationContext';

const STATUS_OPTIONS = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const statusStyle = (status) => {
  switch (status) {
    case 'Delivered': return 'bg-green-500/10 text-green-400 border border-green-500/20';
    case 'Shipped':   return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
    case 'Cancelled': return 'bg-red-500/10 text-red-400 border border-red-500/20';
    case 'Processing':return 'bg-purple-500/10 text-purple-400 border border-purple-500/20';
    default:          return 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20';
  }
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await apiService.get('/orders');
        setOrders(res.data || []);
      } catch (err) {
        console.error('Fetch orders error:', err);
        showNotification('Failed to load orders', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      await apiService.put(`/orders/${orderId}/status`, { status: newStatus });
      setOrders(prev =>
        prev.map(o => o._id === orderId ? { ...o, orderStatus: newStatus } : o)
      );
      showNotification('Order status updated', 'success');
    } catch (err) {
      console.error('Update status error:', err);
      showNotification(err.response?.data?.message || 'Failed to update status', 'error');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">Orders</h1>
        <p className="text-sm text-gray-500 mt-0.5">{orders.length} total orders</p>
      </div>

      <div className="bg-[#0f0f0f] border border-white/8 rounded-xl overflow-hidden">
        {loading ? (
          <div className="text-center text-gray-500 text-sm py-12">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-center text-gray-600 text-sm py-12">No orders yet.</div>
        ) : (
          <div className="divide-y divide-white/5">
            {orders.map(order => (
              <div key={order._id}>
                {/* Row */}
                <div
                  className="flex flex-wrap items-center gap-4 px-5 py-4 cursor-pointer hover:bg-white/3 transition-colors"
                  onClick={() => setExpandedId(expandedId === order._id ? null : order._id)}
                >
                  {/* ID + Date */}
                  <div className="min-w-[120px]">
                    <p className="text-xs font-mono text-[var(--primary)]">#{order._id.slice(-8).toUpperCase()}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
                  </div>

                  {/* Customer */}
                  <div className="flex-1 min-w-[120px]">
                    <p className="text-sm text-white">{order.user?.name || 'Guest'}</p>
                    <p className="text-xs text-gray-500">{order.user?.email || ''}</p>
                  </div>

                  {/* Total */}
                  <div className="text-sm font-semibold text-white min-w-[80px] text-right">
                    ₹{(order.totalPrice || 0).toFixed(2)}
                  </div>

                  {/* Status selector */}
                  <div onClick={e => e.stopPropagation()}>
                    <select
                      value={order.orderStatus || 'Pending'}
                      onChange={e => updateStatus(order._id, e.target.value)}
                      disabled={updatingId === order._id}
                      className={`text-xs font-medium px-2.5 py-1.5 rounded-lg border bg-transparent cursor-pointer focus:outline-none transition-colors ${statusStyle(order.orderStatus)} disabled:opacity-50`}
                    >
                      {STATUS_OPTIONS.map(s => (
                        <option key={s} value={s} className="bg-[#0f0f0f] text-white">{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* Expand chevron */}
                  <svg
                    width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className={`text-gray-500 flex-shrink-0 transition-transform ${expandedId === order._id ? 'rotate-180' : ''}`}
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>

                {/* Expanded: items + address */}
                {expandedId === order._id && (
                  <div className="px-5 pb-4 bg-white/2 border-t border-white/5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
                      {/* Items */}
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Items</p>
                        <div className="space-y-2">
                          {(order.orderItems || []).map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                              {item.image && (
                                <img src={item.image} alt={item.name} className="w-9 h-9 rounded-lg object-cover bg-black flex-shrink-0" />
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-white truncate">{item.name}</p>
                                <p className="text-xs text-gray-500">Qty: {item.qty} × ₹{item.price}</p>
                              </div>
                              <p className="text-sm text-white font-medium">₹{(item.qty * item.price).toFixed(2)}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Address */}
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Shipping Address</p>
                        {order.shippingAddress ? (
                          <div className="text-sm text-gray-300 space-y-1">
                            <p>{order.shippingAddress.street}</p>
                            <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                            <p>{order.shippingAddress.country}</p>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-600">No address provided</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
