'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function LoginPage() {
  const [isPasswordLogin, setIsPasswordLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    contact: '',
    otp: '',
  });
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, sendOtp, verifyOtp } = useAuth();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(formData.email, formData.password);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const isEmail = formData.contact.includes('@');
      await sendOtp(formData.contact, isEmail ? 'email' : 'phone');
      setIsOtpSent(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const isEmail = formData.contact.includes('@');
      await verifyOtp(formData.contact, formData.otp, isEmail ? 'email' : 'phone');
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link href="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
              create a new account
            </Link>
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow">
          {/* Login Method Toggle */}
          <div className="flex mb-6">
            <button
              type="button"
              onClick={() => {
                setIsPasswordLogin(true);
                setIsOtpSent(false);
                setError('');
              }}
              className={`flex-1 py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
                isPasswordLogin
                  ? 'border-blue-500 text-blue-600'
                  : 'border-gray-300 text-gray-500 hover:text-gray-700'
              }`}
            >
              Password Login
            </button>
            <button
              type="button"
              onClick={() => {
                setIsPasswordLogin(false);
                setIsOtpSent(false);
                setError('');
              }}
              className={`flex-1 py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
                !isPasswordLogin
                  ? 'border-blue-500 text-blue-600'
                  : 'border-gray-300 text-gray-500 hover:text-gray-700'
              }`}
            >
              OTP Login
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {isPasswordLogin ? (
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email"
              />
              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Enter your password"
              />
              
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link href="/auth/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <Button type="submit" className="w-full" isLoading={loading}>
                Sign In
              </Button>
            </form>
          ) : (
            <form onSubmit={isOtpSent ? handleVerifyOtp : handleSendOtp} className="space-y-4">
              {!isOtpSent ? (
                <>
                  <Input
                    label="Phone or Email"
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your phone number or email"
                  />
                  <Button type="submit" className="w-full" isLoading={loading}>
                    Send OTP
                  </Button>
                </>
              ) : (
                <>
                  <div className="text-sm text-gray-600 mb-4">
                    OTP sent to <strong>{formData.contact}</strong>
                  </div>
                  <Input
                    label="Enter OTP"
                    type="text"
                    name="otp"
                    value={formData.otp}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                  />
                  <div className="flex space-x-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsOtpSent(false)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button type="submit" className="flex-1" isLoading={loading}>
                      Verify OTP
                    </Button>
                  </div>
                </>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
