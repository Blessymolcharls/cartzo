import React from 'react';

const ProductTable = ({ products = [], loading = false, onEdit, onDelete }) => (
  <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Name</th>
          <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Price</th>
          <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Stock</th>
          <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {loading ? (
          <tr>
            <td colSpan="4" className="px-6 py-8 text-center text-gray-500">Loading products…</td>
          </tr>
        ) : products.length === 0 ? (
          <tr>
            <td colSpan="4" className="px-6 py-8 text-center text-gray-500">No products available.</td>
          </tr>
        ) : (
          products.map((product) => (
            <tr key={product._id || product.id}>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{product.name}</td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">₹{product.price}</td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{product.stock ?? 'N/A'}</td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 space-x-2">
                <button
                  type="button"
                  onClick={() => onEdit?.(product)}
                  className="rounded-full bg-primary-600 px-3 py-1 text-white hover:bg-primary-700"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDelete?.(product._id || product.id)}
                  className="rounded-full bg-error-600 px-3 py-1 text-white hover:bg-error-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default ProductTable;
