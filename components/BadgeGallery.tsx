import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, Lock, ChevronLeft, Filter, Trophy, Users, Star, Zap, Coins } from 'lucide-react';
import { ALL_BADGES, COLORS, Badge } from '../constants';

type CategoryFilter = 'all' | 'contribution' | 'social' | 'special' | 'achievement';
type StatusFilter = 'all' | 'unlocked' | 'locked';

function BadgeGallery() {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const filteredBadges = ALL_BADGES.filter(badge => {
    const matchesCategory = categoryFilter === 'all' || badge.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'unlocked' && badge.unlocked) || 
      (statusFilter === 'locked' && !badge.unlocked);
    return matchesCategory && matchesStatus;
  });

  const unlockedCount = ALL_BADGES.filter(b => b.unlocked).length;
  const progress = (unlockedCount / ALL_BADGES.length) * 100;

  const getRarityColor = (rarity: string) => {
    const colors = {
      common: 'from-gray-400 to-gray-600',
      rare: 'from-blue-400 to-blue-600',
      epic: 'from-purple-400 to-purple-600',
      legendary: 'from-amber-400 to-amber-600',
    };
    return colors[rarity as keyof typeof colors] || colors.common;
  };

  const getRarityName = (rarity: string) => {
    const names = {
      common: 'Yaygın',
      rare: 'Nadir',
      epic: 'Epik',
      legendary: 'Efsanevi',
    };
    return names[rarity as keyof typeof names] || 'Yaygın';
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      contribution: Trophy,
      social: Users,
      special: Star,
      achievement: Zap,
    };
    return icons[category as keyof typeof icons] || Award;
  };

  const getCategoryName = (category: string) => {
    const names = {
      contribution: 'Katkı',
      social: 'Sosyal',
      special: 'Özel',
      achievement: 'Başarı',
    };
    return names[category as keyof typeof names] || category;
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-12">
          <Link 
            to="/profile"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors font-normal mb-4"
          >
            <ChevronLeft size={20} />
            <span>Profile Dön</span>
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Award size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-semibold">Rozet Galerisi</h1>
              <p className="text-white/80 text-lg">Başarılarını sergile</p>
            </div>
          </div>

          {/* Progress */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mt-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-white/90 font-semibold">İlerleme Durumu</p>
              <p className="text-white font-semibold text-xl">{unlockedCount} / {ALL_BADGES.length}</p>
            </div>
            <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
              <div 
                className="bg-white h-full rounded-full transition-all duration-500 shadow-lg"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-white/70 text-sm mt-2">%{progress.toFixed(0)} tamamlandı</p>
          </div>
        </div>

      {/* Content */}
      <div className="py-8">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Filter */}
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Filter size={16} />
                Kategori
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'Tümü', icon: Award },
                  { id: 'contribution', label: 'Katkı', icon: Trophy },
                  { id: 'social', label: 'Sosyal', icon: Users },
                  { id: 'special', label: 'Özel', icon: Star },
                  { id: 'achievement', label: 'Başarı', icon: Zap },
                ].map(cat => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setCategoryFilter(cat.id as CategoryFilter)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                        categoryFilter === cat.id
                          ? 'bg-purple-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Icon size={16} />
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Award size={16} />
                Durum
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'Tümü' },
                  { id: 'unlocked', label: 'Açılanlar' },
                  { id: 'locked', label: 'Kilitli' },
                ].map(status => (
                  <button
                    key={status.id}
                    onClick={() => setStatusFilter(status.id as StatusFilter)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      statusFilter === status.id
                        ? 'bg-purple-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {status.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredBadges.map(badge => {
            const Icon = getCategoryIcon(badge.category);
            return (
              <div
                key={badge.id}
                className={`relative rounded-2xl p-6 text-center transform transition-all hover:scale-105 ${
                  badge.unlocked
                    ? `bg-gradient-to-br ${getRarityColor(badge.rarity)} text-white shadow-xl cursor-pointer`
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                title={badge.unlocked ? badge.description : `🔒 ${badge.requirement}`}
              >
                {/* Rarity Badge */}
                {badge.unlocked && (
                  <div className="absolute top-2 right-2 px-2 py-1 bg-white/30 backdrop-blur-sm rounded-lg text-xs font-semibold">
                    {getRarityName(badge.rarity)}
                  </div>
                )}

                {/* Lock Icon */}
                {!badge.unlocked && (
                  <div className="absolute top-2 right-2">
                    <Lock size={16} className="text-gray-500" />
                  </div>
                )}

                {/* Badge Icon */}
                <div className={`text-5xl mb-3 flex items-center justify-center ${badge.unlocked ? '' : 'grayscale opacity-50'}`}>
                  {badge.id === 'coin_master' ? (
                    <Coins size={48} className="text-white" fill="#FFD700" strokeWidth={2} />
                  ) : (
                    <span>{badge.icon}</span>
                  )}
                </div>

                {/* Badge Name */}
                <h3 className={`font-semibold text-sm mb-1 line-clamp-2 ${badge.unlocked ? 'text-white' : 'text-gray-600'}`}>
                  {badge.name}
                </h3>

                {/* Category */}
                <div className={`flex items-center justify-center gap-1 text-xs ${badge.unlocked ? 'text-white/80' : 'text-gray-500'}`}>
                  <Icon size={12} />
                  <span>{getCategoryName(badge.category)}</span>
                </div>

                {/* Hover Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-normal max-w-xs z-10 hidden sm:block">
                  {badge.unlocked ? badge.description : `🔒 ${badge.requirement}`}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredBadges.length === 0 && (
          <div className="text-center py-16">
            <Award size={64} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Rozet Bulunamadı</h3>
            <p className="text-gray-500">Seçili filtrelerde rozet bulunmuyor.</p>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <Trophy size={32} className="text-purple-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Rozet Nasıl Kazanılır?</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span><strong>Katkı Rozetleri:</strong> Wiki düzenlemeleri ve içerik oluşturarak kazanılır</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span><strong>Sosyal Rozetler:</strong> Toplulukla etkileşime girerek kazanılır</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span><strong>Özel Rozetler:</strong> Belirli tarihlerde veya özel durumlarda verilir</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span><strong>Başarı Rozetleri:</strong> Belirli hedeflere ulaşarak kazanılır</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BadgeGallery;

