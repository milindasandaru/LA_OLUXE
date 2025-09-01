import MainLayout from '@/components/layout/MainLayout';

export default function Home() {
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
    { id: 1, title: "Sample Ad 1", price: "Rs. 50,000", image: "", isFavorite: false },
    { id: 2, title: "Sample Ad 2", price: "Rs. 25,000", image: "", isFavorite: false },
    { id: 3, title: "Sample Ad 3", price: "Rs. 75,000", image: "", isFavorite: true },
    { id: 4, title: "Sample Ad 4", price: "Rs. 30,000", image: "", isFavorite: false },
    { id: 5, title: "Sample Ad 5", price: "Rs. 85,000", image: "", isFavorite: false },
    { id: 6, title: "Sample Ad 6", price: "Rs. 15,000", image: "", isFavorite: false },
  ];

  return (
    <MainLayout showSidebar={false} showFooter={true}>
      <div className="min-h-screen">
        {/* Hero Section with Quote and Search */}
        <section className="bg-gradient-to-b from-white to-gray-50 py-16 lg:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Hero Quote */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-2">
              The Largest Market Place in
            </h1>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-orange-500 mb-6">
              Sri Lanka
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 mb-16 max-w-2xl mx-auto">
              Buy and Sell anything, anywhere, anytime
            </p>

            {/* Search Section */}
            <div className="w-full max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3 bg-white rounded-2xl border border-gray-200 p-3 shadow-lg hover:shadow-xl transition-shadow">
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="flex-1 px-6 py-4 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-700 placeholder-gray-400 bg-gray-50"
                />
                <select className="px-6 py-4 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-700 bg-gray-50 sm:min-w-[180px]">
                  <option>Select Category</option>
                  <option>Vehicles</option>
                  <option>Property</option>
                  <option>Electronics</option>
                  <option>Mobile</option>
                  <option>Jobs</option>
                  <option>Services</option>
                </select>
                <button className="bg-orange-500 text-white px-8 py-4 rounded-xl hover:bg-orange-600 transition-all duration-200 flex items-center justify-center font-medium shadow-md hover:shadow-lg">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="hidden sm:inline">Search</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section - Responsive Grid */}
        <section className="bg-white py-12 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Browse Categories</h2>
              <p className="text-gray-600">Find what you're looking for</p>
            </div>
            
            {/* Categories Grid - Full Width Responsive */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10 gap-4 lg:gap-6">
              {categories.map((category, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center text-center cursor-pointer group hover:transform hover:scale-105 transition-all duration-200 p-4 rounded-xl hover:bg-gray-50"
                >
                  <div className={`w-16 h-16 lg:w-20 lg:h-20 ${category.color} rounded-2xl flex items-center justify-center mb-3 shadow-md group-hover:shadow-lg transition-all duration-200`}>
                    <span className="text-2xl lg:text-3xl">{category.icon}</span>
                  </div>
                  <h3 className="text-sm lg:text-base font-medium text-gray-900 mb-1 line-clamp-1">
                    {category.name}
                  </h3>
                  <p className="text-xs lg:text-sm text-gray-500">
                    ({category.count.toLocaleString()})
                  </p>
                </div>
              ))}
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
                <button className="text-orange-500 hover:text-orange-600 font-semibold flex items-center transition-colors">
                  View All
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              {/* Responsive Ad Grid */}
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 lg:gap-6">
                {sampleAds.map((ad) => (
                  <div key={ad.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden group hover:shadow-xl hover:border-orange-200 transition-all duration-300 hover:-translate-y-1">
                    {/* Ad Image Placeholder */}
                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
                      <button 
                        className={`absolute top-3 right-3 p-2 rounded-full ${ad.isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-400'} hover:bg-red-500 hover:text-white transition-all duration-200 shadow-lg z-10`}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                      <div className="absolute bottom-3 left-3 px-2 py-1 bg-white/90 rounded-lg text-xs font-medium text-gray-700">
                        Featured
                      </div>
                    </div>
                    
                    {/* Ad Info */}
                    <div className="p-4">
                      <h3 className="text-sm lg:text-base font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                        {ad.title}
                      </h3>
                      <p className="text-lg font-bold text-gray-900 mb-1">{ad.price}</p>
                      <p className="text-xs text-gray-500 mb-3">Colombo, Sri Lanka</p>
                      <div className="flex items-center text-xs text-gray-400">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  <span className="ml-3 text-lg text-gray-500 font-normal">({sampleAds.length * 150} ads)</span>
                </h2>
                <button className="text-orange-500 hover:text-orange-600 font-semibold flex items-center transition-colors">
                  View All
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              {/* Responsive Ad Grid */}
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 lg:gap-6">
                {sampleAds.map((ad) => (
                  <div key={`property-${ad.id}`} className="bg-white rounded-xl border border-gray-200 overflow-hidden group hover:shadow-xl hover:border-orange-200 transition-all duration-300 hover:-translate-y-1">
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
                      <div className="absolute bottom-3 left-3 px-2 py-1 bg-white/90 rounded-lg text-xs font-medium text-gray-700">
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
