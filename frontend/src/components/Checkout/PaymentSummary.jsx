import React from 'react';
import { calculateSubtotal, calculateTax, calculateShipping, calculateTotal } from '../../utils/priceCalculator';

const PaymentSummary = ({ items }) => {
  const subtotal = calculateSubtotal(items);
  const tax = calculateTax(subtotal);
  const shipping = calculateShipping(subtotal);
  const { total } = calculateTotal(items);

  return (
    <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Payment summary</h2>
      <div className="space-y-3 text-gray-700">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>₹{tax}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-gray-300 pt-4 text-lg font-semibold text-gray-900">
        <span>Total</span>
        <span>₹{total}</span>
      </div>
    </div>
  );
};

export default PaymentSummary;
