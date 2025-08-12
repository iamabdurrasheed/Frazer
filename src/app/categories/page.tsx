'use client';

import React from 'react';
import Link from 'next/link';

export default function CategoriesPage() {
  const categories = [
    {
      name: 'HVAC Products',
      slug: 'hvac',
      description: 'Heating, ventilation, and air conditioning systems for commercial and industrial applications',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 21l4-7 4 7M3 7l18 0M5 21l14 0M6 3h12v4H6z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11v6" />
        </svg>
      ),
      brands: ['ABB', 'Carrier', 'Honeywell'],
      productCount: '150+'
    },
    {
      name: 'Valves',
      slug: 'valves',
      description: 'Premium quality valves including ball valves, gate valves, and check valves',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v3m0 12v3m9-9h-3M3 12h3m15.364-6.364l-2.121 2.121M6.757 17.243l-2.122 2.121m12.728 0l-2.121-2.121M6.757 6.757L4.636 4.636" />
          <circle cx="12" cy="12" r="3" strokeWidth={1.5} />
        </svg>
      ),
      brands: ['FGV', 'Kitz', 'Spirax Sarco'],
      productCount: '200+'
    },
    {
      name: 'Electrical Equipment',
      slug: 'electrical',
      description: 'Industrial electrical components, enclosures, and power distribution systems',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      brands: ['ABB', 'WALTHER-WERKE', 'nVent Hoffman'],
      productCount: '300+'
    },
    {
      name: 'Plumbing & Fittings',
      slug: 'plumbing',
      description: 'Pipes, fittings, flanges, and plumbing accessories for industrial applications',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12h18m-9 4.5V7.5m0 9L7.5 12m4.5 4.5L16.5 12" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 8V6a2 2 0 012-2h8a2 2 0 012 2v2m-4 8v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4" />
        </svg>
      ),
      brands: ['Cepex', 'Georg Fischer', 'Victaulic'],
      productCount: '180+'
    },
    {
      name: 'Adhesives & Lubricants',
      slug: 'adhesives',
      description: 'Industrial adhesives, sealants, and lubricants for maintenance and assembly',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
        </svg>
      ),
      brands: ['3M', 'Loctite', 'Shell'],
      productCount: '120+'
    },
    {
      name: 'Pump Spare Parts',
      slug: 'pumps',
      description: 'Quality pump components, impellers, seals, and maintenance parts',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-6.219-8.56" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 0l3-3m-3 3l3 3" />
        </svg>
      ),
      brands: ['Grundfos', 'KSB', 'Flowserve'],
      productCount: '90+'
    },
    {
      name: 'Welding Accessories',
      slug: 'welding',
      description: 'Professional welding tools, electrodes, and safety equipment',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
        </svg>
      ),
      brands: ['Lincoln', 'ESAB', 'Miller'],
      productCount: '80+'
    },
    {
      name: 'Thermal Management (Raktherm)',
      slug: 'thermal',
      description: 'Heat exchangers, thermal insulation, and temperature control solutions',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      brands: ['Raktherm', 'Danfoss', 'Alfa Laval'],
      productCount: '60+'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Product <span className="text-blue-400">Categories</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Explore our comprehensive range of industrial and building materials
            </p>
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-1 bg-blue-400 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <Link 
              key={category.slug} 
              href={`/products?category=${category.slug}`}
              className="group"
            >
              <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-all duration-300 hover:border-blue-300">
                <div className="flex items-start space-x-6">
                  <div className="text-blue-600 group-hover:text-blue-700 transition-colors">
                    {category.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {category.name}
                      </h3>
                      <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                        {category.productCount}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {category.description}
                    </p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Featured Brands:</h4>
                      <div className="flex flex-wrap gap-2">
                        {category.brands.map((brand) => (
                          <span 
                            key={brand}
                            className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded"
                          >
                            {brand}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                      <span className="text-sm font-medium">Browse Products</span>
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Our extensive inventory includes thousands of products from leading manufacturers. 
            Contact us for specialized requirements or custom quotes.
          </p>
          <div className="space-x-4">
            <Link href="/contact">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
                Contact Us
              </button>
            </Link>
            <Link href="/products">
              <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors">
                View All Products
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
