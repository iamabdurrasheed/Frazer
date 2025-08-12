import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function OrderSuccessPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div className="bg-white p-8 rounded-lg shadow">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Order Placed Successfully!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Thank you for your order. We have received your request and our team will contact you 
          within a few hours to confirm the order details and arrange delivery.
        </p>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="font-medium text-blue-900 mb-2">What happens next?</h3>
          <ul className="text-sm text-blue-700 space-y-1 text-left">
            <li>• You will receive a confirmation email shortly</li>
            <li>• Our team will contact you to confirm order details</li>
            <li>• We will arrange delivery within the estimated timeframe</li>
            <li>• You can track your order status through your account</li>
          </ul>
        </div>

        <div className="space-y-4">
          <Link href="/products">
            <Button size="lg" className="w-full sm:w-auto">
              Continue Shopping
            </Button>
          </Link>
          <div>
            <Link href="/" className="text-blue-600 hover:text-blue-500">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
