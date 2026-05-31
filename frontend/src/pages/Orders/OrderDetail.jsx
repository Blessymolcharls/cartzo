import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { orderService } from '../../services/orderService';
import Loading from '../../components/Common/Loading';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await orderService.getById(id);
        setOrder(response.data);
      } catch (err) {
        setError('Unable to load order details');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchOrder();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <div className="rounded-3xl bg-error-50 p-6 text-error-700">{error}</div>;
  if (!order) return <div className="rounded-3xl bg-gray-50 p-6 text-gray-600">Order not found.</div>;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Details</h1>
        <p className="text-gray-600 mb-2">Order ID: {order._id || order.id}</p>
        <p className="text-gray-600 mb-4">Status: {order.status || 'Unknown'}</p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 p-4">
            <h2 className="font-semibold text-gray-900 mb-2">Shipping</h2>
            <p className="text-gray-600">{order.shippingAddress?.street}</p>
            <p className="text-gray-600">{order.shippingAddress?.city}, {order.shippingAddress?.state}</p>
            <p className="text-gray-600">{order.shippingAddress?.zipCode}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 p-4">
            <h2 className="font-semibold text-gray-900 mb-2">Payment</h2>
            <p className="text-gray-600">{order.paymentStatus || 'Pending'}</p>
            <p className="text-gray-600">Total: ₹{order.totalAmount || order.total || '0.00'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
