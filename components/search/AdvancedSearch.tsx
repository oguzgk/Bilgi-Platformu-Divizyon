import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import { 
  Search, X, TrendingUp, Clock, Filter, FileText, MessageSquare, 
  User, BookOpen, Tag, ChevronRight, Loader2 
} from 'lucide-react';
import { MOCK_SEARCH_DATA, POPULAR_SEARCHES } from '../../constants';

interface SearchResult {
  id: string;
  type: 'topic' | 'wiki' | 'user' | 'comment';
  title: string;
  excerpt?: string;
  category?: string;
  author?: string;
  metadata?: any;
}

interface AdvancedSearchProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

function AdvancedSearch({ isOpen, onClose, initialQuery = '' }: AdvancedSearchProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'topic' | 'wiki' | 'user' | 'comment'>('all');
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  // Fuse.js konfigürasyonu
  const fuseOptions = {
    keys: ['title', 'excerpt', 'content', 'category', 'author', 'username', 'displayName'],
    threshold: 0.3,
    includeScore: true,
    minMatchCharLength: 2,
  };

  // Son aramaları localStorage'dan yükle
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Modal açıldığında input'a focus
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Klavye kısayolları (ESC ile kapat)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Arama fonksiyonu (debounced)
  const performSearch = (searchQuery: string, filter: typeof activeFilter) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);

    // Debounce
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      const allData: SearchResult[] = [];

      // Başlıkları ekle
      if (filter === 'all' || filter === 'topic') {
        MOCK_SEARCH_DATA.topics.forEach(topic => {
          allData.push({
            id: topic.id,
            type: 'topic',
            title: topic.title,
            excerpt: topic.excerpt,
            category: topic.category,
            author: topic.author,
            metadata: { views: topic.views, comments: topic.comments },
          });
        });
      }

      // Wikileri ekle
      if (filter === 'all' || filter === 'wiki') {
        MOCK_SEARCH_DATA.wikis.forEach(wiki => {
          allData.push({
            id: wiki.id,
            type: 'wiki',
            title: wiki.title,
            excerpt: wiki.excerpt,
            category: wiki.category,
            author: wiki.author,
            metadata: { lastUpdated: wiki.lastUpdated },
          });
        });
      }

      // Kullanıcıları ekle
      if (filter === 'all' || filter === 'user') {
        MOCK_SEARCH_DATA.users.forEach(user => {
          allData.push({
            id: user.id,
            type: 'user',
            title: user.username,
            excerpt: user.displayName,
            metadata: { role: user.role, totalContributions: user.totalContributions, avatarUrl: user.avatarUrl },
          });
        });
      }

      // Yorumları ekle
      if (filter === 'all' || filter === 'comment') {
        MOCK_SEARCH_DATA.comments.forEach(comment => {
          allData.push({
            id: comment.id,
            type: 'comment',
            title: comment.content,
            excerpt: comment.topicTitle,
            author: comment.author,
            metadata: { likes: comment.likes },
          });
        });
      }

      // Fuse.js ile fuzzy search
      const fuse = new Fuse(allData, fuseOptions);
      const searchResults = fuse.search(searchQuery);
      const filteredResults = searchResults.map(result => result.item).slice(0, 20);

      setResults(filteredResults);
      setIsSearching(false);
    }, 300);
  };

  // Query değiştiğinde ara
  useEffect(() => {
    performSearch(query, activeFilter);
  }, [query, activeFilter]);

  // Arama yap ve kaydet
  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    
    if (searchQuery.trim()) {
      // Son aramalara ekle
      const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
    }
  };

  // Sonuca tıkla
  const handleResultClick = (result: SearchResult) => {
    if (result.type === 'topic') {
      navigate(`/topic/${result.id}`);
    } else if (result.type === 'wiki') {
      navigate(`/wiki/${result.id}`);
    } else if (result.type === 'user') {
      navigate(`/user/${result.title}`);
    } else if (result.type === 'comment') {
      navigate(`/topic/${result.id}#comment-${result.id}`);
    }
    onClose();
  };

  // Son aramaları temizle
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const getResultIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'topic': return <FileText size={18} className="text-teal-600" />;
      case 'wiki': return <BookOpen size={18} className="text-blue-600" />;
      case 'user': return <User size={18} className="text-purple-600" />;
      case 'comment': return <MessageSquare size={18} className="text-amber-600" />;
    }
  };

  const getResultBadge = (type: SearchResult['type']) => {
    const badges = {
      topic: { label: 'Başlık', color: 'bg-teal-50 text-teal-700 border-teal-200' },
      wiki: { label: 'Wiki', color: 'bg-blue-50 text-blue-700 border-blue-200' },
      user: { label: 'Kullanıcı', color: 'bg-purple-50 text-purple-700 border-purple-200' },
      comment: { label: 'Yorum', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    };
    const badge = badges[type];
    return (
      <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${badge.color}`}>
        {badge.label}
      </span>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[80vh] flex flex-col animate-slideDown">
        {/* Search Input */}
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Ne aramak istersiniz? (Ctrl+K)"
              className="w-full pl-12 pr-12 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00BFA5] focus:border-[#00BFA5] transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={18} className="text-gray-400" />
              </button>
            )}
            {isSearching && (
              <div className="absolute right-12 top-1/2 -translate-y-1/2">
                <Loader2 size={18} className="text-[#00BFA5] animate-spin" />
              </div>
            )}
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2">
            {[
              { id: 'all', label: 'Tümü', icon: Filter },
              { id: 'topic', label: 'Başlıklar', icon: FileText },
              { id: 'wiki', label: 'Wikiler', icon: BookOpen },
              { id: 'user', label: 'Kullanıcılar', icon: User },
              { id: 'comment', label: 'Yorumlar', icon: MessageSquare },
            ].map(filter => {
              const Icon = filter.icon;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all whitespace-nowrap ${
                    activeFilter === filter.id
                      ? 'bg-[#00BFA5] text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon size={16} />
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-6">
          {!query && (
            <div>
              {/* Popüler Aramalar */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <TrendingUp size={16} />
                  Popüler Aramalar
                </h3>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((search, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSearch(search)}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-[#00BFA5] hover:text-white rounded-lg text-sm font-normal transition-all flex items-center gap-2"
                    >
                      <Tag size={14} />
                      {search}
                    </button>
                  ))}
                </div>
              </div>

              {/* Son Aramalar */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                      <Clock size={16} />
                      Son Aramalar
                    </h3>
                    <button
                      onClick={clearRecentSearches}
                      className="text-xs text-red-500 hover:text-red-600 font-normal"
                    >
                      Temizle
                    </button>
                  </div>
                  <div className="space-y-2">
                    {recentSearches.map((search, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSearch(search)}
                        className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-between group"
                      >
                        <span className="text-gray-700 font-normal">{search}</span>
                        <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-600" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {query && results.length === 0 && !isSearching && (
            <div className="text-center py-12">
              <Search size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Sonuç Bulunamadı</h3>
              <p className="text-gray-500">"{query}" için hiçbir sonuç bulunamadı.</p>
            </div>
          )}

          {query && results.length > 0 && (
            <div>
              <p className="text-sm text-gray-500 mb-4">
                <strong className="text-gray-900">{results.length}</strong> sonuç bulundu
              </p>
              <div className="space-y-3">
                {results.map(result => (
                  <button
                    key={`${result.type}-${result.id}`}
                    onClick={() => handleResultClick(result)}
                    className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all group border border-transparent hover:border-[#00BFA5]"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getResultIcon(result.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {getResultBadge(result.type)}
                          {result.category && (
                            <span className="text-xs text-gray-500">{result.category}</span>
                          )}
                        </div>
                        <h4 className="font-semibold text-gray-900 group-hover:text-[#00BFA5] transition-colors line-clamp-1">
                          {result.title}
                        </h4>
                        {result.excerpt && (
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {result.excerpt}
                          </p>
                        )}
                        {result.author && (
                          <p className="text-xs text-gray-500 mt-2">
                            <User size={12} className="inline mr-1" />
                            {result.author}
                          </p>
                        )}
                      </div>
                      <ChevronRight size={18} className="text-gray-400 group-hover:text-[#00BFA5] flex-shrink-0 mt-1" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 text-center">
          <p className="text-xs text-gray-500">
            <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">ESC</kbd> ile kapat
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdvancedSearch;

