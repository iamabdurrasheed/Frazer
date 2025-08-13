'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import ProductCard from '@/components/products/ProductCard';
import ProductCarousel from '@/components/ProductCarousel';
import BrandCarousel from '@/components/BrandCarousel';
import { useCart } from '@/context/CartContext';
import Button from '@/components/ui/Button';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, cart } = useCart();

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch('/api/products?featured=true&limit=8');
      
      // Check if response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned non-JSON response');
      }
      
      const data = await response.json();
      
      if (data.success) {
        setFeaturedProducts(data.data.products);
      } else {
        console.error('API returned error:', data.error);
      }
    } catch (error) {
      console.error('Error fetching featured products:', error);
      // Set empty array so the UI doesn't break
      setFeaturedProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const isProductInCart = (productId: string) => {
    return cart.some(item => (item._id === productId || item.id === productId));
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen w-full overflow-x-hidden">
      {/* Product Carousel - Right after navigation */}
      <div className="w-full">
        <ProductCarousel />
      </div>

      {/* Featured Products Section */}
      <div className="relative w-full px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="w-full">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent mb-3 sm:mb-4 md:mb-6 px-2">
              Featured Products
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 font-medium mx-auto px-4">
              Discover our premium industrial and building materials
            </p>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto mt-4 sm:mt-6 rounded-full"></div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6 md:gap-8">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gradient-to-br from-gray-200 to-gray-300 h-48 sm:h-56 md:h-64 rounded-2xl mb-4 sm:mb-6 shadow-lg"></div>
                  <div className="h-4 sm:h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mb-2 sm:mb-3"></div>
                  <div className="h-4 sm:h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-3/4"></div>
                </div>
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6 md:gap-8">
              {featuredProducts.map((product) => (
                <div key={product._id || product.id} className="group w-full h-full">
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                    isInCart={isProductInCart(product._id || product.id!)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16 md:py-20 px-4">
              <div className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center">
                <svg className="w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4m16 0l-2-2m2 2l-2 2M4 13l2-2m-2 2l2 2" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg sm:text-xl font-medium">No featured products available</p>
            </div>
          )}

          {featuredProducts.length > 0 && (
            <div className="text-center mt-8 sm:mt-12 md:mt-16 px-4">
              <Link href="/products">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-12 py-3 sm:py-4 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                  View All Products
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="relative bg-gradient-to-br from-gray-50 via-blue-50/40 to-white py-12 sm:py-16 md:py-20 lg:py-24">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-blue-100/30 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-blue-200/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        </div>
        
        <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="w-full">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent mb-3 sm:mb-4 md:mb-6 px-2">
                Why Choose Frazer BMT?
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 font-medium mx-auto leading-relaxed px-4">
                Your trusted partner for industrial and building materials in UAE
              </p>
              <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto mt-4 sm:mt-6 rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="text-center group">
                <div className="relative mb-6 sm:mb-8">
                  <div className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <svg className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div className="absolute inset-0 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-blue-600/20 rounded-2xl sm:rounded-3xl mx-auto blur-xl group-hover:bg-blue-600/40 transition-all duration-300"></div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 px-2">Fast, Free Shipping</h3>
                <p className="text-sm sm:text-base text-gray-600 font-medium px-2">On orders over $50</p>
              </div>
              
              <div className="text-center group">
                <div className="relative mb-6 sm:mb-8">
                  <div className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <svg className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="absolute inset-0 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-blue-600/20 rounded-2xl sm:rounded-3xl mx-auto blur-xl group-hover:bg-blue-600/40 transition-all duration-300"></div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 px-2">Next Day Delivery</h3>
                <p className="text-sm sm:text-base text-gray-600 font-medium px-2">Free on orders over $99</p>
              </div>
              
              <div className="text-center group">
                <div className="relative mb-6 sm:mb-8">
                  <div className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <svg className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div className="absolute inset-0 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-blue-600/20 rounded-2xl sm:rounded-3xl mx-auto blur-xl group-hover:bg-blue-600/40 transition-all duration-300"></div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 px-2">Low Price Guarantee</h3>
                <p className="text-sm sm:text-base text-gray-600 font-medium px-2">Competitive pricing</p>
              </div>
              
              <div className="text-center group">
                <div className="relative mb-6 sm:mb-8">
                  <div className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <svg className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="absolute inset-0 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-blue-600/20 rounded-2xl sm:rounded-3xl mx-auto blur-xl group-hover:bg-blue-600/40 transition-all duration-300"></div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 px-2">Quality Guarantee</h3>
                <p className="text-sm sm:text-base text-gray-600 font-medium px-2">We guarantee our products</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Categories Section */}
      <div className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="w-full">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent mb-3 sm:mb-4 md:mb-6 px-2 leading-relaxed">
                Our Product Categories
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 font-medium mx-auto leading-relaxed px-4">
                Explore our comprehensive range of industrial and building materials
              </p>
              <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto mt-4 sm:mt-6 rounded-full"></div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
              <Link href="/products?category=hvac" className="group h-full w-full max-w-sm flex-1 min-w-[280px] lg:min-w-[300px] xl:min-w-[320px] 2xl:max-w-xs">
                <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-4 sm:p-6 lg:p-8 text-center border border-gray-100/50 backdrop-blur-sm transform hover:-translate-y-3 hover:scale-105 h-full flex flex-col min-h-[200px] sm:min-h-[220px] md:min-h-[240px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex-1 flex flex-col">
                    <div className="w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6 shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex-shrink-0">
                      <svg className="w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 21l4-7 4 7M3 7l18 0M5 21l14 0M6 3h12v4H6z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11v6" />
                      </svg>
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <h3 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 mb-2 lg:mb-3 group-hover:text-blue-600 transition-colors leading-tight px-2">HVAC Products</h3>
                      <p className="text-xs sm:text-sm md:text-base text-gray-600 font-medium leading-relaxed px-2">Heating, ventilation, and air conditioning systems</p>
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/products?category=valves" className="group h-full w-full max-w-sm flex-1 min-w-[280px] lg:min-w-[300px] xl:min-w-[320px] 2xl:max-w-xs">

                <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-4 sm:p-6 lg:p-8 text-center border border-gray-100/50 backdrop-blur-sm transform hover:-translate-y-3 hover:scale-105 h-full flex flex-col min-h-[200px] sm:min-h-[220px] md:min-h-[240px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex-1 flex flex-col">
                    <div className="w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6 shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex-shrink-0">
                      <svg className="w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v3m0 12v3m9-9h-3M3 12h3m15.364-6.364l-2.121 2.121M6.757 17.243l-2.122 2.121m12.728 0l-2.121-2.121M6.757 6.757L4.636 4.636" />
                        <circle cx="12" cy="12" r="3" strokeWidth={1.5} />
                      </svg>
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <h3 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 mb-2 lg:mb-3 group-hover:text-blue-600 transition-colors leading-tight px-2">Valves</h3>
                      <p className="text-xs sm:text-sm md:text-base text-gray-600 font-medium leading-relaxed px-2">FGV, Kitz, and other premium valve brands</p>
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/products?category=electrical" className="group h-full w-full max-w-sm flex-1 min-w-[280px] lg:min-w-[300px] xl:min-w-[320px] 2xl:max-w-xs">
                <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-4 sm:p-6 lg:p-8 text-center border border-gray-100/50 backdrop-blur-sm transform hover:-translate-y-3 hover:scale-105 h-full flex flex-col min-h-[200px] sm:min-h-[220px] md:min-h-[240px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex-1 flex flex-col">
                    <div className="w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6 shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex-shrink-0">
                      <svg className="w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <h3 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 mb-2 lg:mb-3 group-hover:text-blue-600 transition-colors leading-tight px-2">Electrical</h3>
                      <p className="text-xs sm:text-sm md:text-base text-gray-600 font-medium leading-relaxed px-2">ABB, WALTHER-WERKE, nVent Hoffman</p>
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/products?category=plumbing" className="group h-full w-full max-w-sm flex-1 min-w-[280px] lg:min-w-[300px] xl:min-w-[320px] 2xl:max-w-xs">

                <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-4 sm:p-6 lg:p-8 text-center border border-gray-100/50 backdrop-blur-sm transform hover:-translate-y-3 hover:scale-105 h-full flex flex-col min-h-[200px] sm:min-h-[220px] md:min-h-[240px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex-1 flex flex-col">
                    <div className="w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6 shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex-shrink-0">
                      <svg className="w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12h18m-9 4.5V7.5m0 9L7.5 12m4.5 4.5L16.5 12" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 8V6a2 2 0 012-2h8a2 2 0 012 2v2m-4 8v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4" />
                      </svg>
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <h3 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 mb-2 lg:mb-3 group-hover:text-blue-600 transition-colors leading-tight px-2">Plumbing & Fittings</h3>
                      <p className="text-xs sm:text-sm md:text-base text-gray-600 font-medium leading-relaxed px-2">Pipes, fittings, and plumbing accessories</p>
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/products?category=adhesives" className="group h-full w-full max-w-sm flex-1 min-w-[280px] lg:min-w-[300px] xl:min-w-[320px] 2xl:max-w-xs">
                <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-4 sm:p-6 lg:p-8 text-center border border-gray-100/50 backdrop-blur-sm transform hover:-translate-y-3 hover:scale-105 h-full flex flex-col min-h-[200px] sm:min-h-[220px] md:min-h-[240px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex-1 flex flex-col">
                    <div className="w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6 shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex-shrink-0">
                      <svg className="w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                      </svg>
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <h3 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 mb-2 lg:mb-3 group-hover:text-blue-600 transition-colors leading-tight px-2">Adhesives & Lubricants</h3>
                      <p className="text-xs sm:text-sm md:text-base text-gray-600 font-medium leading-relaxed px-2">Industrial adhesives and lubricants</p>
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/products?category=pumps" className="group h-full w-full max-w-sm flex-1 min-w-[280px] lg:min-w-[300px] xl:min-w-[320px] 2xl:max-w-xs">
                <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-4 sm:p-6 lg:p-8 text-center border border-gray-100/50 backdrop-blur-sm transform hover:-translate-y-3 hover:scale-105 h-full flex flex-col min-h-[200px] sm:min-h-[220px] md:min-h-[240px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex-1 flex flex-col">
                    <div className="w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6 shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex-shrink-0">
                      <svg className="w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-6.219-8.56" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 0l3-3m-3 3l3 3" />
                      </svg>
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <h3 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 mb-2 lg:mb-3 group-hover:text-blue-600 transition-colors leading-tight px-2">Pump Spare Parts</h3>
                      <p className="text-xs sm:text-sm md:text-base text-gray-600 font-medium leading-relaxed px-2">Quality pump components and spares</p>
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/products?category=welding" className="group h-full w-full max-w-sm flex-1 min-w-[280px] lg:min-w-[300px] xl:min-w-[320px] 2xl:max-w-xs">

                <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-4 sm:p-6 lg:p-8 text-center border border-gray-100/50 backdrop-blur-sm transform hover:-translate-y-3 hover:scale-105 h-full flex flex-col min-h-[200px] sm:min-h-[220px] md:min-h-[240px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex-1 flex flex-col">
                    <div className="w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6 shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex-shrink-0">
                      <svg className="w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
                      </svg>
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <h3 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 mb-2 lg:mb-3 group-hover:text-blue-600 transition-colors leading-tight px-2">Welding Accessories</h3>
                      <p className="text-xs sm:text-sm md:text-base text-gray-600 font-medium leading-relaxed px-2">Professional welding tools and accessories</p>
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/products?category=thermal" className="group h-full w-full max-w-sm flex-1 min-w-[280px] lg:min-w-[300px] xl:min-w-[320px] 2xl:max-w-xs">
                <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-4 sm:p-6 lg:p-8 text-center border border-gray-100/50 backdrop-blur-sm transform hover:-translate-y-3 hover:scale-105 h-full flex flex-col min-h-[200px] sm:min-h-[220px] md:min-h-[240px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex-1 flex flex-col">
                    <div className="w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6 shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex-shrink-0">
                      <svg className="w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <h3 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 mb-2 lg:mb-3 group-hover:text-blue-600 transition-colors leading-tight px-2">Raktherm</h3>
                      <p className="text-xs sm:text-sm md:text-base text-gray-600 font-medium leading-relaxed px-2">Thermal management solutions</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Brand Carousel Section */}
        <div className="w-full">
          <BrandCarousel />
        </div>
      </div>
    </div>
  );
}
