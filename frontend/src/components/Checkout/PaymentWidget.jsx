import React from 'react';

const PaymentWidget = ({ onProceed, label = 'Continue', loading = false, disabled = false }) => (
  <div className="rounded-3xl bg-white p-6 shadow-sm">
    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Payment</h2>
    <p className="text-gray-600 mb-4">Review your order and complete checkout using a secure payment gateway.</p>
    <button
      type="button"
      onClick={onProceed}
      disabled={disabled}
      className={`w-full rounded-xl px-4 py-3 text-white transition ${disabled ? 'cursor-not-allowed bg-gray-300' : 'bg-primary-600 hover:bg-primary-700'}`}
    >
      {loading ? 'Processing…' : label}
    </button>
  </div>
);

export default PaymentWidget;
