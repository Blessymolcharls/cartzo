import React, { useState } from 'react';

const LoginForm = ({ email, password, onEmailChange, onPasswordChange, onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={onSubmit} className="space-y-4">
    <label className="block">
      <span className="text-sm font-medium text-[var(--text-soft)]">Email</span>
      <input
        type="email"
        value={email}
        onChange={onEmailChange}
        className="mt-1 block w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-darker)] px-4 py-3 text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-[var(--primary)]"
        required
      />
    </label>
    <label className="block">
      <span className="text-sm font-medium text-[var(--text-soft)]">Password</span>
      <div className="relative mt-1">
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={onPasswordChange}
          className="block w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-darker)] px-4 py-3 pr-12 text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-[var(--primary)]"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] transition hover:text-[var(--text-main)]"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
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
      className="w-full rounded-xl bg-[var(--primary)] px-4 py-3 text-[var(--bg-darker)] transition hover:bg-[var(--primary-hover)]"
    >
      Sign in
    </button>
    </form>
  );
};

export default LoginForm;
