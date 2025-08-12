'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { Product, WishlistItem, WishlistContextType } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useLocalStorage<WishlistItem[]>('wishlist', []);

  const addToWishlist = (product: Product) => {
    const existingItem = wishlist.find((item) => item._id === product._id || item.id === product.id);
    
    if (!existingItem) {
      setWishlist([...wishlist, { ...product, addedAt: new Date().toISOString() }]);
    }
  };

  const removeFromWishlist = (productId: string) => {
    const newWishlist = wishlist.filter((item) => item._id !== productId && item.id !== productId);
    setWishlist(newWishlist);
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item._id === productId || item.id === productId);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const getWishlistCount = () => {
    return wishlist.length;
  };

  const value: WishlistContextType = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    getWishlistCount,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
