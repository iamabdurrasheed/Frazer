export interface User {
  _id?: string;
  id?: string;
  email?: string;
  phone?: string;
  password?: string;
  role: 'user' | 'admin';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Product {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  price: number;
  image?: string;
  offer?: string;
  stock: number;
  category?: string;
  brand?: string;
  featured?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface WishlistItem extends Product {
  addedAt: string;
}

export interface Order {
  _id?: string;
  id?: string;
  userId?: string;
  items: CartItem[];
  email: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, role?: string) => Promise<void>;
  sendOtp: (contact: string, type: 'email' | 'phone') => Promise<void>;
  verifyOtp: (contact: string, otp: string, type: 'email' | 'phone') => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  getWishlistCount: () => number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
