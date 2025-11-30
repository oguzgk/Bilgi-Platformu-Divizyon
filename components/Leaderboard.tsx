import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Trophy, TrendingUp, TrendingDown, Minus, Crown, Medal, 
  Award, Zap, Filter, Calendar, Users, Star, ChevronLeft
} from 'lucide-react';
import { LEADERBOARD_DATA, COLORS } from '../constants';
import { getRoleInfo } from '../utils/roleHelpers';
import RoleBadge from './RoleBadge';

type TimeFilter = 'weekly' | 'monthly' | 'allTime';
type CategoryFilter = 'all' | 'wiki' | 'comments' | 'topics';

function Leaderboard() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('weekly');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');

  const currentData = LEADERBOARD_DATA[timeFilter];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown size={24} className="text-yellow-500" />;
    if (rank === 2) return <Medal size={24} className="text-gray-400" />;
    if (rank === 3) return <Medal size={24} className="text-amber-600" />;
    return null;
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-lg scale-110';
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white shadow-md';
    if (rank === 3) return 'bg-gradient-to-r from-amber-400 to-amber-600 text-white shadow-md';
    return 'bg-gray-100 text-gray-700';
  };

  const getChangeIcon = (change: string) => {
    if (change === 'up') return <TrendingUp size={16} className="text-green-500" />;
    if (change === 'down') return <TrendingDown size={16} className="text-red-500" />;
    return <Minus size={16} className="text-gray-400" />;
  };

  const getTimeName = (time: TimeFilter) => {
    const names = {
      weekly: 'Bu Hafta',
      monthly: 'Bu Ay',
      allTime: 'Tüm Zamanlar',
    };
    return names[time];
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-r from-[#00BFA5] to-teal-600 text-white -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-12">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors font-normal mb-4"
          >
            <ChevronLeft size={20} />
            <span>Ana Sayfaya Dön</span>
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Trophy size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-semibold">Liderlik Tablosu</h1>
              <p className="text-white/80 text-lg">En aktif ve başarılı kullanıcılar</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Users size={24} className="text-white/80" />
                <div>
                  <p className="text-2xl font-semibold">{currentData.length}</p>
                  <p className="text-white/70 text-sm">Aktif Kullanıcı</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Zap size={24} className="text-white/80" />
                <div>
                  <p className="text-2xl font-semibold">
                    {currentData.reduce((sum, u) => sum + u.contributions, 0)}
                  </p>
                  <p className="text-white/70 text-sm">Toplam Katkı</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Star size={24} className="text-white/80" />
                <div>
                  <p className="text-2xl font-semibold">
                    {currentData.reduce((sum, u) => sum + u.coins, 0).toLocaleString()}
                  </p>
                  <p className="text-white/70 text-sm">Toplam Coin</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Content */}
      <div className="py-8">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            {/* Time Filters */}
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Calendar size={16} />
                Zaman Aralığı
              </p>
              <div className="flex flex-wrap gap-2">
                {(['weekly', 'monthly', 'allTime'] as TimeFilter[]).map(time => (
                  <button
                    key={time}
                    onClick={() => setTimeFilter(time)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      timeFilter === time
                        ? 'bg-[#00BFA5] text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {getTimeName(time)}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filters */}
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Filter size={16} />
                Kategori
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'Tümü', icon: Trophy },
                  { id: 'wiki', label: 'Wiki', icon: Award },
                  { id: 'comments', label: 'Yorumlar', icon: Users },
                  { id: 'topics', label: 'Başlıklar', icon: TrendingUp },
                ].map(cat => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setCategoryFilter(cat.id as CategoryFilter)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                        categoryFilter === cat.id
                          ? 'bg-[#00BFA5] text-white shadow-md'
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
          </div>
        </div>

        {/* Top 3 Podium */}
        {currentData.length >= 3 && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            {/* 2nd Place */}
            <div className="mt-8">
              <Link 
                to={`/user/${currentData[1].username}`}
                className="block bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-6 text-center hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className="relative inline-block mb-4">
                  <img 
                    src={currentData[1].avatarUrl} 
                    alt={currentData[1].displayName}
                    className="w-20 h-20 rounded-full border-4 border-gray-400 shadow-lg"
                  />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-semibold border-2 border-white shadow-md">
                    2
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{currentData[1].displayName}</h3>
                <p className="text-sm text-gray-500 mb-2">@{currentData[1].username}</p>
                <RoleBadge role={currentData[1].role} size="small" showName={false} />
                <div className="mt-4 pt-4 border-t border-gray-300">
                  <p className="text-2xl font-semibold text-gray-900">{currentData[1].coins.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Coin</p>
                </div>
              </Link>
            </div>

            {/* 1st Place */}
            <div className="mt-0">
              <Link 
                to={`/user/${currentData[0].username}`}
                className="block bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl p-6 text-center hover:shadow-2xl transition-all transform hover:-translate-y-2 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400"></div>
                <Crown size={32} className="text-yellow-600 mx-auto mb-2" />
                <div className="relative inline-block mb-4">
                  <img 
                    src={currentData[0].avatarUrl} 
                    alt={currentData[0].displayName}
                    className="w-24 h-24 rounded-full border-4 border-yellow-500 shadow-xl"
                  />
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white font-semibold text-lg border-2 border-white shadow-lg">
                    1
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-1">{currentData[0].displayName}</h3>
                <p className="text-sm text-gray-600 mb-2">@{currentData[0].username}</p>
                <RoleBadge role={currentData[0].role} size="small" showName={false} />
                <div className="mt-4 pt-4 border-t border-yellow-300">
                  <p className="text-3xl font-semibold text-yellow-700">{currentData[0].coins.toLocaleString()}</p>
                  <p className="text-sm text-yellow-600">Coin</p>
                </div>
              </Link>
            </div>

            {/* 3rd Place */}
            <div className="mt-8">
              <Link 
                to={`/user/${currentData[2].username}`}
                className="block bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl p-6 text-center hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className="relative inline-block mb-4">
                  <img 
                    src={currentData[2].avatarUrl} 
                    alt={currentData[2].displayName}
                    className="w-20 h-20 rounded-full border-4 border-amber-500 shadow-lg"
                  />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-semibold border-2 border-white shadow-md">
                    3
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{currentData[2].displayName}</h3>
                <p className="text-sm text-gray-500 mb-2">@{currentData[2].username}</p>
                <RoleBadge role={currentData[2].role} size="small" showName={false} />
                <div className="mt-4 pt-4 border-t border-amber-300">
                  <p className="text-2xl font-semibold text-gray-900">{currentData[2].coins.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Coin</p>
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* Full List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Trophy size={24} className="text-[#00BFA5]" />
              Tam Liste ({currentData.length} kullanıcı)
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {currentData.map((user, index) => {
              const rank = index + 1;
              return (
                <Link
                  key={user.id}
                  to={`/user/${user.username}`}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors group"
                >
                  {/* Rank */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg flex-shrink-0 ${getRankBadge(rank)}`}>
                    {getRankIcon(rank) || rank}
                  </div>

                  {/* Avatar */}
                  <img 
                    src={user.avatarUrl} 
                    alt={user.displayName}
                    className="w-12 h-12 rounded-full border-2 border-gray-200 flex-shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 group-hover:text-[#00BFA5] transition-colors">
                      {user.displayName}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-sm text-gray-500">@{user.username}</p>
                      <RoleBadge role={user.role} size="small" showName={false} />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="hidden md:flex items-center gap-6 flex-shrink-0">
                    <div className="text-right">
                      <p className="text-2xl font-semibold text-gray-900">{user.coins.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Coin</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-700">{user.contributions}</p>
                      <p className="text-xs text-gray-500">Katkı</p>
                    </div>
                  </div>

                  {/* Change */}
                  <div className="flex-shrink-0">
                    {getChangeIcon(user.change)}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <Trophy size={32} className="text-teal-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Nasıl Sıralamaya Girebilirim?</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-teal-600">•</span>
                  <span>Wiki düzenlemeleri yaparak <strong>+10 coin</strong> kazanın</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600">•</span>
                  <span>Yeni başlıklar oluşturarak <strong>+20 coin</strong> kazanın</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600">•</span>
                  <span>Yorumlar yaparak <strong>+2 coin</strong> kazanın</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600">•</span>
                  <span>Rolünüz yükseldikçe <strong>coin çarpanınız</strong> artar!</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;

