import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import ErrorMessage from '../../components/Common/ErrorMessage';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      await register(email, password, name);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto rounded-3xl bg-white p-8 shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Register</h1>
      {error && <ErrorMessage message={error} />}
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-xl border-gray-300 bg-gray-50 px-4 py-3 focus:border-primary-500 focus:ring-primary-500"
            required
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-xl border-gray-300 bg-gray-50 px-4 py-3 focus:border-primary-500 focus:ring-primary-500"
            required
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-xl border-gray-300 bg-gray-50 px-4 py-3 focus:border-primary-500 focus:ring-primary-500"
            required
          />
        </label>
        <button type="submit" className="w-full rounded-xl bg-primary-600 px-4 py-3 text-white hover:bg-primary-700">
          Create account
        </button>
      </form>
    </div>
  );
};

export default Register;
