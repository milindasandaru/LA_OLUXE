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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 
            className="text-2xl font-bold mb-4"
            style={{ color: 'var(--brand-color)' }}
          >
            ADORA
          </h2>
          <p 
            className="mb-4"
            style={{ color: 'var(--text-secondary)' }}
          >
            Your trusted marketplace for buying and selling online
          </p>
          <p 
            className="text-sm"
            style={{ color: 'var(--text-secondary)' }}
          >
            © 2024 ADORA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
