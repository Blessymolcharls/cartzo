import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import ErrorMessage from '../../components/Common/ErrorMessage';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email] = useState(user?.email || '');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      await updateProfile({ name });
      setSuccess('Profile updated successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="max-w-md mx-auto rounded-3xl bg-white p-8 shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Profile</h1>
      {error && <ErrorMessage message={error} />}
      {success && <div className="rounded-xl bg-success-50 border border-success-200 p-4 text-success-700">{success}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-xl border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:border-primary-500 focus:ring-primary-500"
            required
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Email</span>
          <input
            type="email"
            value={email}
            disabled
            className="mt-1 block w-full rounded-xl border-gray-300 bg-gray-100 px-4 py-3 text-gray-700 cursor-not-allowed"
          />
        </label>
        <button type="submit" className="w-full rounded-xl bg-primary-600 px-4 py-3 text-white hover:bg-primary-700">
          Save changes
        </button>
      </form>
    </div>
  );
};

export default Profile;
