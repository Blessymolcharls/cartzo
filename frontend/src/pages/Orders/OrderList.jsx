import React, { useEffect, useState } from 'react';
import { orderService } from '../../services/orderService';
import Loading from '../../components/Common/Loading';
import { Link } from 'react-router-dom';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderService.getAll();
        setOrders(response.data);
      } catch (err) {
        setError('Unable to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Orders</h1>
      {error ? (
        <div className="rounded-3xl bg-error-50 p-6 text-error-700">{error}</div>
      ) : orders.length === 0 ? (
        <div className="rounded-3xl bg-gray-50 p-8 text-gray-600">No orders found.</div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order._id || order.id}
              to={`/orders/${order._id || order.id}`}
              className="block rounded-3xl border border-gray-200 bg-white p-6 hover:shadow-md"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-lg font-semibold text-gray-900">Order #{order._id || order.id}</span>
                <span className="text-sm text-gray-600">{order.status || 'Status unknown'}</span>
              </div>
              <p className="mt-2 text-gray-600">Total: ₹{order.totalAmount || order.total || '0.00'}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderList;
