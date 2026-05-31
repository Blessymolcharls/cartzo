const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="rounded-xl border bg-[var(--error-bg)] p-4 text-[var(--error-text)] border-[var(--error-border)]">
      <p className="font-semibold">X Error</p>
      <p className="text-sm mt-2">{message || 'Something went wrong. Please try again.'}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
