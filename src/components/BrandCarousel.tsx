'use client';

import React from 'react';
import Link from 'next/link';

interface BrandSlide {
  id: number;
  name: string;
  logo: string;
  description: string;
  link: string;
}

const BrandCarousel: React.FC = () => {
  const brands: BrandSlide[] = [
    {
      id: 1,
      name: "ABB",
      logo: "https://images.unsplash.com/photo-1562408590-e32931084e23?w=200&h=120&fit=crop&crop=center&auto=format&q=75",
      description: "Global leader in industrial automation and electrical products",
      link: "/products?brand=ABB"
    },
    {
      id: 2,
      name: "FGV",
      logo: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=200&h=120&fit=crop&crop=center&auto=format&q=75",
      description: "Premium valve solutions for industrial applications",
      link: "/products?brand=FGV"
    },
    {
      id: 3,
      name: "Kitz",
      logo: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=200&h=120&fit=crop&crop=center&auto=format&q=75",
      description: "High-quality valve and pump components",
      link: "/products?brand=Kitz"
    },
    {
      id: 4,
      name: "WALTHER-WERKE",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=120&fit=crop&crop=center&auto=format&q=75",
      description: "Professional electrical connection systems",
      link: "/products?brand=WALTHER-WERKE"
    },
    {
      id: 5,
      name: "nVent Hoffman",
      logo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=120&fit=crop&crop=center&auto=format&q=75",
      description: "Industrial enclosures and thermal management",
      link: "/products?brand=nVent"
    },
    {
      id: 6,
      name: "Grundfos",
      logo: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=200&h=120&fit=crop&crop=center&auto=format&q=75",
      description: "Advanced pump solutions and water technology",
      link: "/products?brand=Grundfos"
    }
  ];

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Global Brands</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We partner with industry-leading manufacturers to bring you the highest quality industrial and building materials
          </p>
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brands.map((brand, index) => (
            <Link href={brand.link} key={brand.id}>
              <div className="group relative bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:border-blue-300/50">
                {/* Gradient Background Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative">
                  {/* Brand Logo */}
                  <div className="w-full h-32 mb-6 relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200">
                    <img
                      src={brand.logo}
                      alt={`${brand.name} products`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Brand Info */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {brand.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {brand.description}
                    </p>
                    
                    {/* View Products Button */}
                    <div className="inline-flex items-center text-blue-600 font-semibold text-sm group-hover:text-blue-700 transition-colors duration-300">
                      View Products
                      <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-15 transition-opacity duration-700"></div>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Link href="/products">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg px-12 py-4 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              View All Products
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BrandCarousel;
