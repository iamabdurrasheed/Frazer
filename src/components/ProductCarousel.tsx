'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface CarouselSlide {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  buttonText: string;
  buttonLink: string;
  backgroundColor: string;
  textColor: string;
}

const ProductCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: CarouselSlide[] = [
    {
      id: 1,
      title: "Valve Products",
      description: "Precision-engineered for peak performance. FGV valves ensure flawless flow control across industrial applications—trusted, durable, and globally proven.",
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=600&fit=crop&crop=center&auto=format&q=75",
      category: "Products",
      buttonText: "SHOP NOW",
      buttonLink: "/products?category=valves",
      backgroundColor: "from-red-500 to-red-600",
      textColor: "text-white"
    },
    {
      id: 2,
      title: "From ABB Industriovate",
      description: "Powering industrial innovation with ABB's advanced control solutions global expertise, reliable performance, and cutting-edge efficiency.",
      image: "https://images.unsplash.com/photo-1562408590-e32931084e23?w=800&h=600&fit=crop&crop=center&auto=format&q=75",
      category: "Products",
      buttonText: "SHOP NOW",
      buttonLink: "/products?category=electrical",
      backgroundColor: "from-teal-500 to-teal-600",
      textColor: "text-white"
    },
    {
      id: 3,
      title: "HVAC Solutions",
      description: "Complete HVAC systems and components for efficient climate control. Professional-grade equipment for commercial and industrial applications.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center&auto=format&q=75",
      category: "Products",
      buttonText: "SHOP NOW",
      buttonLink: "/products?category=hvac",
      backgroundColor: "from-blue-500 to-blue-600",
      textColor: "text-white"
    },
    {
      id: 4,
      title: "Plumbing & Fittings",
      description: "Explore expert reviews, in-depth comparisons, and the latest trends in plumbing products. Get reliable recommendations to make the best choices for your business.",
      image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&h=600&fit=crop&crop=center&auto=format&q=75",
      category: "Products",
      buttonText: "SHOP NOW",
      buttonLink: "/products?category=plumbing",
      backgroundColor: "from-amber-500 to-orange-500",
      textColor: "text-white"
    },
    {
      id: 5,
      title: "Industrial Pumps",
      description: "High-performance pump systems and spare parts for industrial applications. Reliable solutions from trusted global manufacturers.",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop&crop=center&auto=format&q=75",
      category: "Products",
      buttonText: "SHOP NOW",
      buttonLink: "/products?category=pumps",
      backgroundColor: "from-purple-500 to-purple-600",
      textColor: "text-white"
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => 
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[85vh] 2xl:h-[90vh] min-h-[400px] max-h-[1000px] overflow-hidden bg-gray-100">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
              index === currentSlide ? 'translate-x-0' : 
              index < currentSlide ? '-translate-x-full' : 'translate-x-full'
            }`}
          >
            <div className={`w-full h-full bg-gradient-to-r ${slide.backgroundColor} relative overflow-hidden`}>
              {/* Content Container */}
              <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 h-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 h-full items-center py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20">
                  {/* Text Content */}
                  <div className={`${slide.textColor} z-10 order-2 lg:order-1 text-center lg:text-left px-2 sm:px-0`}>
                    <div className="mb-1 sm:mb-2 md:mb-3 lg:mb-4">
                      <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider opacity-90">
                        {slide.category}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-8 leading-tight">
                      {slide.title}
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-6 sm:mb-7 md:mb-8 lg:mb-10 xl:mb-12 leading-relaxed max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto lg:mx-0 opacity-95">
                      {slide.description}
                    </p>
                    <div className="pb-4 sm:pb-5 md:pb-6 lg:pb-8">
                      <Link href={slide.buttonLink}>
                        <button className="bg-white text-gray-900 hover:bg-gray-100 font-bold text-base sm:text-lg md:text-xl lg:text-2xl px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 py-3 sm:py-4 md:py-5 lg:py-6 xl:py-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
                          {slide.buttonText}
                        </button>
                      </Link>
                    </div>
                  </div>

                  {/* Image Content */}
                  <div className="relative order-1 lg:order-2 h-full flex items-center justify-center py-2 sm:py-4">
                    <div className="relative w-full max-w-[320px] sm:max-w-[380px] md:max-w-[450px] lg:max-w-[500px] xl:max-w-[580px] 2xl:max-w-[650px] mx-auto">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-40 sm:h-48 md:h-60 lg:h-72 xl:h-80 2xl:h-96 object-cover rounded-lg sm:rounded-xl md:rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-white/10 rounded-lg sm:rounded-xl md:rounded-2xl backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 sm:top-6 lg:top-8 xl:top-12 2xl:top-16 right-4 sm:right-6 lg:right-8 xl:right-12 2xl:right-16 w-12 sm:w-16 md:w-20 lg:w-28 xl:w-36 2xl:w-44 h-12 sm:h-16 md:h-20 lg:h-28 xl:h-36 2xl:h-44 bg-white/10 rounded-full blur-xl sm:blur-2xl animate-pulse"></div>
              <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 xl:bottom-12 2xl:bottom-16 left-4 sm:left-6 lg:left-8 xl:left-12 2xl:left-16 w-8 sm:w-12 md:w-16 lg:w-22 xl:w-28 2xl:w-36 h-8 sm:h-12 md:h-16 lg:h-22 xl:h-28 2xl:h-36 bg-white/10 rounded-full blur-lg sm:blur-xl animate-pulse animation-delay-2000"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-3 md:left-4 lg:left-6 xl:left-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
        aria-label="Previous slide"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-3 md:right-4 lg:right-6 xl:right-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
        aria-label="Next slide"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-3 sm:bottom-4 md:bottom-5 lg:bottom-6 xl:bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-5 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125 shadow-lg' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 sm:h-1.5 md:h-2 bg-white/20">
        <div 
          className="h-full bg-white transition-all duration-300 ease-linear"
          style={{ 
            width: `${((currentSlide + 1) / slides.length) * 100}%` 
          }}
        />
      </div>
    </div>
  );
};

export default ProductCarousel;
