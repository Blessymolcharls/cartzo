import React, { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState(null);
  const [type, setType] = useState('info');
  const [timeoutId, setTimeoutId] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const showNotification = useCallback((content, variant = 'info') => {
    setMessage(content);
    setType(variant);
    setIsVisible(true);

    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }

    // Auto-dismiss after 3 seconds
    const id = window.setTimeout(() => {
      setIsVisible(false);
      // Wait for fade out animation before clearing message
      setTimeout(() => setMessage(null), 300);
    }, 3000);
    setTimeoutId(id);
  }, [timeoutId]);

  return (
    <>
      <NotificationContext.Provider value={{ message, type, showNotification }}>
        {children}
      </NotificationContext.Provider>
      
      {/* Centered Modal Toast */}
      {message && (
        <div className={`fixed inset-0 z-[99999] flex items-center justify-center pointer-events-none p-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {/* Subtle backdrop blur (optional, keeps focus on toast) */}
          <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
          
          <div className="pointer-events-auto relative overflow-hidden rounded-2xl bg-[#1a1a1a] border border-white/10 p-6 flex flex-col items-center gap-4 text-center shadow-[0_24px_60px_rgba(0,0,0,0.5)] animate-[modalScaleIn_0.3s_ease-out_forwards] max-w-[320px] w-full">
            
            {/* Dynamic Icon */}
            {type === 'success' && (
              <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
            
            {type === 'error' && (
              <div className="w-14 h-14 rounded-full bg-red-500/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            )}
            
            {type === 'warning' && (
              <div className="w-14 h-14 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            )}

            {type === 'info' && (
              <div className="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            )}

            <div>
              <h3 className="text-white font-bold text-lg mb-1 capitalize">
                {type}
              </h3>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                {message}
              </p>
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
