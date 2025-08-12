import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-gray-900 border-t border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-4 mb-8">
              <div className="bg-white p-3 rounded-lg shadow-md border border-gray-200">
                <img 
                  src="/frazer-logo.png" 
                  alt="Frazer BMT Logo" 
                  className="h-16 w-auto"
                />
              </div>
            </div>
            <p className="text-gray-600 mb-8 max-w-lg leading-relaxed">
              Building Material Trading (SPS) LLC - Your trusted partner for premium 
              industrial and building materials in the UAE. We are committed to providing 
              the best products to our clients with exceptional service and quality.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="text-gray-900 font-medium">Shop # 3, AL Rawdah Ajman Industrial Area, UAE</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-green-600 rounded flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <a href="tel:+971509742788" className="text-gray-900 font-medium hover:text-blue-600 transition-colors">
                    (+971) 509742788
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-red-600 rounded flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <a href="mailto:sales@frazerbmt.com" className="text-gray-900 font-medium hover:text-blue-600 transition-colors">
                    sales@frazerbmt.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-6">Product Categories</h4>
            <ul className="space-y-3">
              {[
                { name: 'HVAC Products', link: '/products?category=hvac' },
                { name: 'Valves', link: '/products?category=valves' },
                { name: 'Electrical Equipment', link: '/products?category=electrical' },
                { name: 'Plumbing & Fittings', link: '/products?category=plumbing' },
                { name: 'Adhesives & Lubricants', link: '/products?category=adhesives' },
                { name: 'Pump Spare Parts', link: '/products?category=pumps' },
                { name: 'Welding Accessories', link: '/products?category=welding' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.link} className="text-gray-600 hover:text-gray-900 transition-colors duration-200 flex items-center group">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3 group-hover:scale-125 transition-transform duration-200"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links & Business Hours */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-6">Quick Links</h4>
            <ul className="space-y-3 mb-8">
              {[
                { name: 'About Us', link: '/about' },
                { name: 'Contact Us', link: '/contact' },
                { name: 'All Products', link: '/products' },
                { name: 'Login', link: '/auth/login' },
                { name: 'Register', link: '/auth/register' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.link} className="text-gray-600 hover:text-gray-900 transition-colors duration-200 flex items-center group">
                    <span className="w-1.5 h-1.5 bg-green-600 rounded-full mr-3 group-hover:scale-125 transition-transform duration-200"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Business Hours */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h5 className="text-sm font-semibold text-gray-900 mb-3">Business Hours</h5>
              <div className="text-sm text-gray-600 space-y-1">
                <div className="flex justify-between">
                  <span>Mon - Fri:</span>
                  <span className="text-gray-900 font-medium">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="text-gray-900 font-medium">8:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="text-red-600 font-medium">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trusted Brands */}
        <div className="border-t border-gray-200 mt-12 pt-12">
          <h4 className="text-xl font-semibold text-center text-gray-900 mb-8">
            Trusted Global Brands
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {[
              'ABB', 'FGV', 'Kitz', 'WALTHER-WERKE',
              'nVent Hoffman', 'Cepex', 'Raktherm', 'Grundfos'
            ].map((brand) => (
              <div key={brand} className="text-center">
                <div className="bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300 rounded-lg p-4 transition-all duration-200 hover:scale-105 shadow-sm">
                  <div className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200">
                    {brand}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Features */}
        <div className="border-t border-gray-200 mt-12 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v0M3 7l9 6 9-6" />
                  </svg>
                ),
                title: 'Fast, Free Shipping',
                description: 'On orders over $50',
                color: 'bg-blue-600'
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0l-2 9a2 2 0 002 2h8a2 2 0 002-2l-2-9m-6 0V7" />
                  </svg>
                ),
                title: 'Next Day Delivery',
                description: 'Free on orders over $99',
                color: 'bg-green-600'
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                ),
                title: 'Best Price Guarantee',
                description: 'Competitive pricing',
                color: 'bg-purple-600'
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Quality Guarantee',
                description: 'Certified products',
                color: 'bg-red-600'
              }
            ].map((feature) => (
              <div key={feature.title} className="text-center">
                <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  {feature.icon}
                </div>
                <h5 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h5>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-12 pt-8 text-center">
          <p className="text-gray-600 text-sm mb-2">
            Copyright © {new Date().getFullYear()} Frazer Building Material Trading (SPS) LLC. All Rights Reserved.
          </p>
          <p className="text-gray-500 text-xs">
            Premium Industrial & Building Materials | United Arab Emirates
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
