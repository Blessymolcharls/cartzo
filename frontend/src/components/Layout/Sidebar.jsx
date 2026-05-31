import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => (
  <nav className="sticky top-20 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
    <h3 className="text-sm font-semibold text-gray-700 mb-3">Navigation</h3>
    <ul className="space-y-2">
      <li>
        <NavLink to="/" className={({ isActive }) => `block rounded-md px-3 py-2 text-sm ${isActive ? 'bg-primary-600 text-white' : 'text-gray-700 hover:bg-gray-50'}`}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/products" className={({ isActive }) => `block rounded-md px-3 py-2 text-sm ${isActive ? 'bg-primary-600 text-white' : 'text-gray-700 hover:bg-gray-50'}`}>
          Products
        </NavLink>
      </li>
      <li>
        <NavLink to="/cart" className={({ isActive }) => `block rounded-md px-3 py-2 text-sm ${isActive ? 'bg-primary-600 text-white' : 'text-gray-700 hover:bg-gray-50'}`}>
          Cart
        </NavLink>
      </li>
      <li>
        <NavLink to="/checkout" className={({ isActive }) => `block rounded-md px-3 py-2 text-sm ${isActive ? 'bg-primary-600 text-white' : 'text-gray-700 hover:bg-gray-50'}`}>
          Checkout
        </NavLink>
      </li>
      <li>
        <NavLink to="/orders" className={({ isActive }) => `block rounded-md px-3 py-2 text-sm ${isActive ? 'bg-primary-600 text-white' : 'text-gray-700 hover:bg-gray-50'}`}>
          Orders
        </NavLink>
      </li>
      <li>
        <NavLink to="/admin" className={({ isActive }) => `block rounded-md px-3 py-2 text-sm ${isActive ? 'bg-primary-600 text-white' : 'text-gray-700 hover:bg-gray-50'}`}>
          Admin
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Sidebar;
