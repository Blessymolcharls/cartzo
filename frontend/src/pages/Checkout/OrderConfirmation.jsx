import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const OrderConfirmation = () => {
  const { state } = useLocation();
  const orderId = state?.orderId;

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-white p-10 shadow-lg text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Thank you for your order!</h1>
        <p className="text-gray-600 mb-6">Your payment has been received and your order is being processed.</p>
        <div className="space-y-4 text-left text-gray-700 sm:text-center">
          <p className="text-lg"><strong>Order number:</strong> {orderId ? `#${orderId}` : 'Pending'}</p>
          <p>We will email your order confirmation and shipping details shortly.</p>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link to="/orders" className="inline-flex items-center justify-center rounded-xl bg-primary-600 px-6 py-3 text-white hover:bg-primary-700">
            View orders
          </Link>
          <Link to="/products" className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-6 py-3 text-gray-700 hover:bg-gray-100">
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
