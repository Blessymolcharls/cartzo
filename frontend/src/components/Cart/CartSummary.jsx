import React from 'react';
import { calculateSubtotal, calculateShipping, calculateTax, calculateTotal } from '../../utils/priceCalculator';

const CartSummary = ({ items }) => {
  const subtotal = calculateSubtotal(items);
  const tax = calculateTax(subtotal);
  const shipping = calculateShipping(subtotal);
  const { total } = calculateTotal(items);

  return (
    <aside className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
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
      <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4 text-lg font-semibold text-gray-900">
        <span>Total</span>
        <span>₹{total}</span>
      </div>
    </aside>
  );
};

export default CartSummary;
