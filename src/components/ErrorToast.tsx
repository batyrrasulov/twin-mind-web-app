// src/components/ErrorToast.tsx
import React, { useEffect } from 'react';

interface ErrorToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

const ErrorToast: React.FC<ErrorToastProps> = ({ 
  message, 
  onClose, 
  duration = 5000 
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-3 rounded-md shadow-lg flex items-center">
      <span>{message}</span>
      <button 
        onClick={onClose}
        className="ml-3 text-white hover:text-gray-200"
      >
        ×
      </button>
    </div>
  );
};

export default ErrorToast;