'use client';

import Link from 'next/link';
import { useState } from 'react';
import ThemeToggle from '@/components/ui/ThemeToggle';

interface HeaderProps {
  showSidebar?: boolean;
  onToggleSidebar?: () => void;
}

export default function Header({ showSidebar = false, onToggleSidebar }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-orange-500">ADORA</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Register */}
            <Link
              href="/register"
              className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              Register
            </Link>

            {/* Login */}
            <Link
              href="/login"
              className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              Login
            </Link>

            {/* Favorites/Saved Ads - Heart Icon */}
            <Link
              href="/favorites"
              className="text-gray-700 hover:text-red-500 transition-colors p-3 rounded-full hover:bg-gray-100"
              title="Saved Ads"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </Link>

            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Post Ad Button */}
            <Link
              href="/post-ad"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-full text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
            >
              AD Post
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Post Ad Button - Mobile */}
            <Link
              href="/post-ad"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 shadow-md"
            >
              Post
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-3 text-gray-700 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
              <Link
                href="/register"
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Register
              </Link>
              <Link
                href="/login"
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/favorites"
                className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Saved Ads
              </Link>
              <div className="px-4 py-3 flex items-center">
                <span className="text-sm text-gray-500 mr-3">Theme:</span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
