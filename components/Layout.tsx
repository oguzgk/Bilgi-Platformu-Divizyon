import React, { useState } from 'react';
import SidebarLeft from './SidebarLeft';
import SidebarRight from './SidebarRight';
import MobileMenu from './MobileMenu';
import NotificationDropdown from './NotificationDropdown';
import SearchModal from './SearchModal';
import { Search, Sparkles, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CURRENT_USER, COLORS } from '../constants';
import RoleBadge from './RoleBadge';
import { useNotifications } from '../contexts/NotificationContext';

interface LayoutProps {
  children: React.ReactNode;
  onLogout?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const { notifications, markAsRead, markAllAsRead, deleteNotification } = useNotifications();

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <SidebarLeft onLogout={onLogout} />
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        onLogout={onLogout}
      />
      
      {/* Top Header with Search - Mobil uyumlu */}
      <header className="lg:ml-64 xl:mr-80 sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          {/* Mobil Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu size={24} className="text-gray-600" />
          </button>

          {/* Search Bar - PDF'de "en tepede ve belirgin" */}
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchModalOpen(true)}
              placeholder="Başlık, ders, mekan ara..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00BFA5] focus:border-transparent text-sm cursor-pointer"
              readOnly
            />
          </div>

          {/* Sağ taraf - Tablet ve üstü */}
          <div className="hidden md:flex items-center gap-3">
            {/* Coin Balance - Quick View with Pulse Animation */}
            <Link 
              to="/profile" 
              className="group flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-amber-50 px-3 py-2 rounded-lg border border-yellow-200 hover:border-yellow-300 hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              <span className="text-yellow-700 font-bold text-sm group-hover:text-yellow-800 transition-colors">
                {CURRENT_USER.coins.toLocaleString()}
              </span>
              <Sparkles size={16} className="text-yellow-500 group-hover:animate-pulse" />
            </Link>

            {/* Notifications */}
            <NotificationDropdown
              notifications={notifications}
              onMarkAsRead={markAsRead}
              onMarkAllAsRead={markAllAsRead}
              onDeleteNotification={deleteNotification}
            />

            {/* User Avatar - Quick Access */}
            <Link to="/profile" className="flex items-center gap-2 hover:bg-gray-50 px-2 py-1 rounded-lg transition-colors">
              <img src={CURRENT_USER.avatarUrl} alt="Profile" className="w-8 h-8 rounded-full border-2 border-gray-200" />
            </Link>
          </div>

          {/* Mobil - Bildirim ve Avatar */}
          <div className="md:hidden flex items-center gap-2">
            <NotificationDropdown
              notifications={notifications}
              onMarkAsRead={markAsRead}
              onMarkAllAsRead={markAllAsRead}
              onDeleteNotification={deleteNotification}
            />
            <Link to="/profile">
              <img src={CURRENT_USER.avatarUrl} alt="Profile" className="w-9 h-9 rounded-full border-2 border-gray-300" />
            </Link>
          </div>
        </div>
      </header>
      
      {/* Main Content Wrapper */}
      <main className="lg:ml-64 xl:mr-80 min-h-screen transition-all duration-300">
         <div className="max-w-4xl mx-auto p-4 md:p-8 lg:p-12">
            {children}
         </div>
      </main>

      <SidebarRight />
      
      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchModalOpen} 
        onClose={() => setIsSearchModalOpen(false)}
        initialQuery={searchQuery}
      />
    </div>
  );
};

export default Layout;
