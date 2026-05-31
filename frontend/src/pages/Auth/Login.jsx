import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import ErrorMessage from '../../components/Common/ErrorMessage';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto rounded-3xl bg-white p-8 shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      {error && <ErrorMessage message={error} />}
      <form onSubmit={handleSubmit} className="space-y-4">
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
          Sign In
        </button>
      </form>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-sm font-semibold text-blue-900 mb-2">Demo Admin Credentials:</p>
        <p className="text-xs text-blue-800">Email: admin@cartzo.com</p>
        <p className="text-xs text-blue-800">Password: admin123</p>
      </div>
    </div>
  );
};

export default Login;
