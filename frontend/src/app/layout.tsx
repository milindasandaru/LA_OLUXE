import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ADORA - Buy & Sell Online",
  description: "Find great deals and sell your items on ADORA classified ads platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-8">
                <div className="text-2xl font-bold text-blue-600">ADORA</div>
                <nav className="hidden md:flex space-x-6">
                  <a href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                    Home
                  </a>
                  <a href="/ads" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                    Browse Ads
                  </a>
                  <a href="/post-ad" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                    Post Ad
                  </a>
                </nav>
              </div>
              <div className="flex items-center space-x-4">
                <a href="/login" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  Login
                </a>
                <a href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </header>
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="text-xl font-bold mb-4">ADORA</div>
                <p className="text-gray-300 text-sm">
                  Your trusted platform for buying and selling online. Find great deals and connect with local sellers.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/ads" className="text-gray-300 hover:text-white">Browse Ads</a></li>
                  <li><a href="/post-ad" className="text-gray-300 hover:text-white">Post Ad</a></li>
                  <li><a href="/login" className="text-gray-300 hover:text-white">Login</a></li>
                  <li><a href="/register" className="text-gray-300 hover:text-white">Register</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Categories</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/ads?category=electronics" className="text-gray-300 hover:text-white">Electronics</a></li>
                  <li><a href="/ads?category=vehicles" className="text-gray-300 hover:text-white">Vehicles</a></li>
                  <li><a href="/ads?category=property" className="text-gray-300 hover:text-white">Property</a></li>
                  <li><a href="/ads?category=jobs" className="text-gray-300 hover:text-white">Jobs</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Contact</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>Email: info@adora.lk</li>
                  <li>Phone: +94 11 123 4567</li>
                  <li>Address: Colombo, Sri Lanka</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
              <p>&copy; 2025 ADORA. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
