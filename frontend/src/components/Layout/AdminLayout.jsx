import React, { useState } from 'react';
import { NavLink, Outlet, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const AdminSidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navLinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
    { name: 'Products', path: '/admin/products', icon: '📦' },
    { name: 'Orders', path: '/admin/orders', icon: '🛒' },
    { name: 'Users', path: '/admin/users', icon: '👥' },
    { name: 'Settings', path: '/admin/settings', icon: '⚙️' },
  ];

  const sidebarClasses = `fixed inset-y-0 left-0 z-50 w-64 bg-[#0a0a0a] border-r border-white/10 transition-transform duration-300 md:relative md:translate-x-0 ${
    isMobileOpen ? 'translate-x-0' : '-translate-x-full'
  }`;

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside className={sidebarClasses}>
        <div className="flex h-16 items-center justify-between px-6 border-b border-white/10">
          <span className="text-xl font-bold text-[var(--primary)] flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--primary)] text-black flex items-center justify-center font-black">CZ</div>
            Admin Portal
          </span>
          <button 
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setIsMobileOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <span>{link.icon}</span>
              <span className="font-medium">{link.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 hover:text-red-300 transition-all"
          >
            <span>🚪</span>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

const AdminLayout = () => {
  const { user, loading } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">Loading...</div>;

  if (!user || !user.isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-[#050505] text-[var(--text-main)] font-['Inter']">
      <AdminSidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
      
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Admin Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-30">
          <button 
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setIsMobileOpen(true)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <div className="hidden md:block">
            {/* Breadcrumbs or Dashboard Title could go here */}
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-right hidden sm:block">
              <div className="font-bold text-white">{user.name}</div>
              <div className="text-xs text-[var(--primary)]">Super Admin</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 border border-[var(--primary)]/30 flex items-center justify-center text-[var(--primary)] font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#050505] p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
