export default function LoadingComponent() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="relative">
          {/* Spinner */}
          <div className="w-16 h-16 relative">
            <div className="absolute w-full h-full border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
            <div
              className="absolute w-full h-full border-4 border-blue-500 rounded-full 
                            border-t-transparent animate-spin"
            ></div>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Loading
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Please wait while we prepare your content...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
