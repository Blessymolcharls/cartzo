import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../context/NotificationContext';
import ErrorMessage from '../../components/Common/ErrorMessage';

const AdminLogin = () => {
  const { adminLogin } = useAuth();
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await adminLogin(email, password);
      showNotification('Admin authenticated successfully', 'success');
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('[AdminLogin] Login failed:', err.response?.data || err.message, err);
      setError(err.response?.data?.message || 'Admin login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-200px)] w-full items-center justify-center py-12 px-4">
      <div className="w-full max-w-md rounded-3xl border border-[var(--primary)]/30 bg-[#0a0a0a]/80 p-8 text-[var(--text-main)] shadow-[0_24px_60px_rgba(212,175,55,0.15)] backdrop-blur-xl animate-[modalScaleIn_0.4s_ease-out_forwards]">
        <div className="flex items-center justify-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[var(--primary)]/20 flex items-center justify-center border border-[var(--primary)]/30">
            <svg className="w-6 h-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>
        <h1 className="mb-2 text-3xl font-bold text-center text-[var(--primary)]">Admin Portal</h1>
        <p className="text-center text-[var(--text-muted)] mb-6 text-sm">Secure access restricted to authorized personnel</p>
        
        {error && <ErrorMessage message={error} />}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-[var(--text-soft)]">Admin Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-darker)] px-4 py-3 text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all"
              required
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-[var(--text-soft)]">Password</span>
            <div className="relative mt-1">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-darker)] px-4 py-3 pr-12 text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] transition hover:text-[var(--primary)]"
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /><path d="M4 4l16 16" /></svg>
                )}
              </button>
            </div>
          </label>
          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-[var(--primary)] to-[#b8943e] px-4 py-3.5 font-bold text-[#0a0a0a] shadow-lg shadow-[var(--primary)]/20 transition-all hover:scale-[1.02] hover:shadow-[var(--primary)]/40 active:scale-[0.98] disabled:opacity-70"
          >
            {isLoading ? 'Authenticating...' : 'Secure Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
