import React from 'react';
import SidebarLeft from './SidebarLeft';
import SidebarRight from './SidebarRight';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <SidebarLeft />
      
      {/* Main Content Wrapper */}
      <main className="lg:ml-64 xl:mr-80 min-h-screen transition-all duration-300">
         <div className="max-w-4xl mx-auto p-4 md:p-8 lg:p-12">
            {children}
         </div>
      </main>

      <SidebarRight />
    </div>
  );
};

export default Layout;
