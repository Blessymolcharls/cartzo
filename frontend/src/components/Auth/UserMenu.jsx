import React from 'react';
import { Link } from 'react-router-dom';

const UserMenu = ({ onLogout }) => (
  <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
    <Link to="/profile" className="block rounded-xl px-4 py-3 text-gray-700 hover:bg-gray-100">
      Profile
    </Link>
    <button type="button" onClick={onLogout} className="mt-2 w-full rounded-xl bg-error-600 px-4 py-3 text-white hover:bg-error-700">
      Logout
    </button>
  </div>
);

export default UserMenu;
