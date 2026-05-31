import React, { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext(null);

const VARIANT_STYLES = {
  success: 'bg-emerald-600 text-white',
  error: 'bg-red-600 text-white',
  warning: 'bg-amber-500 text-gray-900',
  info: 'bg-slate-700 text-white',
};

export const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState(null);
  const [type, setType] = useState('info');
  const [timeoutId, setTimeoutId] = useState(null);

  const showNotification = useCallback((content, variant = 'info') => {
    setMessage(content);
    setType(variant);

    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }

    const id = window.setTimeout(() => setMessage(null), 4000);
    setTimeoutId(id);
  }, [timeoutId]);

  return (
    <>
      <NotificationContext.Provider value={{ message, type, showNotification }}>
        {children}
      </NotificationContext.Provider>
      {message && (
        <div className="pointer-events-none fixed right-4 top-4 z-50 w-full max-w-xs px-4 sm:px-6">
          <div className={`pointer-events-auto overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5 ${VARIANT_STYLES[type]}`}>
            <div className="flex items-start gap-3 px-4 py-4">
              <div className="mt-0.5 text-sm font-semibold">{type === 'success' ? 'Success' : type === 'error' ? 'Error' : type === 'warning' ? 'Warning' : 'Info'}</div>
              <div className="min-w-0 flex-1 text-sm leading-6">{message}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};
