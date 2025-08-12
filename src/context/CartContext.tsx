'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { Product, CartItem, CartContextType } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useLocalStorage<CartItem[]>('shopping-cart', []);

  const addToCart = (product: Product) => {
    const newCart = [...cart];
    const existingItemIndex = newCart.findIndex((item) => item._id === product._id || item.id === product.id);
    
    if (existingItemIndex >= 0) {
      newCart[existingItemIndex] = {
        ...newCart[existingItemIndex],
        quantity: newCart[existingItemIndex].quantity + 1
      };
    } else {
      newCart.push({ ...product, quantity: 1 });
    }
    
    setCart(newCart);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const newCart = cart.map((item) =>
      (item._id === productId || item.id === productId)
        ? { ...item, quantity }
        : item
    );
    setCart(newCart);
  };

  const removeFromCart = (productId: string) => {
    const newCart = cart.filter((item) => item._id !== productId && item.id !== productId);
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const value: CartContextType = {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice,
    getTotalItems,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
