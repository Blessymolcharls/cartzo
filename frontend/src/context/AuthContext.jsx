import React, { createContext, useState, useCallback, useEffect } from 'react';
import { authService } from '../services/authService';
import { STORAGE_KEYS } from '../utils/constants';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem(STORAGE_KEYS.JWT_TOKEN);
      if (token) {
        try {
          const response = await authService.getProfile();
          setUser(response.data);
        } catch (err) {
          console.error('Failed to fetch user profile:', err);
          localStorage.removeItem(STORAGE_KEYS.JWT_TOKEN);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const register = useCallback(async (email, password, name) => {
    setError(null);
    try {
      const response = await authService.register({ email, password, name });
      localStorage.setItem(STORAGE_KEYS.JWT_TOKEN, response.data.token);
      setUser(response.data.user);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      setError(message);
      throw err;
    }
  }, []);

  const login = useCallback(async (email, password) => {
    setError(null);
    try {
      const response = await authService.login({ email, password });
      localStorage.setItem(STORAGE_KEYS.JWT_TOKEN, response.data.token);
      setUser(response.data.user);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
      throw err;
    }
  }, []);

  const adminLogin = useCallback(async (email, password) => {
    setError(null);
    try {
      const response = await authService.adminLogin({ email, password });
      localStorage.setItem(STORAGE_KEYS.JWT_TOKEN, response.data.token);
      setUser(response.data.user);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Admin login failed';
      setError(message);
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
      setUser(null);
      localStorage.removeItem(STORAGE_KEYS.JWT_TOKEN);
    } catch (err) {
      console.error('Logout error:', err);
    }
  }, []);

  const updateProfile = useCallback(async (data) => {
    setError(null);
    try {
      const response = await authService.updateProfile(data);
      setUser(response.data);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Update failed';
      setError(message);
      throw err;
    }
  }, []);

  const isAdmin = user?.isAdmin === true;

  const value = {
    user,
    loading,
    error,
    register,
    login,
    adminLogin,
    logout,
    updateProfile,
    isAuthenticated: !!user,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
