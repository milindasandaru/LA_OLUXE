import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Buy & Sell Everything
              <span className="block text-yellow-300">On ADORA</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Your trusted marketplace for finding great deals and selling your items
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/ads"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Browse Ads
              </a>
              <a
                href="/post-ad"
                className="bg-yellow-500 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-yellow-600 transition-colors"
              >
                Post Your Ad
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center mb-6">Find What You're Looking For</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Categories</option>
                <option>Electronics</option>
                <option>Vehicles</option>
                <option>Property</option>
                <option>Jobs</option>
                <option>Services</option>
              </select>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: "Electronics", icon: "📱", count: "1,234 ads" },
              { name: "Vehicles", icon: "🚗", count: "856 ads" },
              { name: "Property", icon: "🏠", count: "423 ads" },
              { name: "Jobs", icon: "💼", count: "789 ads" },
              { name: "Services", icon: "🔧", count: "567 ads" },
              { name: "Fashion", icon: "👗", count: "912 ads" }
            ].map((category) => (
              <a
                key={category.name}
                href={`/ads?category=${category.name.toLowerCase()}`}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose ADORA?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="font-semibold text-xl mb-3">Safe & Secure</h3>
              <p className="text-gray-600">
                All listings are verified and our platform ensures secure transactions for peace of mind.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-xl mb-3">Easy to Use</h3>
              <p className="text-gray-600">
                Post your ad in minutes with our simple interface. Browse and find what you need quickly.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="font-semibold text-xl mb-3">Best Deals</h3>
              <p className="text-gray-600">
                Find amazing deals from local sellers and businesses. Get the best value for your money.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Trading?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of users who are already buying and selling on ADORA
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Sign Up Free
            </a>
            <a
              href="/post-ad"
              className="bg-yellow-500 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-yellow-600 transition-colors"
            >
              Post Your First Ad
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
