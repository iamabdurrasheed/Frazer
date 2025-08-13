'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import Button from '@/components/ui/Button';
import Logo from '@/components/ui/Logo';

const Navigation: React.FC = () => {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const { getWishlistCount } = useWishlist();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-200/20 sticky top-0 z-50 w-full">
        <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between h-20 sm:h-24 md:h-28">
            <div className="flex items-center">
              {/* Logo */}
              <Link href="/" className="flex-shrink-0">
                <Logo size="sm" showText={false} className="sm:hidden" />
                <Logo size="md" showText={false} className="hidden sm:block" />
              </Link>
              
              {/* Desktop Navigation */}
              <div className="hidden md:ml-8 lg:ml-16 md:flex md:space-x-1 lg:space-x-2">
                <Link
                  href="/"
                  className="relative px-3 lg:px-4 py-3 text-sm lg:text-base font-semibold text-gray-700 hover:text-blue-600 transition-all duration-300 group"
                >
                  Home
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </Link>
                <Link
                  href="/products"
                  className="relative px-3 lg:px-4 py-3 text-sm lg:text-base font-semibold text-gray-700 hover:text-blue-600 transition-all duration-300 group"
                >
                  Products
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </Link>
                <Link
                  href="/categories"
                  className="relative px-3 lg:px-4 py-3 text-sm lg:text-base font-semibold text-gray-700 hover:text-blue-600 transition-all duration-300 group"
                >
                  Categories
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </Link>
                <Link
                  href="/about"
                  className="relative px-4 py-3 text-base font-semibold text-gray-700 hover:text-blue-600 transition-all duration-300 group"
                >
                  About Us
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </Link>
                <Link
                  href="/contact"
                  className="relative px-4 py-3 text-base font-semibold text-gray-700 hover:text-blue-600 transition-all duration-300 group"
                >
                  Contact
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </Link>
              </div>
            </div>

            {/* Desktop Right Side */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              {/* Wishlist Button */}
              <Link
                href="/wishlist"
                className="relative p-2 text-gray-600 hover:text-blue-600 transition-all duration-300 group"
              >
                <div className="relative">
                  <svg className="w-6 h-6 transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {getWishlistCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg animate-pulse">
                      {getWishlistCount()}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-blue-600 rounded-full opacity-0 group-hover:opacity-20 transform scale-0 group-hover:scale-100 transition-all duration-300"></div>
                </div>
              </Link>

              {/* Cart Button */}
              <Link
                href="/cart"
                className="relative p-2 text-gray-600 hover:text-blue-600 transition-all duration-300 group"
              >
                <div className="relative">
                  <svg className="w-6 h-6 transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg animate-pulse">
                      {getTotalItems()}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-blue-600 rounded-full opacity-0 group-hover:opacity-20 transform scale-0 group-hover:scale-100 transition-all duration-300"></div>
                </div>
              </Link>

              {/* User Menu */}
              {user ? (
                <div className="relative group">
                  {user.role === 'admin' && (
                    <Link href="/admin" className="mr-3">
                      <Button variant="outline" size="sm" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold transition-all duration-300 transform hover:scale-105">
                        Admin
                      </Button>
                    </Link>
                  )}
                  
                  {/* Account Icon */}
                  <div className="relative p-2 text-gray-600 hover:text-blue-600 transition-all duration-300 group cursor-pointer">
                    <div className="relative">
                      <svg className="w-6 h-6 transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <div className="absolute inset-0 bg-blue-600 rounded-full opacity-0 group-hover:opacity-20 transform scale-0 group-hover:scale-100 transition-all duration-300"></div>
                    </div>
                    
                    {/* Dropdown Menu */}
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                      <div className="p-4 border-b border-gray-100">
                        <p className="text-sm text-gray-500 mb-1">Signed in as</p>
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {user.email || user.phone}
                        </p>
                        {user.role === 'admin' && (
                          <span className="inline-block mt-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                            Administrator
                          </span>
                        )}
                      </div>
                      <div className="p-2">
                        <div
                          onClick={logout}
                          className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors duration-200 flex items-center cursor-pointer"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Sign Out
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link href="/auth/login">
                    <Button variant="ghost" size="sm" className="font-semibold hover:bg-blue-50 hover:text-blue-600 transition-all duration-300">
                      Login
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button size="sm" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-3">
              <Link
                href="/cart"
                className="relative p-3 text-gray-600 hover:text-blue-600 transition-all duration-300 group"
              >
                <div className="relative">
                  <svg className="w-6 h-6 transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg animate-pulse">
                      {getTotalItems()}
                    </span>
                  )}
                </div>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-3 text-gray-600 hover:text-blue-600 transition-all duration-300 group"
              >
                <svg className="w-6 h-6 transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200/30 bg-white/95 backdrop-blur-lg">
            <div className="px-4 pt-4 pb-6 space-y-2">
              <Link
                href="/"
                className="block px-4 py-3 text-base font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="block px-4 py-3 text-base font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/categories"
                className="block px-4 py-3 text-base font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                href="/about"
                className="block px-4 py-3 text-base font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="block px-4 py-3 text-base font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              
              {/* Wishlist Link for Mobile */}
              <Link
                href="/wishlist"
                className="flex items-center px-4 py-3 text-base font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Wishlist
                {getWishlistCount() > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {getWishlistCount()}
                  </span>
                )}
              </Link>
              
              {/* Cart Link for Mobile */}
              <Link
                href="/cart"
                className="flex items-center px-4 py-3 text-base font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Cart
                {getTotalItems() > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Link>
              
              {user ? (
                <>
                  {user.role === 'admin' && (
                    <Link
                      href="/admin"
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;
