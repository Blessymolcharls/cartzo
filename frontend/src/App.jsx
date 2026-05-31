import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { NotificationProvider } from './context/NotificationContext';

import MainLayout from './components/Layout/MainLayout';
import ProtectedRoute from './components/Auth/ProtectedRoute';

import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Profile from './pages/Auth/Profile';

import ProductList from './pages/Products/ProductList';
import ProductDetail from './pages/Products/ProductDetail';

import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import OrderConfirmation from './pages/Checkout/OrderConfirmation';
import OrderList from './pages/Orders/OrderList';
import OrderDetail from './pages/Orders/OrderDetail';

import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';

import AdminLayout from './components/Layout/AdminLayout';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminProducts from './pages/Admin/AdminProducts';
import AdminProductForm from './pages/Admin/AdminProductForm';

import './App.css';

function App() {
  return (
    <Router>
      <NotificationProvider>
        <AuthProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              
              {/* Admin Routes - Separate Layout */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="products/new" element={<AdminProductForm />} />
                <Route path="products/:id/edit" element={<AdminProductForm />} />
                {/* Fallback routes for unimplemented pages */}
                <Route path="orders" element={<div className="text-white">Orders module coming soon</div>} />
                <Route path="users" element={<div className="text-white">Users module coming soon</div>} />
                <Route path="settings" element={<div className="text-white">Settings module coming soon</div>} />
              </Route>

              {/* Main Storefront Routes */}
              <Route element={<MainLayout />}>
                <Route path="shop" element={<ProductList />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="profile" element={<Profile />} />
                <Route path="products" element={<ProductList />} />
                <Route path="products/:id" element={<ProductDetail />} />
                <Route path="cart" element={<Cart />} />
                <Route path="checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                <Route path="checkout/success" element={<ProtectedRoute><OrderConfirmation /></ProtectedRoute>} />
                <Route path="orders" element={<ProtectedRoute><OrderList /></ProtectedRoute>} />
                <Route path="orders/:id" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </CartProvider>
        </AuthProvider>
      </NotificationProvider>
    </Router>
  );
}

export default App;
