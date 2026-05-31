const Loading = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-pulse space-y-4 w-full max-w-md">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default Loading;
