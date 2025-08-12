'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on mount
    const token = localStorage.getItem('auth-token');
    if (token) {
      // Verify token and get user data
      fetch('/api/auth/verify', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUser(data.user);
        } else {
          localStorage.removeItem('auth-token');
        }
      })
      .catch(() => {
        localStorage.removeItem('auth-token');
      })
      .finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    if (data.success) {
      localStorage.setItem('auth-token', data.token);
      setUser(data.user);
    } else {
      throw new Error(data.error || 'Login failed');
    }
  };

  const register = async (email: string, password: string, role: string = 'user') => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, role }),
    });

    const data = await response.json();
    
    if (data.success) {
      localStorage.setItem('auth-token', data.token);
      setUser(data.user);
    } else {
      throw new Error(data.error || 'Registration failed');
    }
  };

  const sendOtp = async (contact: string, type: 'email' | 'phone') => {
    const response = await fetch('/api/auth/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contact, type }),
    });

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to send OTP');
    }
  };

  const verifyOtp = async (contact: string, otp: string, type: 'email' | 'phone') => {
    const response = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contact, otp, type }),
    });

    const data = await response.json();
    
    if (data.success) {
      localStorage.setItem('auth-token', data.token);
      setUser(data.user);
    } else {
      throw new Error(data.error || 'OTP verification failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('auth-token');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    sendOtp,
    verifyOtp,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
