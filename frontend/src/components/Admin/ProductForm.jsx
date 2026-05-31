import React, { useState, useEffect } from 'react';

const ProductForm = ({ onSubmit, initialProduct, onCancel, saving = false }) => {
  const [form, setForm] = useState({ name: '', price: '', stock: '', description: '' });

  useEffect(() => {
    if (initialProduct) {
      setForm({
        id: initialProduct._id || initialProduct.id,
        name: initialProduct.name || '',
        price: initialProduct.price || '',
        stock: initialProduct.stock || '',
        description: initialProduct.description || '',
      });
    } else {
      setForm({ name: '', price: '', stock: '', description: '' });
    }
  }, [initialProduct]);

  const handleChange = (field) => (event) => {
    setForm({ ...form, [field]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    };

    if (onSubmit) onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        {form.id ? 'Edit product' : 'Add product'}
      </h2>
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Name</span>
          <input
            type="text"
            value={form.name}
            onChange={handleChange('name')}
            className="mt-1 block w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3"
            required
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Price</span>
          <input
            type="number"
            value={form.price}
            onChange={handleChange('price')}
            className="mt-1 block w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3"
            required
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Stock</span>
          <input
            type="number"
            value={form.stock}
            onChange={handleChange('stock')}
            className="mt-1 block w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3"
            required
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Description</span>
          <textarea
            value={form.description}
            onChange={handleChange('description')}
            className="mt-1 block w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3"
            rows="3"
          />
        </label>
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          className="rounded-xl bg-primary-600 px-6 py-3 text-white hover:bg-primary-700"
          disabled={saving}
        >
          {saving ? 'Saving…' : 'Save product'}
        </button>
        {form.id && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-gray-700 hover:bg-gray-100"
          >
            Cancel edit
          </button>
        )}
      </div>
    </form>
  );
};

export default ProductForm;
