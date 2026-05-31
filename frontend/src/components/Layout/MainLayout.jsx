import React, { useMemo, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Common/Navbar';
import Footer from '../Common/Footer';
import Sidebar from './Sidebar';
const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const showSidebarToggle = useMemo(
    () => location.pathname !== '/',
    [location.pathname]
  );

  return (
    <div className="app-shell">
      <Navbar onSidebarOpen={() => setSidebarOpen(true)} showSidebarToggle={showSidebarToggle} />
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main className="app-content">
        <Outlet context={{ sidebarOpen, setSidebarOpen }} />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
