'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, updateQuantity, cart } = useCart();

  useEffect(() => {
    if (params.id) {
      fetchProduct(params.id as string);
    }
  }, [params.id]);

  const fetchProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`);
      const data = await response.json();
      
      if (data.success) {
        setProduct(data.data);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      // Check if product is already in cart
      const existingItem = cart.find(item => (item._id === product._id || item.id === product.id));
      if (existingItem) {
        // If it exists, update the quantity by adding the selected quantity
        const newQuantity = existingItem.quantity + quantity;
        updateQuantity(product._id || product.id!, newQuantity);
      } else {
        // If it doesn't exist, add with the selected quantity
        for (let i = 0; i < quantity; i++) {
          addToCart(product);
        }
      }
    }
  };

  const isProductInCart = () => {
    if (!product) return false;
    return cart.some(item => (item._id === product._id || item.id === product.id));
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-300 h-96 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-6 bg-gray-300 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="aspect-w-1 aspect-h-1">
          <Image
            src={product.image || '/placeholder-image.jpg'}
            alt={product.title}
            width={600}
            height={600}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
            {product.offer && (
              <div className="mt-2">
                <span className="inline-block bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full">
                  {product.offer}
                </span>
              </div>
            )}
          </div>

          <div>
            <p className="text-3xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Stock Status */}
          <div>
            {product.stock > 0 ? (
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-700 font-semibold bg-green-50 px-3 py-1 rounded-full text-sm">
                  In Stock ({product.stock} available)
                </span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-red-700 font-semibold bg-red-50 px-3 py-1 rounded-full text-sm">Out of Stock</span>
              </div>
            )}
          </div>

          {/* Quantity Selector */}
          {product.stock > 0 && (
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Quantity
              </label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 hover:border-gray-400 transition-colors"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="text-lg font-semibold w-12 text-center bg-gray-50 py-1 rounded border">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 hover:border-gray-400 transition-colors"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <div className="pt-6">
            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0 || isProductInCart()}
              className="w-full sm:w-auto"
              size="lg"
            >
              {product.stock === 0 
                ? 'Out of Stock' 
                : isProductInCart() 
                ? 'In Cart' 
                : 'Add to Cart'
              }
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
