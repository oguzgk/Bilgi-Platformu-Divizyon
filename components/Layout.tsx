import React, { useState, useRef, useEffect } from 'react';
import SidebarLeft from './SidebarLeft';
import SidebarRight from './SidebarRight';
import MobileMenu from './MobileMenu';
import NotificationDropdown from './NotificationDropdown';
import AdvancedSearch from './search/AdvancedSearch';
import { Search, Sparkles, Menu, X, TrendingUp, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CURRENT_USER, COLORS, TRENDING_TOPICS } from '../constants';
import RoleBadge from './RoleBadge';
import { useNotifications } from '../contexts/NotificationContext';

interface LayoutProps {
  children: React.ReactNode;
  onLogout?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const { notifications, markAsRead, markAllAsRead, deleteNotification } = useNotifications();

  // Ctrl+K ile arama modalını aç
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowAdvancedSearch(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          {/* Mobil Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu size={24} className="text-gray-600" />
          </button>

          {/* Search Bar - Gelişmiş aramaya yönlendir */}
          <button
            onClick={() => setShowAdvancedSearch(true)}
            className="flex-1 flex items-center gap-3 px-4 py-2.5 border border-gray-300 rounded-xl hover:border-[#00BFA5] transition-all text-left bg-white"
          >
            <Search size={18} className="text-gray-400 flex-shrink-0" />
            <span className="text-sm text-gray-500 flex-1">Başlık, ders, mekan ara...</span>
            <kbd className="hidden sm:inline-block px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs text-gray-600 font-mono">
              Ctrl+K
            </kbd>
          </button>

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
         <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-8 lg:py-12">
            {children}
         </div>
      </main>

      <SidebarRight />

      {/* Advanced Search Modal */}
      <AdvancedSearch 
        isOpen={showAdvancedSearch} 
        onClose={() => setShowAdvancedSearch(false)}
        initialQuery={searchQuery}
      />
    </div>
  );
};

export default Layout;
