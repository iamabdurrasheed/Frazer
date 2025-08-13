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
    sm: 'h-8 sm:h-10',
    md: 'h-12 sm:h-16 md:h-20',
    lg: 'h-16 sm:h-20 md:h-24',
    xl: 'h-20 sm:h-24 md:h-32'
  };

  const textSizeClasses = {
    sm: 'text-lg sm:text-xl',
    md: 'text-xl sm:text-2xl md:text-3xl',
    lg: 'text-2xl sm:text-3xl md:text-4xl',
    xl: 'text-3xl sm:text-4xl md:text-5xl'
  };

  const subTextSizeClasses = {
    sm: 'text-xs sm:text-sm',
    md: 'text-sm sm:text-base',
    lg: 'text-base sm:text-lg',
    xl: 'text-lg sm:text-xl'
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
    <div className={`group flex items-center space-x-2 sm:space-x-3 ${className}`}>
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
