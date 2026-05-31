import React from 'react';

const SuccessMessage = ({ title, message }) => (
  <div className="rounded-3xl border border-success-200 bg-success-50 p-6 text-success-800 shadow-sm">
    <h2 className="text-2xl font-semibold mb-2">{title || 'Success'}</h2>
    <p>{message || 'Your order has been completed successfully.'}</p>
  </div>
);

export default SuccessMessage;
