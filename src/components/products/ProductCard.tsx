import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  isInCart?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  isInCart = false
}) => {
  const productId = product._id || product.id;
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(productId!);

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(productId!);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="group relative bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden h-full min-h-[420px] sm:min-h-[460px] flex flex-col">
      <div className="relative aspect-w-1 aspect-h-1 w-full overflow-hidden flex-shrink-0">
        <Link href={`/products/${productId}`}>
          <Image
            src={product.image || '/placeholder-image.jpg'}
            alt={product.title}
            width={300}
            height={300}
            className="h-48 sm:h-56 md:h-64 w-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
          />
        </Link>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {product.offer && (
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-2 sm:px-3 py-1 text-xs font-bold rounded-full shadow-lg animate-pulse">
            {product.offer}
          </div>
        )}
        
        {product.brand && (
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white/90 backdrop-blur-sm text-gray-700 px-2 sm:px-3 py-1 text-xs font-semibold rounded-full border border-gray-200/50">
            {product.brand}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute bottom-2 sm:bottom-4 right-2 sm:right-4 w-8 sm:w-10 h-8 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
            inWishlist 
              ? 'bg-red-500 text-white hover:bg-red-600' 
              : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:text-red-500 hover:bg-white'
          } shadow-lg border border-gray-200/50 hover:scale-110`}
        >
          <svg className="w-4 sm:w-5 h-4 sm:h-5" fill={inWishlist ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 sm:w-8 h-6 sm:h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <span className="text-white font-bold text-xs sm:text-sm">Out of Stock</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-3 sm:p-4 md:p-6 flex-1 flex flex-col">
        <Link href={`/products/${productId}`} className="flex-1">
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors duration-300 line-clamp-2 mb-2">
            {product.title}
          </h3>
        </Link>
        <p className="text-xs sm:text-sm text-gray-700 line-clamp-2 leading-relaxed mb-3 sm:mb-4 flex-grow">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <div>
            <p className="text-lg sm:text-xl md:text-2xl font-black bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              {formatPrice(product.price)}
            </p>
            {product.stock > 0 && product.stock <= 10 && (
              <div className="flex items-center mt-1">
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-orange-500 rounded-full mr-1 sm:mr-2 animate-pulse"></div>
                <p className="text-xs font-bold text-orange-700 bg-orange-50 px-2 py-1 rounded-full">
                  Only {product.stock} left!
                </p>
              </div>
            )}
          </div>
          
          <Button
            size="sm"
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0 || isInCart}
            variant={isInCart ? "ghost" : "primary"}
            className={`ml-2 sm:ml-3 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 ${isInCart ? 'bg-green-50 text-green-600 border-green-200 hover:bg-green-100' : ''}`}
          >
            {isInCart ? (
              <div className="flex items-center space-x-1">
                <svg className="w-3 sm:w-4 h-3 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="hidden sm:inline">In Cart</span>
                <span className="sm:hidden">✓</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1">
                <svg className="w-3 sm:w-4 h-3 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="hidden sm:inline">Add to Cart</span>
                <span className="sm:hidden">Add</span>
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
