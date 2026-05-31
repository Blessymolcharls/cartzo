import React, { useState } from 'react';
import { STORAGE_KEYS } from '../../utils/constants';

const ManageAddresses = ({ addresses = [], onChange }) => {
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editData, setEditData] = useState({ street: '', city: '', state: '', zipCode: '', phone: '' });

  const persist = (next) => {
    onChange && onChange(next);
    localStorage.setItem(STORAGE_KEYS.SAVED_ADDRESSES, JSON.stringify(next));
  };

  const handleDelete = (index) => {
    const next = addresses.filter((_, i) => i !== index);
    persist(next);
  };

  const handleEditInit = (index) => {
    setEditingIndex(index);
    setEditData(addresses[index] || { street: '', city: '', state: '', zipCode: '', phone: '' });
  };

  const handleCancelEdit = () => {
    setEditingIndex(-1);
    setEditData({ street: '', city: '', state: '', zipCode: '', phone: '' });
  };

  const handleSaveEdit = (index) => {
    const next = addresses.map((a, i) => (i === index ? editData : a));
    persist(next);
    handleCancelEdit();
  };

  const handleSetDefault = (index) => {
    if (index === 0) return;
    const item = addresses[index];
    const remaining = addresses.filter((_, i) => i !== index);
    const next = [item, ...remaining];
    persist(next);
  };

  return (
    <div className="mt-4 space-y-3 rounded-2xl border border-gray-200 bg-white p-4">
      <h4 className="text-sm font-semibold text-gray-900">Manage saved addresses</h4>
      {addresses.length === 0 && <p className="text-sm text-gray-600">No saved addresses.</p>}
      <div className="space-y-3">
        {addresses.map((addr, idx) => (
          <div key={idx} className="flex items-start justify-between gap-4 rounded-lg border p-3">
            <div className="flex-1">
              <p className="font-semibold text-sm">{addr.street}</p>
              <p className="text-sm text-gray-700">{addr.city}, {addr.state} {addr.zipCode}</p>
              <p className="text-sm text-gray-700">{addr.phone}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex gap-2">
                <button onClick={() => handleEditInit(idx)} className="rounded px-3 py-1 text-sm border text-gray-700 hover:bg-gray-50">Edit</button>
                <button onClick={() => handleDelete(idx)} className="rounded px-3 py-1 text-sm border text-error-600 hover:bg-red-50">Delete</button>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleSetDefault(idx)} className="text-sm text-primary-600">Set default</button>
              </div>
            </div>
            {editingIndex === idx && (
              <div className="mt-3 w-full">
                <div className="space-y-2">
                  {['street','city','state','zipCode','phone'].map((f) => (
                    <input
                      key={f}
                      className="block w-full rounded border px-3 py-2"
                      value={editData[f] || ''}
                      onChange={(e) => setEditData({ ...editData, [f]: e.target.value })}
                      placeholder={f}
                    />
                  ))}
                </div>
                <div className="mt-2 flex gap-2">
                  <button onClick={() => handleSaveEdit(idx)} className="rounded bg-primary-600 px-3 py-1 text-white text-sm">Save</button>
                  <button onClick={handleCancelEdit} className="rounded border px-3 py-1 text-sm">Cancel</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageAddresses;
