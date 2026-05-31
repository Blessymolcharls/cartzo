import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loading from '../Common/Loading';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole === 'admin' && !isAdmin) {
    return (
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-3xl bg-red-50 border border-red-200 p-8 text-center">
          <h1 className="text-2xl font-bold text-red-900 mb-4">Access Denied</h1>
          <p className="text-red-700 mb-4">You do not have permission to access the admin panel.</p>
          <a href="/" className="inline-block rounded-xl bg-red-600 px-6 py-3 text-white hover:bg-red-700">
            Return to home
          </a>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
