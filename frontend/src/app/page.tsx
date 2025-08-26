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
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section with Quote and Search */}
        <section className="bg-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Hero Quote */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
              The Largest Market Place in
            </h1>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Sri Lanka
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              Buy and Sell anything
            </p>

            {/* Search Section */}
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 bg-white rounded-full border border-gray-200 p-2 shadow-sm">
                <input
                  type="text"
                  placeholder="Search anything"
                  className="flex-1 px-6 py-3 rounded-full border-0 focus:outline-none focus:ring-0 text-gray-700 placeholder-gray-400"
                />
                <select className="px-6 py-3 rounded-full border-0 focus:outline-none focus:ring-0 text-gray-700 bg-transparent md:border-l border-gray-200">
                  <option>Select Category</option>
                  <option>Vehicles</option>
                  <option>Property</option>
                  <option>Electronics</option>
                  <option>Mobile</option>
                  <option>Jobs</option>
                  <option>Services</option>
                </select>
                <button className="bg-green-500 text-white px-8 py-3 rounded-full hover:bg-green-600 transition-colors flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section - Horizontal Scroll */}
        <section className="bg-white py-6 md:py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center">
              {/* Left Arrow - Hidden on mobile */}
              <button className="hidden md:flex p-2 text-gray-400 hover:text-gray-600 flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {/* Categories Container */}
              <div className="flex-1 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8">
                <div className="flex space-x-4 sm:space-x-6 md:space-x-8 py-4">
                  {categories.map((category, index) => (
                    <div key={index} className="flex-shrink-0 text-center cursor-pointer group min-w-[80px]">
                      <div className={`w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 ${category.color} rounded-full flex items-center justify-center mb-2 mx-auto group-hover:scale-105 transition-transform`}>
                        <span className="text-lg sm:text-xl md:text-2xl text-white">{category.icon}</span>
                      </div>
                      <h3 className="text-xs sm:text-sm font-medium text-gray-900 mb-1 truncate">{category.name}</h3>
                      <p className="text-xs text-gray-500">({category.count})</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Right Arrow - Hidden on mobile */}
              <button className="hidden md:flex p-2 text-gray-400 hover:text-gray-600 flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Popular Categories with Ads */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Vehicles Section */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  Vehicles
                  <svg className="w-5 h-5 ml-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {sampleAds.map((ad) => (
                  <div key={ad.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden group hover:shadow-md transition-shadow">
                    {/* Ad Image Placeholder */}
                    <div className="aspect-square bg-gray-200 relative">
                      <button 
                        className={`absolute top-2 right-2 p-1.5 rounded-full ${ad.isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-400'} hover:bg-red-500 hover:text-white transition-colors shadow-sm`}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                    {/* Ad Info */}
                    <div className="p-3">
                      <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">{ad.title}</h3>
                      <p className="text-sm font-semibold text-gray-900">{ad.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Property Section */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  Property
                  <svg className="w-5 h-5 ml-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {sampleAds.map((ad) => (
                  <div key={`property-${ad.id}`} className="bg-white rounded-lg border border-gray-200 overflow-hidden group hover:shadow-md transition-shadow">
                    {/* Ad Image Placeholder */}
                    <div className="aspect-square bg-gray-200 relative">
                      <button 
                        className={`absolute top-2 right-2 p-1.5 rounded-full ${ad.isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-400'} hover:bg-red-500 hover:text-white transition-colors shadow-sm`}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                    {/* Ad Info */}
                    <div className="p-3">
                      <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">{ad.title}</h3>
                      <p className="text-sm font-semibold text-gray-900">{ad.price}</p>
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
