'use client';

import Link from 'next/link';
import ThemeToggle from '@/components/ui/ThemeToggle';

interface HeaderProps {
  showSidebar?: boolean;
  onToggleSidebar?: () => void;
}

export default function Header({ showSidebar = false, onToggleSidebar }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-gray-900">ADORA</span>
            </Link>
          </div>

          {/* Right Side - Actions */}
          <div className="flex items-center space-x-6">
            {/* Post Ad Button */}
            <Link
              href="/post-ad"
              className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
            >
              AD Post
            </Link>

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
              className="text-gray-700 hover:text-red-500 transition-colors"
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
          </div>
        </div>
      </div>
    </header>
  );
}
