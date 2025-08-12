'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

const OrderConfirmationPage: React.FC = () => {
  const [orderRef, setOrderRef] = useState('');

  useEffect(() => {
    // Generate order reference on client side to avoid hydration mismatch
    setOrderRef(Math.random().toString(36).substr(2, 9).toUpperCase());
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Order Submitted Successfully!
          </h1>
          
          <p className="text-lg text-gray-600 mb-6">
            Thank you for your order. We've received your request and our team will review it shortly.
          </p>

          {/* Order Details */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8 text-left">
            <h2 className="text-lg font-semibold text-blue-900 mb-4">What happens next?</h2>
            <ul className="space-y-3 text-blue-800">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Our team will review your order within <strong>2-4 hours</strong></span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.82 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>You'll receive a <strong>confirmation email</strong> with order details</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Our sales team will <strong>contact you</strong> to finalize the order</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span>We'll arrange <strong>delivery</strong> based on your requirements</span>
              </li>
            </ul>
          </div>

          {/* Reference Number */}
          <div className="bg-gray-50 rounded-lg p-4 mb-8">
            <p className="text-sm text-gray-600 mb-1">Order Reference</p>
            <p className="text-lg font-mono font-semibold text-gray-900">
              #{orderRef || 'LOADING...'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Save this reference number for future communication
            </p>
          </div>

          {/* Contact Information */}
          <div className="border border-gray-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <strong>Phone:</strong> <a href="tel:+971509742788" className="text-blue-600 hover:underline">(+971) 509742788</a>
              </p>
              <p>
                <strong>Email:</strong> <a href="mailto:sales@frazerbmt.com" className="text-blue-600 hover:underline">sales@frazerbmt.com</a>
              </p>
              <p>
                <strong>Business Hours:</strong> Mon-Fri 8:00 AM - 6:00 PM, Sat 8:00 AM - 4:00 PM
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link href="/products" className="block">
              <Button size="lg" className="w-full">
                Continue Shopping
              </Button>
            </Link>
            
            <Link href="/" className="block">
              <Button variant="outline" size="lg" className="w-full">
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Additional Information */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              This is a confirmation of your order submission. Final pricing, delivery terms, and payment details will be confirmed by our sales team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
