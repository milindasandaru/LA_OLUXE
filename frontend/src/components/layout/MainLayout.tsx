import { useState } from 'react';
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(o => !o);
  const closeSidebar = () => setSidebarOpen(false);
  return (
    <div 
      className="min-h-screen flex flex-col transition-colors duration-300"
      style={{ 
        backgroundColor: 'var(--surface-muted)'
      }}
    >
      {/* Header */}
      <Header showSidebar={showSidebar} onToggleSidebar={toggleSidebar} />
      
      {/* Main Content Area */}
      <div className="flex flex-1 relative">
        {showSidebar && (
          <Sidebar isOpen={sidebarOpen || false} onClose={closeSidebar} />
        )}
        <main className={`flex-1 ${className} p-2 sm:p-4`}>{children}</main>
      </div>
      
      {/* Footer */}
      {showFooter && <FooterComponent />}
    </div>
  );
}
