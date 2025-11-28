import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, Clock, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TRENDING_TOPICS, WIKI_DATA } from '../constants';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

function SearchModal({ isOpen, onClose, initialQuery = '' }: SearchModalProps) {
  const [query, setQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    // localStorage'dan son aramaları yükle
    const recent = localStorage.getItem('recentSearches');
    if (recent) {
      setRecentSearches(JSON.parse(recent));
    }
  }, []);

  useEffect(() => {
    if (query.trim().length > 0) {
      performSearch(query);
    } else {
      setSearchResults([]);
    }
  }, [query]);

  const performSearch = (searchQuery: string) => {
    const lowerQuery = searchQuery.toLowerCase();
    
    // Mock arama - TRENDING_TOPICS ve WIKI_DATA'dan ara
    const results: any[] = [];

    // Wiki başlığı
    if (WIKI_DATA.title.toLowerCase().includes(lowerQuery)) {
      results.push({
        type: 'wiki',
        id: 'wiki-1',
        title: WIKI_DATA.title,
        description: 'Wiki Maddesi',
        link: '/'
      });
    }

    // Trending topics'ten ara
    TRENDING_TOPICS.forEach(topic => {
      if (topic.title.toLowerCase().includes(lowerQuery)) {
        results.push({
          type: 'topic',
          id: topic.id,
          title: topic.title,
          description: `${topic.category} • ${topic.viewCount.toLocaleString()} görüntüleme`,
          link: '/',
          isHot: topic.isHot
        });
      }
    });

    // Kategori araması
    const categories = ['Hukuk', 'Teknoloji', 'Sağlık', 'Eğitim', 'Kültür', 'Yemek'];
    categories.forEach(cat => {
      if (cat.toLowerCase().includes(lowerQuery)) {
        results.push({
          type: 'category',
          id: `cat-${cat}`,
          title: cat,
          description: 'Kategori',
          link: '#'
        });
      }
    });

    setSearchResults(results.slice(0, 8)); // Max 8 sonuç
  };

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      // Son aramalara ekle
      const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const handleClose = () => {
    setQuery('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      ></div>

      {/* Modal */}
      <div className="absolute top-0 left-0 right-0 bg-white shadow-2xl animate-slideDown">
        <div className="max-w-3xl mx-auto p-4">
          {/* Search Input */}
          <div className="relative mb-4">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && query.trim()) {
                  handleSearch(query);
                }
                if (e.key === 'Escape') {
                  handleClose();
                }
              }}
              placeholder="Başlık, kategori, mekan ara... (ESC ile çık)"
              className="w-full pl-12 pr-12 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00BFA5] focus:border-transparent text-lg"
            />
            <button
              onClick={handleClose}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-400" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
            {query.trim().length > 0 ? (
              // Arama Sonuçları
              searchResults.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 font-semibold px-2 mb-2">
                    {searchResults.length} sonuç bulundu
                  </p>
                  {searchResults.map((result) => (
                    <Link
                      key={result.id}
                      to={result.link}
                      onClick={() => {
                        handleSearch(query);
                        handleClose();
                      }}
                      className="block p-4 hover:bg-gray-50 rounded-xl transition-colors group"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                          result.type === 'wiki' ? 'bg-blue-100' :
                          result.type === 'topic' ? 'bg-purple-100' :
                          'bg-green-100'
                        }`}>
                          {result.type === 'wiki' && <Search size={18} className="text-blue-600" />}
                          {result.type === 'topic' && <TrendingUp size={18} className="text-purple-600" />}
                          {result.type === 'category' && <Sparkles size={18} className="text-green-600" />}
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
                          <p className="text-sm text-gray-500">{result.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Search size={48} className="mx-auto mb-3 text-gray-300" />
                  <p className="text-gray-500">"{query}" için sonuç bulunamadı</p>
                  <p className="text-sm text-gray-400 mt-2">Farklı bir anahtar kelime deneyin</p>
                </div>
              )
            ) : (
              // Son Aramalar
              <div className="space-y-4">
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3 px-2">
                      <p className="text-xs text-gray-500 font-semibold">Son Aramalar</p>
                      <button
                        onClick={clearRecentSearches}
                        className="text-xs text-red-500 hover:text-red-600 font-medium"
                      >
                        Temizle
                      </button>
                    </div>
                    <div className="space-y-1">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => setQuery(search)}
                          className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors group flex items-center gap-3"
                        >
                          <Clock size={16} className="text-gray-400" />
                          <span className="text-gray-700 group-hover:text-[#00BFA5] transition-colors">
                            {search}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popüler Aramalar */}
                <div>
                  <p className="text-xs text-gray-500 font-semibold px-2 mb-3">Popüler Aramalar</p>
                  <div className="flex flex-wrap gap-2">
                    {['Selimiye Camii', 'Mevlana', 'Alaeddin Tepesi', 'Etli Ekmek', 'Sille'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setQuery(tag)}
                        className="px-4 py-2 bg-gray-100 hover:bg-[#00BFA5] hover:text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchModal;

