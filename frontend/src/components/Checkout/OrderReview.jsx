import React from 'react';

const OrderReview = ({ shippingData, cartItems = [], onEditAddress }) => {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Order Review</h2>
        {onEditAddress && (
          <button
            type="button"
            onClick={onEditAddress}
            className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Edit address
          </button>
        )}
      </div>
      <div className="space-y-4 text-gray-700">
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Shipping details</h3>
          {shippingData ? (
            <div className="space-y-1 text-sm">
              <p>{shippingData.houseInfo ? `${shippingData.houseInfo}, ${shippingData.street}` : shippingData.street}</p>
              <p>{shippingData.city}, {shippingData.state} {shippingData.zipCode}</p>
              <p>{shippingData.phone}</p>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Shipping information is not available yet.</p>
          )}
        </div>
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Cart summary</h3>
          <p className="text-sm text-gray-500">{cartItems.length} item(s) ready for purchase.</p>
        </div>
      </div>
    </div>
  );
};

export default OrderReview;
