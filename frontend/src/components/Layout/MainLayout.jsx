import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Common/Navbar';
import Footer from '../Common/Footer';
import Sidebar from './Sidebar';

const MainLayout = () => (
  <div className="min-h-screen bg-gray-50 text-gray-900">
    <Navbar />
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <Sidebar />
        </aside>
        <main className="min-h-[60vh]">
          <Outlet />
        </main>
      </div>
    </div>
    <Footer />
  </div>
);

export default MainLayout;
