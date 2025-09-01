import React from 'react';

export default function FooterComponent() {
  return (
    <footer 
      className="border-t"
      style={{ 
        backgroundColor: 'var(--surface-card)',
        color: 'var(--text-primary)',
        borderColor: 'var(--border-subtle)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <h2 
                className="text-3xl font-bold mb-4"
                style={{ color: 'var(--brand-color)' }}
              >
                ADORA
              </h2>
              <p 
                className="mb-6 text-sm leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                Sri Lanka's largest and most trusted online marketplace. Buy and sell anything, anywhere, anytime with complete confidence and security.
              </p>
              
              {/* Social Media Links */}
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ 
                    backgroundColor: 'var(--surface-muted)', 
                    color: 'var(--text-secondary)' 
                  }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ 
                    backgroundColor: 'var(--surface-muted)', 
                    color: 'var(--text-secondary)' 
                  }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ 
                    backgroundColor: 'var(--surface-muted)', 
                    color: 'var(--text-secondary)' 
                  }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ 
                    backgroundColor: 'var(--surface-muted)', 
                    color: 'var(--text-secondary)' 
                  }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.048 0C5.4 0 0 5.4 0 12.048s5.4 12.048 12.048 12.048S24 18.696 24 12.048 18.6 0 12.048 0zM17.64 9.6h-3.36c-.48 0-.72.24-.72.72v2.4h4.08l-.48 3.84h-3.6v9.6h-3.84v-9.6H6.72v-3.84h2.4v-2.88c0-1.92 1.2-3.6 3.6-3.6h3.12v3.84h-1.68c-.48 0-.72.24-.72.72v1.2h2.4z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 
                className="text-lg font-semibold mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                Quick Links
              </h3>
              <ul className="space-y-2">
                {[
                  'Browse Categories',
                  'Post an Ad',
                  'Search Ads',
                  'My Account',
                  'My Ads',
                  'Favorites',
                  'Messages',
                  'Help Center'
                ].map((link, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="text-sm transition-colors duration-200 hover:underline"
                      style={{ 
                        color: 'var(--text-secondary)',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.color = 'var(--brand-color)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.color = 'var(--text-secondary)';
                      }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 
                className="text-lg font-semibold mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                Categories
              </h3>
              <ul className="space-y-2">
                {[
                  { name: 'Vehicles', icon: '🚗' },
                  { name: 'Property', icon: '🏠' },
                  { name: 'Electronics', icon: '📱' },
                  { name: 'Mobile Phones', icon: '📞' },
                  { name: 'Jobs', icon: '💼' },
                  { name: 'Services', icon: '🔧' },
                  { name: 'Fashion', icon: '👗' },
                  { name: 'Home & Garden', icon: '🏡' }
                ].map((category, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="text-sm transition-colors duration-200 hover:underline flex items-center space-x-2"
                      style={{ 
                        color: 'var(--text-secondary)',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.color = 'var(--brand-color)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.color = 'var(--text-secondary)';
                      }}
                    >
                      <span>{category.icon}</span>
                      <span>{category.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support & Contact */}
            <div>
              <h3 
                className="text-lg font-semibold mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                Support & Contact
              </h3>
              
              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--brand-color)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    +94 11 123 4567
                  </span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--brand-color)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    support@adora.lk
                  </span>
                </div>
                
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--brand-color)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    123 Main Street<br />
                    Colombo 03, Sri Lanka
                  </span>
                </div>
              </div>

              {/* Support Links */}
              <ul className="space-y-2">
                {[
                  'Contact Us',
                  'FAQ',
                  'Safety Tips',
                  'Terms of Service',
                  'Privacy Policy',
                  'Report Issue'
                ].map((link, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="text-sm transition-colors duration-200 hover:underline"
                      style={{ 
                        color: 'var(--text-secondary)',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.color = 'var(--brand-color)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.color = 'var(--text-secondary)';
                      }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div 
          className="py-6 border-t flex flex-col md:flex-row justify-between items-center"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          <div className="mb-4 md:mb-0">
            <p 
              className="text-sm"
              style={{ color: 'var(--text-secondary)' }}
            >
              © 2025 ADORA. All rights reserved.
            </p>
          </div>
          
          {/* App Download Links */}
          <div className="flex items-center space-x-4">
            <span 
              className="text-sm font-medium"
              style={{ color: 'var(--text-primary)' }}
            >
              Download App:
            </span>
            <a 
              href="#" 
              className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105"
              style={{ 
                backgroundColor: 'var(--surface-muted)',
                color: 'var(--text-primary)'
              }}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.523 15.3414c-.5511-.4895-.9518-.959-.9518-1.8368 0-.8034.4218-1.2806.9016-1.6878 1.0513-.8926 2.1026-1.8975 2.1026-3.6841 0-2.3543-1.5076-3.5715-2.1539-4.0609h.6894L19.5 2.5h-6.8684c-2.7158 0-5.4316 2.0513-5.4316 5.1282 0 2.8947 2.1539 5.1795 5.4316 5.1795.6381 0 1.2249-.1024 1.7865-.3073-.2305.4609-.4097.9731-.4097 1.6365 0 .9731.5122 1.7353 1.1629 2.3421-1.2762.1024-3.6841.6381-5.4829 2.0513C8.7195 19.5122 8 20.5122 8 21.7805c0 2.0513 1.9489 3.9489 5.9829 3.9489 4.8537 0 7.4146-2.7158 7.4146-5.4316 0-2.0513-.959-3.1026-3.8732-5.4564zM9.6585 7.6122c-.1537-2.8435 1.7353-5.1282 3.9489-5.1282 2.1026 0 3.1026 1.4563 3.1026 2.9639 0 2.8947-1.6878 5.2307-3.9489 5.2307-2.0 0-3.1026-1.4563-3.1026-3.0664zm7.8293 16.8293c0 1.8368-1.5588 3.0664-3.9489 3.0664-3.2793 0-5.3829-1.5588-5.3829-3.7724 0-2.1026 1.8368-2.8435 2.4632-3.1026 1.1115-.4609 2.5422-.5122 2.7727-.5122.2305 0 .3329 0 .5122.0513 1.7353 1.2249 2.9639 1.8368 2.9639 3.5203 0 .4097-.1537.8195-.3802 1.2492z"/>
              </svg>
              <span className="text-sm">Play Store</span>
            </a>
            <a 
              href="#" 
              className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105"
              style={{ 
                backgroundColor: 'var(--surface-muted)',
                color: 'var(--text-primary)'
              }}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span className="text-sm">App Store</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
