const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
      <p className="font-semibold">✗ Error</p>
      <p className="text-sm mt-2">{message || 'Something went wrong. Please try again.'}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
