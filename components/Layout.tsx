import React, { useState, useRef, useEffect } from 'react';
import SidebarLeft from './SidebarLeft';
import SidebarRight from './SidebarRight';
import MobileMenu from './MobileMenu';
import NotificationDropdown from './NotificationDropdown';
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
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const { notifications, markAsRead, markAllAsRead, deleteNotification } = useNotifications();

  useEffect(() => {
    // localStorage'dan son aramaları yükle
    const recent = localStorage.getItem('recentSearches');
    if (recent) {
      setRecentSearches(JSON.parse(recent));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = searchQuery.trim().length > 0 
    ? TRENDING_TOPICS.filter(topic => 
        topic.title.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (query: string) => {
    if (query.trim()) {
      const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      setShowSearchResults(false);
      // TODO: Arama sayfasına yönlendir
    }
  };

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

          {/* Search Bar - Inline sonuçlarla */}
          <div className="flex-1 relative" ref={searchRef}>
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearchSubmit(searchQuery);
                }
                if (e.key === 'Escape') {
                  setShowSearchResults(false);
                }
              }}
              placeholder="Başlık, ders, mekan ara..."
              className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00BFA5] focus:border-transparent text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setShowSearchResults(false);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={16} className="text-gray-400" />
              </button>
            )}

            {/* Dropdown Sonuçlar */}
            {showSearchResults && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 max-h-[70vh] overflow-y-auto z-50">
                {searchQuery.trim().length > 0 ? (
                  // Arama Sonuçları
                  searchResults.length > 0 ? (
                    <div className="p-2">
                      <p className="text-xs text-gray-500 font-semibold px-3 py-2">
                        {searchResults.length} sonuç bulundu
                      </p>
                      {searchResults.map((result) => (
                        <Link
                          key={result.id}
                          to="/"
                          onClick={() => {
                            handleSearchSubmit(searchQuery);
                          }}
                          className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                              <TrendingUp size={18} className="text-purple-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-gray-900 group-hover:text-[#00BFA5] transition-colors">
                                  {result.title}
                                </h3>
                                {result.isHot && (
                                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded font-bold">
                                    SICAK
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-500">
                                {result.category} • {result.viewCount.toLocaleString()} görüntüleme
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <Search size={48} className="mx-auto mb-3 text-gray-300" />
                      <p className="text-gray-500">"{searchQuery}" için sonuç bulunamadı</p>
                    </div>
                  )
                ) : (
                  // Son Aramalar ve Popüler
                  <div className="p-3">
                    {recentSearches.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between px-2 mb-2">
                          <p className="text-xs text-gray-500 font-semibold">Son Aramalar</p>
                          <button
                            onClick={() => {
                              setRecentSearches([]);
                              localStorage.removeItem('recentSearches');
                            }}
                            className="text-xs text-red-500 hover:text-red-600 font-medium"
                          >
                            Temizle
                          </button>
                        </div>
                        {recentSearches.map((search, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setSearchQuery(search);
                              handleSearchSubmit(search);
                            }}
                            className="w-full text-left p-2 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
                          >
                            <Clock size={14} className="text-gray-400" />
                            <span className="text-sm text-gray-700">{search}</span>
                          </button>
                        ))}
                      </div>
                    )}
                    <div>
                      <p className="text-xs text-gray-500 font-semibold px-2 mb-2">Popüler Aramalar</p>
                      <div className="flex flex-wrap gap-2 px-2">
                        {['Selimiye Camii', 'Mevlana', 'Alaeddin Tepesi', 'Etli Ekmek'].map((tag) => (
                          <button
                            key={tag}
                            onClick={() => {
                              setSearchQuery(tag);
                              handleSearchSubmit(tag);
                            }}
                            className="px-3 py-1.5 bg-gray-100 hover:bg-[#00BFA5] hover:text-white rounded-lg text-xs font-medium transition-colors"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
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
         <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-8 lg:py-12">
            {children}
         </div>
      </main>

      <SidebarRight />
    </div>
  );
};

export default Layout;
