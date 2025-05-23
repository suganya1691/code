import React from 'react';

function LoadingSpinner() {
  return (
     <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"  data-testid="loading-spinner">
      <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default LoadingSpinner;