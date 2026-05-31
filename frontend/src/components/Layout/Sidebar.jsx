import React, { useMemo } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const categories = [
  'Electronics',
  'Fashion',
  'Home & Living',
  'Books',
  'Accessories'
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleCategoryClick = (category) => {
    navigate(`/shop?category=${encodeURIComponent(category)}`);
    setSidebarOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const q = formData.get('search');
    if (q) {
      navigate(`/shop?keyword=${encodeURIComponent(q)}`);
    } else {
      navigate('/shop');
    }
    setSidebarOpen(false);
  };

  const displayName = useMemo(() => {
    if (!user) return 'Guest';
    return user.name || user.fullName || user.username || 'Account';
  }, [user]);

  const isActiveCategory = (category) => {
    if (location.pathname !== '/shop' && location.pathname !== '/products') return false;
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('category') === category;
  };

  return (
    <>
      <aside className={`products-sidebar ${sidebarOpen ? 'is-open' : ''}`}>
        <div className="sidebar-section">
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">
              {displayName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="sidebar-user-label">Hello, {displayName}</p>
              <span className="sidebar-user-meta">{user?.email || 'Not signed in'}</span>
            </div>
          </div>
          <button type="button" className="sidebar-close" onClick={() => setSidebarOpen(false)}>✕</button>
        </div>

        <div className="sidebar-section">
          <h4>Search</h4>
          <form onSubmit={handleSearch} className="flex gap-2">
            <input 
              type="text" 
              name="search" 
              placeholder="Search products..." 
              className="w-full bg-[var(--bg-darker)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-sm text-[var(--text-main)] outline-none focus:border-[var(--primary)]"
            />
            <button type="submit" className="bg-[var(--glass-bg)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 hover:border-[var(--primary)] text-[var(--text-main)]">
              🔍
            </button>
          </form>
        </div>

        <div className="sidebar-section">
          <div className="flex justify-between items-center mb-2">
            <h4>Shop by Category</h4>
          </div>
          <nav className="sidebar-links">
            <button 
              type="button" 
              onClick={() => handleCategoryClick('All')}
              className={`sidebar-pill transition-colors text-left ${!location.search && (location.pathname === '/shop' || location.pathname === '/products') ? 'bg-[var(--primary)] text-black border-[var(--primary)]' : ''}`}
            >
              All Products
            </button>
            {categories.map((category) => (
              <button 
                key={category} 
                type="button" 
                onClick={() => handleCategoryClick(category)}
                className={`sidebar-pill transition-colors text-left ${isActiveCategory(category) ? 'bg-[var(--primary)] text-black border-[var(--primary)]' : ''}`}
              >
                {category}
              </button>
            ))}
          </nav>
        </div>

        <div className="sidebar-section">
          <h4>Navigation</h4>
          <nav className="sidebar-links">
            <NavLink to="/cart" onClick={() => setSidebarOpen(false)} className="sidebar-pill text-left block w-full">View Cart</NavLink>
            {user ? (
              <>
                <NavLink to="/profile" onClick={() => setSidebarOpen(false)} className="sidebar-pill text-left block w-full">Profile Settings</NavLink>
                <NavLink to="/orders" onClick={() => setSidebarOpen(false)} className="sidebar-pill text-left block w-full">Order History</NavLink>
                <button type="button" className="sidebar-pill text-left mt-2 block w-full text-red-400" onClick={() => { logout(); setSidebarOpen(false); navigate('/'); }}>Logout</button>
              </>
            ) : (
              <>
                <NavLink to="/login" onClick={() => setSidebarOpen(false)} className="sidebar-pill text-left block w-full">Login</NavLink>
                <NavLink to="/register" onClick={() => setSidebarOpen(false)} className="sidebar-pill text-left block w-full">Register</NavLink>
              </>
            )}
          </nav>
        </div>
      </aside>

      {sidebarOpen && <button type="button" className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
    </>
  );
};

export default Sidebar;
