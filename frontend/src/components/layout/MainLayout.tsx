import { ReactNode } from 'react';
import Header from './Header';
import FooterComponent from './FooterComponent';
import Sidebar from './Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  showFooter?: boolean;
  className?: string;
}

export default function MainLayout({ 
  children, 
  showSidebar = false, 
  showFooter = true,
  className = ''
}: MainLayoutProps) {
  return (
    <div 
      className="min-h-screen flex flex-col transition-colors duration-300"
      style={{ 
        backgroundColor: 'var(--surface-muted)'
      }}
    >
      {/* Header */}
      <Header 
        showSidebar={showSidebar} 
      />
      
      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Sidebar */}
        {showSidebar && (
          <div className="w-64 flex-shrink-0">
            <Sidebar 
              isOpen={true}
              onClose={() => {}}
            />
          </div>
        )}
        
        {/* Main Content */}
        <main className={`flex-1 ${showSidebar ? 'lg:ml-0' : ''} ${className}`}>
          {children}
        </main>
      </div>
      
      {/* Footer */}
      {showFooter && <FooterComponent />}
    </div>
  );
}
