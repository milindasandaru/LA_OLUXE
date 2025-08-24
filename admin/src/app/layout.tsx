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
  title: "ADORA Admin Panel",
  description: "Admin panel for managing ADORA classified ads platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
      >
        <div className="min-h-screen flex">
          {/* Sidebar */}
          <aside className="w-64 bg-gray-800 text-white">
            <div className="p-6">
              <div className="text-xl font-bold text-blue-400">ADORA Admin</div>
            </div>
            <nav className="mt-6">
              <div className="px-6 py-2">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Main
                </div>
              </div>
              <ul className="space-y-1 px-3">
                <li>
                  <a
                    href="/dashboard"
                    className="bg-gray-700 text-white group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                  >
                    <span className="mr-3">📊</span>
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="/users"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                  >
                    <span className="mr-3">👥</span>
                    Users
                  </a>
                </li>
                <li>
                  <a
                    href="/ads"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                  >
                    <span className="mr-3">📝</span>
                    Advertisements
                  </a>
                </li>
                <li>
                  <a
                    href="/categories"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                  >
                    <span className="mr-3">🏷️</span>
                    Categories
                  </a>
                </li>
              </ul>
              <div className="px-6 py-2 mt-6">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  System
                </div>
              </div>
              <ul className="space-y-1 px-3">
                <li>
                  <a
                    href="/auth"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                  >
                    <span className="mr-3">🔐</span>
                    Authentication
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                  >
                    <span className="mr-3">⚙️</span>
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                  >
                    <span className="mr-3">🚪</span>
                    Logout
                  </a>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Top Navigation */}
            <header className="bg-white shadow-sm border-b">
              <div className="px-6 py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl font-semibold text-gray-800">Admin Panel</h1>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <button className="bg-gray-100 p-2 rounded-full text-gray-600 hover:text-gray-800">
                        <span className="text-lg">🔔</span>
                      </button>
                      <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        3
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                        A
                      </div>
                      <span className="text-gray-700 font-medium">Admin User</span>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {/* Page Content */}
            <main className="flex-1 p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
