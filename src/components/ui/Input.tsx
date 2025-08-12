import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  className,
  id,
  ...props
}) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="space-y-2 group">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold bg-gradient-to-r from-gray-700 via-blue-600 to-purple-600 bg-clip-text text-transparent group-focus-within:from-blue-600 group-focus-within:to-purple-600 transition-all duration-300"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          className={cn(
            'block w-full px-4 py-3 backdrop-blur-sm bg-white/80 border-0 rounded-xl shadow-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/90 transition-all duration-300 hover:shadow-xl hover:bg-white/90',
            error && 'ring-2 ring-red-400/50 focus:ring-red-500/50 bg-red-50/80',
            className
          )}
          {...props}
        />
        {/* Gradient border effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-teal-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
      {error && (
        <div className="flex items-center space-x-2">
          <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse"></div>
          <p className="text-sm text-red-600 font-medium">{error}</p>
        </div>
      )}
    </div>
  );
};

export default Input;
