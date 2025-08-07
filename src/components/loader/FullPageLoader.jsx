import { useEffect, useState } from 'react';

const FullPageLoader = ({ loadingText = "Candidates Dashboard" }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 5;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center app-gradient-bg z-50">
      <div className="w-full max-w-md px-6 py-8">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="text-3xl font-bold text-blue-600">
            <span>Sentry</span>
            <span className="text-gray-800">Spot</span>
          </div>
        </div>

        {/* Loading Spinner */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        {/* Progress Text */}
        <div className="text-center text-gray-600 mb-8">
          <p className="text-sm">Loading {loadingText}... {progress}%</p>
        </div>

        {/* Title & Description */}
        <div className="text-center text-gray-500">
          <h1 className="text-xl font-semibold mb-1"> SentrySpot</h1>
          {/* <p className="text-sm">Job Board ReactJs Template</p> */}
        </div>
      </div>
    </div>
  );
};

// Usage example
export default function LoaderExample() {
  const [loading, setLoading] = useState(true);
  const loadingText = "Candidates Dashboard";

  useEffect(() => {
    // Simulate loading for demo purposes
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen app-gradient-bg">
      {loading ? (
        <FullPageLoader loadingText={loadingText} />
      ) : (
        <div className="p-8">
          <h1 className="text-2xl font-bold text-gray-800">{loadingText}</h1>
          <p className="text-gray-600">Your {loadingText} content is loaded successfully!</p>
        </div>
      )}
    </div>
  );
}