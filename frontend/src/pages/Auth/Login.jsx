import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../context/NotificationContext';
import ErrorMessage from '../../components/Common/ErrorMessage';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      await login(email, password);
      showNotification('Signed in successfully', 'success');
      // Using navigate to homepage without full page reload is better handled by AuthContext,
      // but let's assume it automatically navigates on state change.
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-200px)] w-full items-center justify-center py-12 px-4">
      <div className="w-full max-w-md rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-8 text-[var(--text-main)] shadow-[0_24px_60px_rgba(0,0,0,0.3)] backdrop-blur-xl animate-[modalScaleIn_0.4s_ease-out_forwards]">
        <h1 className="mb-4 text-3xl font-bold">Login</h1>
        {error && <ErrorMessage message={error} />}
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-[var(--text-soft)]">Email</span>
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
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] transition hover:text-[var(--text-main)]"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                    <path d="M4 4l16 16" />
                  </svg>
                )}
              </button>
            </div>
          </label>
          <button
            type="submit"
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-[var(--primary)] to-[#b8943e] px-4 py-3.5 font-bold text-[#0a0a0a] shadow-lg shadow-[var(--primary)]/20 transition-all hover:scale-[1.02] hover:shadow-[var(--primary)]/40 active:scale-[0.98]"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
