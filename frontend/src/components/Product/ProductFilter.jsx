import React from 'react';

const ProductFilter = ({ onFilter }) => (
  <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
    <h2 className="text-lg font-semibold text-gray-900 mb-3">Filter</h2>
    <div className="space-y-3">
      <button type="button" onClick={() => onFilter('all')} className="w-full rounded-xl bg-gray-100 px-4 py-2 text-left text-gray-700 hover:bg-gray-200">
        All products
      </button>
      <button type="button" onClick={() => onFilter('best')} className="w-full rounded-xl bg-gray-100 px-4 py-2 text-left text-gray-700 hover:bg-gray-200">
        Best sellers
      </button>
    </div>
  </div>
);

export default ProductFilter;
