import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NavItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `rounded-full px-4 py-2 text-sm font-medium transition ${
        isActive ? 'bg-primary-600 text-white' : 'text-gray-700 hover:bg-gray-100'
      }`
    }
  >
    {children}
  </NavLink>
);

const Navbar = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="text-xl font-bold text-primary-600">
          Cartzo
        </NavLink>
        <nav className="flex flex-wrap gap-2 items-center">
          <NavItem to="/products">Products</NavItem>
          <NavItem to="/cart">Cart</NavItem>
          {isAuthenticated && <NavItem to="/checkout">Checkout</NavItem>}
          {isAuthenticated && <NavItem to="/orders">Orders</NavItem>}
          {isAdmin && <NavItem to="/admin">Admin</NavItem>}
          
          {isAuthenticated ? (
            <>
              <NavItem to="/profile">Profile</NavItem>
              <button 
                onClick={handleLogout}
                className="rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavItem to="/login">Login</NavItem>
              <NavItem to="/register">Register</NavItem>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
