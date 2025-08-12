'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'India',
    },
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { cart, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  // If user is not logged in and cart is not empty, redirect to login
  React.useEffect(() => {
    if (!user && cart.length > 0) {
      router.push('/auth/login');
    }
  }, [user, cart, router]);

  // Pre-fill user data if available
  React.useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email || '',
        phone: user.phone || '',
      }));
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
    setError('');
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError('');

    try {
      const orderData = {
        userId: user?.id || user?._id,
        items: cart,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (data.success) {
        clearCart();
        setShowConfirmModal(false);
        router.push('/orders/success');
      } else {
        setError(data.error || 'Failed to place order');
      }
    } catch (err) {
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.email) {
      setError('Email is required');
      return;
    }

    setShowConfirmModal(true);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-8">Add some products to your cart to proceed with checkout.</p>
        <Button onClick={() => router.push('/products')}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-6">Order Information</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="your@email.com"
              />
              <Input
                label="Phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+91 98765 43210"
              />
            </div>

            <h3 className="text-lg font-medium mt-6 mb-4">Delivery Address</h3>
            
            <Input
              label="Street Address"
              type="text"
              name="address.street"
              value={formData.address.street}
              onChange={handleInputChange}
              placeholder="123 Main St, Apartment 1"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="City"
                type="text"
                name="address.city"
                value={formData.address.city}
                onChange={handleInputChange}
                placeholder="Mumbai"
              />
              <Input
                label="State"
                type="text"
                name="address.state"
                value={formData.address.state}
                onChange={handleInputChange}
                placeholder="Maharashtra"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="ZIP Code"
                type="text"
                name="address.zipCode"
                value={formData.address.zipCode}
                onChange={handleInputChange}
                placeholder="400001"
              />
              <Input
                label="Country"
                type="text"
                name="address.country"
                value={formData.address.country}
                onChange={handleInputChange}
                placeholder="India"
              />
            </div>

            <Button type="submit" className="w-full mt-6" size="lg">
              Place Order
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
          
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item._id || item.id} className="flex items-center space-x-4">
                <img
                  src={item.image || '/placeholder-image.jpg'}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-gray-600">
                    Qty: {item.quantity} × {formatPrice(item.price)}
                  </p>
                </div>
                <div className="font-medium">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span>{formatPrice(getTotalPrice())}</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">Order Process</h3>
            <p className="text-sm text-blue-700">
              After placing your order, you will receive a confirmation email. 
              Our team will contact you within a few hours to confirm the order details.
            </p>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Confirm Your Order"
      >
        <div className="space-y-4">
          <p>Are you sure you want to place this order?</p>
          <div className="bg-gray-50 p-4 rounded">
            <div className="text-sm space-y-1">
              <div><strong>Email:</strong> {formData.email}</div>
              {formData.phone && <div><strong>Phone:</strong> {formData.phone}</div>}
              <div><strong>Total:</strong> {formatPrice(getTotalPrice())}</div>
            </div>
          </div>
          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={() => setShowConfirmModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePlaceOrder}
              isLoading={loading}
              className="flex-1"
            >
              Confirm Order
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
