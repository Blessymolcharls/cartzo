import React, { useEffect, useMemo, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../hooks/useCart';

const categories = [
  'All',
  'Electronics',
  'Fashion',
  'Home & Living',
  'Books',
  'Accessories'
];

const Navbar = ({ onSidebarOpen, showSidebarToggle }) => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const [theme, setTheme] = useState('dark');
  const [searchQuery, setSearchQuery] = useState('');

  const initialTheme = useMemo(() => {
    if (typeof window === 'undefined') return 'dark';
    const stored = window.localStorage.getItem('cartzo-theme');
    if (stored === 'light' || stored === 'dark') return stored;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }, []);

  useEffect(() => {
    setTheme(initialTheme);
  }, [initialTheme]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('cartzo-theme', theme);
  }, [theme]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?keyword=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/shop');
    }
  };

  const handleCategoryClick = (category) => {
    if (category === 'All') {
      navigate('/shop');
    } else {
      navigate(`/shop?category=${encodeURIComponent(category)}`);
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand-wrap">
          {showSidebarToggle && (
            <button
              type="button"
              className="navbar-toggle-btn"
              aria-label="Open sidebar"
              onClick={onSidebarOpen}
            >
              <span />
              <span />
              <span />
            </button>
          )}
          <NavLink to="/shop" className="navbar-brand">
            <span className="navbar-logo">CZ</span>
            Cartzo
          </NavLink>
        </div>
        <form className="navbar-search" onSubmit={handleSearch}>
          <input 
            type="search" 
            placeholder="Search products..." 
            aria-label="Search products" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="navbar-search-icon bg-transparent border-none cursor-pointer">⌕</button>
        </form>
        <div className="navbar-actions">
          <NavLink to="/cart" id="navbar-cart-icon" className="navbar-icon-btn relative" aria-label="Cart">
            🛒
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-[var(--primary)] text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </NavLink>
          <button
            type="button"
            className="theme-toggle"
            aria-label="Toggle theme"
            onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
          {isAuthenticated ? (
            <div className="navbar-user">
              <NavLink to="/profile">{user?.name || 'Account'}</NavLink>
              <button type="button" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
           <div className="navbar-user">
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </div>
          )}
        </div>
      </div>
      <div className="sub-navbar">
        <div className="sub-navbar-content">
          {categories.map((category) => (
            <button 
              key={category} 
              type="button" 
              className="sub-nav-item"
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
          {isAdmin && (
            <NavLink to="/admin" className="sub-nav-item">
              Admin
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
