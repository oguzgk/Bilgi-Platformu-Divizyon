import React, { useState, useRef, useEffect } from 'react';
import SidebarLeft from './SidebarLeft';
import SidebarRight from './SidebarRight';
import MobileMenu from './MobileMenu';
import NotificationDropdown from './NotificationDropdown';
import { Search, Sparkles, Menu, X, TrendingUp, Clock, Hash, User as UserIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { CURRENT_USER, COLORS, TRENDING_TOPICS, POPULAR_COMMENTS } from '../constants';
import RoleBadge from './RoleBadge';
import { useNotifications } from '../contexts/NotificationContext';
import Fuse from 'fuse.js';

interface LayoutProps {
  children: React.ReactNode;
  onLogout?: () => void;
}

const fuseOptions = {
  keys: ['title', 'excerpt', 'author.username', 'category'],
  threshold: 0.3,
  ignoreLocation: true,
};

const Layout: React.FC<LayoutProps> = ({ children, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { notifications, markAsRead, markAllAsRead, deleteNotification } = useNotifications();

  const popularSearches = ['Selimiye Camii', 'Mevlana Müzesi', 'Etli Ekmek', 'Yurt Tavsiyeleri', 'Hukuk Fakültesi'];

  // Combine trending topics for search
  const searchData = TRENDING_TOPICS.map(topic => ({
    ...topic,
    type: 'topic',
    excerpt: `${topic.category} kategorisinde ${topic.editCount} düzenleme`,
    author: topic.lastEditor
  }));

  const fuse = useRef(new Fuse(searchData, fuseOptions));

  // Load recent searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('recentSearches');
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  // Click outside to close search results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const results = fuse.current.search(searchQuery);
    setSearchResults(results.map(r => r.item).slice(0, 5)); // İlk 5 sonuç
    setShowSearchResults(true);
  }, [searchQuery]);

  const handleSearchSubmit = (query: string) => {
    if (!query.trim()) return;
    
    // Add to recent searches
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
    
    // Navigate to search results
    navigate(`/search?q=${query}`);
    setSearchQuery('');
    setShowSearchResults(false);
  };

  const handleClearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
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

          {/* Search Bar - Inline dropdown */}
          <div ref={searchRef} className="flex-1 relative">
            <div className="flex items-center gap-3 px-4 py-2.5 border border-gray-300 rounded-xl focus-within:border-[#00BFA5] transition-all bg-white">
              <Search size={18} className="text-gray-400 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSearchResults(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    handleSearchSubmit(searchQuery);
                  }
                }}
                placeholder="Başlık, ders, mekan ara..."
                className="flex-1 text-sm text-gray-900 placeholder-gray-500 outline-none bg-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setShowSearchResults(false);
                  }}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <X size={16} className="text-gray-400" />
                </button>
              )}
            </div>

            {/* Search Results Dropdown */}
            {showSearchResults && searchQuery && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-96 overflow-y-auto z-50 animate-slideDown">
                {searchResults.map((result) => (
                  <Link
                    key={result.id}
                    to={result.type === 'user' ? `/user/${result.author.username}` : `/topic/${result.id}`}
                    onClick={() => {
                      setSearchQuery('');
                      setShowSearchResults(false);
                    }}
                    className="block p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        result.type === 'topic' ? 'bg-blue-100' : 
                        result.type === 'wiki' ? 'bg-green-100' : 
                        result.type === 'user' ? 'bg-purple-100' : 'bg-gray-100'
                      }`}>
                        {result.type === 'topic' && <TrendingUp size={16} className="text-blue-600" />}
                        {result.type === 'wiki' && <Hash size={16} className="text-green-600" />}
                        {result.type === 'user' && <UserIcon size={16} className="text-purple-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm mb-1 truncate">{result.title}</h4>
                        <p className="text-xs text-gray-500 line-clamp-1">{result.excerpt}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-400">{result.category}</span>
                          {result.author && (
                            <>
                              <span className="text-gray-300">•</span>
                              <span className="text-xs text-gray-400">@{result.author.username}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
                {searchResults.length >= 5 && (
                  <div className="p-3 text-center border-t border-gray-100">
                    <button
                      onClick={() => {
                        navigate(`/search?q=${searchQuery}`);
                        setSearchQuery('');
                        setShowSearchResults(false);
                      }}
                      className="text-sm text-[#00BFA5] hover:text-[#009688] font-normal"
                    >
                      Tüm sonuçları gör →
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* No Results */}
            {showSearchResults && searchQuery && searchResults.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50 animate-slideDown">
                <p className="text-sm text-gray-500 text-center">"{searchQuery}" için sonuç bulunamadı</p>
              </div>
            )}

            {/* Recent & Popular Searches - Empty State */}
            {showSearchResults && !searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50 animate-slideDown max-h-96 overflow-y-auto">
                {/* Son Aramalar */}
                {recentSearches.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                        <Clock size={14} />
                        Son Aramalar
                      </h4>
                      <button
                        onClick={handleClearRecentSearches}
                        className="text-xs text-red-500 hover:text-red-600 font-normal"
                      >
                        Temizle
                      </button>
                    </div>
                    <div className="space-y-1">
                      {recentSearches.map((search, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setSearchQuery(search);
                            handleSearchSubmit(search);
                          }}
                          className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
                        >
                          <Clock size={14} className="text-gray-400" />
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popüler Aramalar */}
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <TrendingUp size={14} />
                    Popüler Aramalar
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((search, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSearchQuery(search);
                          handleSearchSubmit(search);
                        }}
                        className="px-3 py-1.5 bg-gray-100 hover:bg-[#00BFA5] hover:text-white text-gray-700 text-sm rounded-full transition-colors"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
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
              <span className="text-yellow-700 font-semibold text-sm group-hover:text-yellow-800 transition-colors">
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
