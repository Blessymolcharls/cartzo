import React from 'react';

const RegisterForm = ({ name, email, password, onNameChange, onEmailChange, onPasswordChange, onSubmit }) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <label className="block">
      <span className="text-sm font-medium text-gray-700">Name</span>
      <input
        type="text"
        value={name}
        onChange={onNameChange}
        className="mt-1 block w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 focus:border-primary-500 focus:ring-primary-500"
        required
      />
    </label>
    <label className="block">
      <span className="text-sm font-medium text-gray-700">Email</span>
      <input
        type="email"
        value={email}
        onChange={onEmailChange}
        className="mt-1 block w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 focus:border-primary-500 focus:ring-primary-500"
        required
      />
    </label>
    <label className="block">
      <span className="text-sm font-medium text-gray-700">Password</span>
      <input
        type="password"
        value={password}
        onChange={onPasswordChange}
        className="mt-1 block w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 focus:border-primary-500 focus:ring-primary-500"
        required
      />
    </label>
    <button type="submit" className="w-full rounded-xl bg-primary-600 px-4 py-3 text-white hover:bg-primary-700">
      Create account
    </button>
  </form>
);

export default RegisterForm;
