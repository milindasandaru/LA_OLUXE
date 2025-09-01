"use client";

import MainLayout from '@/components/layout/MainLayout';
import { useRef, useState, useEffect } from 'react';

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState('Select Category');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const dropdownCategories = [
    { name: 'Select Category', value: '' },
    { name: 'Vehicles', value: 'vehicles', icon: '🚗' },
    { name: 'Property', value: 'property', icon: '🏠' },
    { name: 'Electronics', value: 'electronics', icon: '📱' },
    { name: 'Mobile', value: 'mobile', icon: '📞' },
    { name: 'Jobs', value: 'jobs', icon: '💼' },
    { name: 'Services', value: 'services', icon: '🔧' },
  ];

  const categories = [
    { name: "Vehicles", count: 1500, color: "bg-red-500", icon: "🚗" },
    { name: "Property", count: 500, color: "bg-orange-500", icon: "🏠" },
    { name: "Electronics", count: 2300, color: "bg-green-500", icon: "📱" },
    { name: "Mobile", count: 1000, color: "bg-blue-500", icon: "📱" },
    { name: "Vehicles", count: 1200, color: "bg-purple-500", icon: "🚗" },
    { name: "Vehicles", count: 1500, color: "bg-yellow-500", icon: "🚗" },
    { name: "Vehicles", count: 1500, color: "bg-pink-500", icon: "🚗" },
    { name: "Vehicles", count: 1600, color: "bg-indigo-500", icon: "🚗" },
    { name: "Vehicles", count: 1700, color: "bg-teal-500", icon: "🚗" },
    { name: "Vehicles", count: 1100, color: "bg-orange-600", icon: "🚗" },
  ];

  const sampleAds = [
    { id: 1, title: "Toyota Corolla 2018", price: "Rs. 3,500,000", image: "", isFavorite: false },
    { id: 2, title: "Honda Civic 2019", price: "Rs. 4,200,000", image: "", isFavorite: false },
    { id: 3, title: "Suzuki Alto 2020", price: "Rs. 1,850,000", image: "", isFavorite: true },
    { id: 4, title: "Nissan Leaf 2021", price: "Rs. 5,200,000", image: "", isFavorite: false },
    { id: 5, title: "BMW X3 2019", price: "Rs. 8,500,000", image: "", isFavorite: false },
  ];

  const propertyAds = [
    { id: 11, title: "3BR House in Colombo", price: "Rs. 25,000,000", image: "", isFavorite: false },
    { id: 12, title: "2BR Apartment Kandy", price: "Rs. 12,000,000", image: "", isFavorite: true },
    { id: 13, title: "Land in Galle", price: "Rs. 8,500,000", image: "", isFavorite: false },
    { id: 14, title: "Office Space Negombo", price: "Rs. 15,000,000", image: "", isFavorite: false },
    { id: 15, title: "Villa in Panadura", price: "Rs. 35,000,000", image: "", isFavorite: false },
  ];

  return (
    <MainLayout showSidebar={false} showFooter={true}>
      <div className="min-h-screen">
        {/* Hero Section with Quote and Search */}
        <section 
          className="py-16 lg:py-20"
          style={{ 
            background: 'linear-gradient(to bottom, var(--bg-base), var(--surface-muted))'
          }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Hero Quote */}
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2"
              style={{ color: 'var(--text-primary)' }}
            >
              The Largest Market Place in
            </h1>
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              style={{ color: 'var(--brand-color)' }}
            >
              Sri Lanka
            </h2>
            <p 
              className="text-xl lg:text-2xl mb-16 max-w-2xl mx-auto"
              style={{ color: 'var(--text-secondary)' }}
            >
              Buy and Sell anything, anywhere, anytime
            </p>

            {/* Search Section */}
            <div className="w-full max-w-4xl mx-auto">
              <div 
                className="flex flex-col sm:flex-row gap-3 rounded-[2rem] p-3 shadow-lg hover:shadow-xl transition-shadow"
                style={{ 
                  backgroundColor: 'var(--bg-elevated)'
                }}
              >
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="flex-1 px-6 py-4 rounded-3xl border-0 focus:outline-none placeholder-gray-400"
                  style={{ 
                    backgroundColor: 'var(--surface-input)',
                    color: 'var(--text-primary)'
                  }}
                />
                
                {/* Custom Glass UI Dropdown */}
                <div ref={dropdownRef} className="relative sm:min-w-[220px]">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full pl-6 pr-3 py-4 rounded-3xl border-0 focus:outline-none flex items-center justify-between glass-dropdown"
                    style={{ 
                      backgroundColor: 'var(--surface-input)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      {dropdownCategories.find(cat => cat.name === selectedCategory)?.icon && (
                        <span className="text-sm">
                          {dropdownCategories.find(cat => cat.name === selectedCategory)?.icon}
                        </span>
                      )}
                      <span className="text-sm">{selectedCategory}</span>
                    </div>
                    <svg 
                      className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Glass UI Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 glass-dropdown-menu rounded-2xl overflow-hidden shadow-2xl z-50 min-w-[220px]">
                      <div className="py-2">
                        {dropdownCategories.map((category, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setSelectedCategory(category.name);
                              setIsDropdownOpen(false);
                            }}
                            className="w-full px-6 py-3 text-left hover:bg-white/20 transition-all duration-200 flex items-center space-x-3 group"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            {category.icon && (
                              <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                                {category.icon}
                              </span>
                            )}
                            <span className="text-sm font-medium">{category.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <button className="bg-green-500 text-white p-4 rounded-full hover:bg-green-600 transition-all duration-200 flex items-center justify-center font-medium shadow-md hover:shadow-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section - Horizontal/Vertical Responsive */}
        <section className="bg-white py-8 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">            
            {/* Categories - Horizontal on large screens, vertical grid on mobile */}
            <div className="relative lg:flex lg:justify-center lg:items-center">
              {/* Left Arrow */}
              <button 
                onClick={scrollLeft}
                className="hidden lg:flex absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg items-center justify-center hover:shadow-xl transition-all duration-200 border border-gray-200 hover:border-gray-300"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Scrollable Categories Container */}
              <div 
                ref={scrollRef}
                className="lg:flex lg:justify-start lg:items-center lg:overflow-x-auto lg:scrollbar-hide lg:mx-12"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                <div 
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:flex lg:space-x-8 gap-4 lg:gap-0"
                  style={{
                    WebkitOverflowScrolling: 'touch',
                  }}
                >
                  {categories.map((category, index) => (
                    <div 
                      key={index} 
                      className="flex flex-col lg:flex-col items-center text-center cursor-pointer group hover:transform hover:scale-105 transition-all duration-200 p-4 rounded-2xl hover:bg-gray-50 lg:flex-shrink-0"
                    >
                      <div className={`w-16 h-16 lg:w-18 lg:h-18 ${category.color} rounded-full flex items-center justify-center mb-3 shadow-md group-hover:shadow-lg transition-all duration-200`}>
                        <span className="text-2xl">{category.icon}</span>
                      </div>
                      <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-1 whitespace-nowrap">
                        {category.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        ({category.count.toLocaleString()})
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Arrow */}
              <button 
                onClick={scrollRight}
                className="hidden lg:flex absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg items-center justify-center hover:shadow-xl transition-all duration-200 border border-gray-200 hover:border-gray-300"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Popular Categories with Ads */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Vehicles Section */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center">
                  🚗 Vehicles
                  <span className="ml-3 text-lg text-gray-500 font-normal">({sampleAds.length * 250} ads)</span>
                </h2>
                <button className="text-green-500 hover:text-green-600 font-semibold flex items-center transition-colors">
                  View All
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              {/* Responsive Ad Grid */}
              <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-3 lg:gap-4">
                {sampleAds.map((ad) => (
                  <div key={ad.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden group hover:shadow-xl hover:border-orange-200 transition-all duration-300 hover:-translate-y-1">
                    {/* Ad Image Placeholder */}
                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
                      <button 
                        className={`absolute top-2 right-2 p-1.5 rounded-full ${ad.isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-400'} hover:bg-red-500 hover:text-white transition-all duration-200 shadow-lg z-10`}
                      >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                      <div className="absolute bottom-2 left-2 px-2 py-1 bg-white/90 rounded-full text-xs font-medium text-gray-700">
                        Featured
                      </div>
                    </div>
                    
                    {/* Ad Info */}
                    <div className="p-3">
                      <h3 className="text-xs lg:text-sm font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-orange-600 transition-colors">
                        {ad.title}
                      </h3>
                      <p className="text-sm font-bold text-gray-900 mb-1">{ad.price}</p>
                      <p className="text-xs text-gray-500 mb-2">Colombo, Sri Lanka</p>
                      <div className="flex items-center text-xs text-gray-400">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        2 hours ago
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Property Section */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center">
                  🏠 Property
                  <span className="ml-3 text-lg text-gray-500 font-normal">({propertyAds.length * 150} ads)</span>
                </h2>
                <button className="text-green-500 hover:text-green-600 font-semibold flex items-center transition-colors">
                  View All
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              {/* Responsive Ad Grid */}
              <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-3 lg:gap-4">
                {propertyAds.map((ad) => (
                  <div key={ad.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden group hover:shadow-xl hover:border-orange-200 transition-all duration-300 hover:-translate-y-1">
                    {/* Ad Image Placeholder */}
                    <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-200 relative overflow-hidden">
                      <div className="absolute inset-0 bg-blue-300 animate-pulse"></div>
                      <button 
                        className={`absolute top-3 right-3 p-2 rounded-full ${ad.isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-400'} hover:bg-red-500 hover:text-white transition-all duration-200 shadow-lg z-10`}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                      <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-white/90 rounded-full text-xs font-medium text-gray-700">
                        New
                      </div>
                    </div>
                    
                    {/* Ad Info */}
                    <div className="p-4">
                      <h3 className="text-sm lg:text-base font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                        {ad.title}
                      </h3>
                      <p className="text-lg font-bold text-gray-900 mb-1">{ad.price}</p>
                      <p className="text-xs text-gray-500 mb-3">Kandy, Sri Lanka</p>
                      <div className="flex items-center text-xs text-gray-400">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        5 hours ago
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}