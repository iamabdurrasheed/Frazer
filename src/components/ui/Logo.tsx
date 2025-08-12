import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  variant?: 'full' | 'icon';
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showText = true, 
  className = '', 
  variant = 'full' 
}) => {
  const sizeClasses = {
    sm: 'h-12',
    md: 'h-20',
    lg: 'h-24',
    xl: 'h-32'
  };

  const textSizeClasses = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-4xl',
    xl: 'text-5xl'
  };

  const subTextSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  if (variant === 'icon') {
    return (
      <div className={`group ${className}`}>
        <img 
          src="/frazer-logo.png" 
          alt="Frazer BMT Logo" 
          className={`${sizeClasses[size]} w-auto transform group-hover:scale-105 transition-all duration-300 filter drop-shadow-lg`}
        />
      </div>
    );
  }

  return (
    <div className={`group flex items-center space-x-3 ${className}`}>
      <div className="relative">
        <img 
          src="/frazer-logo.png" 
          alt="Frazer BMT Logo" 
          className={`${sizeClasses[size]} w-auto transform group-hover:scale-105 transition-all duration-300 filter drop-shadow-lg`}
        />
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-blue-800/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
      </div>
      

    </div>
  );
};

export default Logo;
