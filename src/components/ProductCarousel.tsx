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
    <div className="relative w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px] 2xl:h-[600px] overflow-hidden bg-gray-100">
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
              <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 h-full max-w-screen-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8 h-full items-center py-2 sm:py-3 md:py-4 lg:py-6">
                  {/* Text Content */}
                  <div className={`${slide.textColor} z-10 order-2 lg:order-1 text-center lg:text-left px-2 sm:px-0`}>
                    <div className="mb-1 sm:mb-2 md:mb-3 lg:mb-4">
                      <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider opacity-90">
                        {slide.category}
                      </span>
                    </div>
                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-1 sm:mb-2 md:mb-3 lg:mb-4 leading-tight">
                      {slide.title}
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl mb-3 sm:mb-4 md:mb-5 lg:mb-6 leading-relaxed max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto lg:mx-0 opacity-95">
                      {slide.description}
                    </p>
                    <div className="pb-2 sm:pb-3 md:pb-4">
                      <Link href={slide.buttonLink}>
                        <button className="bg-white text-gray-900 hover:bg-gray-100 font-bold text-xs sm:text-sm md:text-base lg:text-lg px-3 sm:px-4 md:px-6 lg:px-8 py-1.5 sm:py-2 md:py-3 lg:py-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
                          {slide.buttonText}
                        </button>
                      </Link>
                    </div>
                  </div>

                  {/* Image Content */}
                  <div className="relative order-1 lg:order-2 h-full flex items-center justify-center py-1 sm:py-2">
                    <div className="relative w-full max-w-[240px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-[360px] xl:max-w-[400px] 2xl:max-w-[450px] mx-auto">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-24 sm:h-32 md:h-40 lg:h-48 xl:h-56 2xl:h-64 object-cover rounded-lg sm:rounded-xl md:rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-white/10 rounded-lg sm:rounded-xl md:rounded-2xl backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-2 sm:top-4 lg:top-6 xl:top-10 right-2 sm:right-4 lg:right-6 xl:right-10 w-8 sm:w-12 md:w-16 lg:w-24 xl:w-32 h-8 sm:h-12 md:h-16 lg:h-24 xl:h-32 bg-white/10 rounded-full blur-xl sm:blur-2xl animate-pulse"></div>
              <div className="absolute bottom-2 sm:bottom-4 lg:bottom-6 xl:bottom-10 left-2 sm:left-4 lg:left-6 xl:left-10 w-6 sm:w-9 md:w-12 lg:w-18 xl:w-24 h-6 sm:h-9 md:h-12 lg:h-18 xl:h-24 bg-white/10 rounded-full blur-lg sm:blur-xl animate-pulse animation-delay-2000"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-1.5 sm:p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
        aria-label="Previous slide"
      >
        <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-1.5 sm:p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
        aria-label="Next slide"
      >
        <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-1 sm:bottom-2 md:bottom-3 lg:bottom-4 left-1/2 -translate-x-1/2 flex space-x-1 sm:space-x-2 md:space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-white/20">
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
