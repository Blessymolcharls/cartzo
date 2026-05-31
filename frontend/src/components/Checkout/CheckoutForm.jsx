import React, { useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../../utils/constants';
import ManageAddresses from './ManageAddresses';

const CheckoutForm = ({ onSubmit, initialData, savedAddresses = [], onManageAddresses }) => {
  const [formData, setFormData] = useState({ houseInfo: '', street: '', city: '', state: '', zipCode: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [saveAddress, setSaveAddress] = useState(!!initialData);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(-1);
  const [showManage, setShowManage] = useState(false);

  const fieldLabels = {
    houseInfo: 'House No. / House Name / Office Name',
    street: 'Street / Road / Area',
    city: 'City',
    state: 'State',
    zipCode: 'ZIP Code',
    phone: 'Phone'
  };

  useEffect(() => {
    if (initialData) {
      setFormData({
        houseInfo: initialData.houseInfo || '',
        street: initialData.street || '',
        city: initialData.city || '',
        state: initialData.state || '',
        zipCode: initialData.zipCode || '',
        phone: initialData.phone || ''
      });
    }
  }, [initialData]);

  useEffect(() => {
    if (selectedAddressIndex >= 0 && savedAddresses[selectedAddressIndex]) {
      const addr = savedAddresses[selectedAddressIndex];
      setFormData({
        houseInfo: addr.houseInfo || '',
        street: addr.street || '',
        city: addr.city || '',
        state: addr.state || '',
        zipCode: addr.zipCode || '',
        phone: addr.phone || ''
      });
    }
  }, [selectedAddressIndex, savedAddresses]);

  const handleChange = (field) => (event) => {
    const nextFormData = { ...formData, [field]: event.target.value };
    setFormData(nextFormData);
    localStorage.setItem(STORAGE_KEYS.CHECKOUT_ADDRESS, JSON.stringify(nextFormData));
  };

  const validate = () => {
    const validation = {};
    if (!formData.houseInfo) validation.houseInfo = 'House No. / House Name / Office Name is required.';
    if (!formData.street) validation.street = 'Street address is required.';
    if (!formData.city) validation.city = 'City is required.';
    if (!formData.state) validation.state = 'State is required.';
    if (!/^[0-9]{6}$/.test(formData.zipCode)) validation.zipCode = 'Enter a valid 6-digit ZIP code.';
    if (!/^[0-9]{10}$/.test(formData.phone)) validation.phone = 'Enter a valid 10-digit phone number.';
    setErrors(validation);
    return Object.keys(validation).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate() && onSubmit) {
      onSubmit(formData, saveAddress);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Shipping Address</h2>
      {savedAddresses.length > 0 && (
        <div className="mb-6 rounded-3xl border border-gray-200 bg-gray-50 p-4">
          <h3 className="text-base font-semibold text-gray-900 mb-3">Saved addresses</h3>
          <div className="flex justify-end mb-2">
            <button onClick={() => setShowManage((s) => !s)} className="text-sm text-primary-600">
              {showManage ? 'Close manager' : 'Manage saved addresses'}
            </button>
          </div>
          <div className="space-y-3">
            {savedAddresses.map((address, index) => (
              <label key={index} className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-4">
                <input
                  type="radio"
                  name="savedAddress"
                  checked={selectedAddressIndex === index}
                  onChange={() => setSelectedAddressIndex(index)}
                  className="mt-1 h-4 w-4 text-primary-600"
                />
                <div className="text-sm text-gray-700">
                  <p className="font-semibold">{address.houseInfo ? `${address.houseInfo}, ${address.street}` : address.street}</p>
                  <p>{address.city}, {address.state} {address.zipCode}</p>
                  <p>{address.phone}</p>
                </div>
              </label>
            ))}
          </div>
          {showManage && (
            <ManageAddresses addresses={savedAddresses} onChange={(next) => {
              // persist and notify parent
              localStorage.setItem(STORAGE_KEYS.SAVED_ADDRESSES, JSON.stringify(next));
              onManageAddresses && onManageAddresses(next);
            }} />
          )}
        </div>
      )}
      <div className="space-y-4">
        {['houseInfo', 'street', 'city', 'state', 'zipCode', 'phone'].map((field) => (
          <label key={field} className="block">
            <span className="text-sm font-medium text-gray-700">{fieldLabels[field]}</span>
            <input
              type="text"
              value={formData[field]}
              onChange={handleChange(field)}
              className="mt-1 block w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-primary-500"
            />
            {errors[field] && <span className="text-sm text-error-600">{errors[field]}</span>}
          </label>
        ))}
      </div>
      <label className="mt-4 flex items-center gap-3 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={saveAddress}
          onChange={(event) => setSaveAddress(event.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-primary-600"
        />
        Save this address for next time
      </label>
      <button type="submit" className="mt-6 w-full rounded-xl bg-primary-600 px-4 py-3 text-white hover:bg-primary-700">
        Continue to review
      </button>
    </form>
  );
};

export default CheckoutForm;
