import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, UserPlus, UserCheck, MessageSquare, ChevronLeft, Search, X,
  TrendingUp, Award, Sparkles, Clock, Check
} from 'lucide-react';
import { CURRENT_USER } from '../../constants';
import RoleBadge from '../RoleBadge';
import { useNotifications } from '../../contexts/NotificationContext';
import ChatBox from './ChatBox';

interface Friend {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  role: string;
  level: number;
  coins: number;
  isOnline: boolean;
  lastSeen?: string;
  mutualFriends: number;
  status: 'friends' | 'pending' | 'suggested';
}

function FriendsPage() {
  const { addNotification } = useNotifications();
  const [activeTab, setActiveTab] = useState<'friends' | 'requests' | 'suggestions'>('friends');
  const [searchQuery, setSearchQuery] = useState('');
  const [openChatBox, setOpenChatBox] = useState<Friend | null>(null);

  // Mock data
  const [friends, setFriends] = useState<Friend[]>([
    { id: 'f1', username: 'ayse_hukuk', displayName: 'Ayşe Demir', avatarUrl: 'https://i.pravatar.cc/150?img=45', role: 'gezgin', level: 8, coins: 1850, isOnline: true, mutualFriends: 12, status: 'friends' },
    { id: 'f2', username: 'kemal_meram', displayName: 'Kemal Güler', avatarUrl: 'https://i.pravatar.cc/150?img=33', role: 'kasif_meraklisi', level: 12, coins: 2340, isOnline: true, mutualFriends: 8, status: 'friends' },
    { id: 'f3', username: 'zeynep_yemek', displayName: 'Zeynep Arslan', avatarUrl: 'https://i.pravatar.cc/150?img=23', role: 'seyyah', level: 5, coins: 890, isOnline: false, lastSeen: '2 saat önce', mutualFriends: 5, status: 'friends' },
    { id: 'f4', username: 'ali_tarih', displayName: 'Ali Yıldız', avatarUrl: 'https://i.pravatar.cc/150?img=52', role: 'gezgin', level: 9, coins: 1560, isOnline: false, lastSeen: '1 gün önce', mutualFriends: 15, status: 'friends' },
  ]);

  const [requests, setRequests] = useState<Friend[]>([
    { id: 'r1', username: 'fatma_kultur', displayName: 'Fatma Kaya', avatarUrl: 'https://i.pravatar.cc/150?img=67', role: 'seyyah', level: 6, coins: 920, isOnline: true, mutualFriends: 3, status: 'pending' },
    { id: 'r2', username: 'emre_tip', displayName: 'Emre Demir', avatarUrl: 'https://i.pravatar.cc/150?img=71', role: 'yeni_gelen', level: 2, coins: 240, isOnline: false, lastSeen: '5 saat önce', mutualFriends: 1, status: 'pending' },
  ]);

  const [suggestions, setSuggestions] = useState<Friend[]>([
    { id: 's1', username: 'sema_aksoy', displayName: 'Sema Aksoy', avatarUrl: 'https://i.pravatar.cc/150?img=82', role: 'seyyah', level: 7, coins: 1120, isOnline: true, mutualFriends: 8, status: 'suggested' },
    { id: 's2', username: 'ahmet_yilmaz', displayName: 'Ahmet Yılmaz', avatarUrl: 'https://i.pravatar.cc/150?img=92', role: 'yeni_gelen', level: 3, coins: 450, isOnline: false, lastSeen: '3 gün önce', mutualFriends: 4, status: 'suggested' },
    { id: 's3', username: 'beyza_oz', displayName: 'Beyza Öz', avatarUrl: 'https://i.pravatar.cc/150?img=99', role: 'gezgin', level: 10, coins: 2100, isOnline: true, mutualFriends: 12, status: 'suggested' },
  ]);

  const handleRemoveFriend = (id: string, name: string) => {
    if (window.confirm(`${name} ile arkadaşlığı kaldırmak istediğinize emin misiniz?`)) {
      setFriends(prev => prev.filter(f => f.id !== id));
      addNotification('info', 'Arkadaş Kaldırıldı', `${name} ile arkadaşlığınız sonlandırıldı.`);
    }
  };

  const handleAcceptRequest = (id: string, name: string) => {
    const request = requests.find(r => r.id === id);
    if (request) {
      setRequests(prev => prev.filter(r => r.id !== id));
      setFriends(prev => [...prev, { ...request, status: 'friends' }]);
      addNotification('success', 'Arkadaş Eklendi! 🎉', `${name} ile artık arkadaşsınız!`);
    }
  };

  const handleRejectRequest = (id: string, name: string) => {
    setRequests(prev => prev.filter(r => r.id !== id));
    addNotification('info', 'İstek Reddedildi', `${name}'in arkadaşlık isteği reddedildi.`);
  };

  const handleAddFriend = (id: string, name: string) => {
    setSuggestions(prev => prev.filter(s => s.id !== id));
    addNotification('success', 'İstek Gönderildi', `${name}'e arkadaşlık isteği gönderildi!`);
  };

  const filteredFriends = friends.filter(f => 
    f.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F0F4F8]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#00BFA5] to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors font-medium mb-4"
          >
            <ChevronLeft size={20} />
            <span>Ana Sayfaya Dön</span>
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Users size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold">Arkadaşlar</h1>
              <p className="text-white/80 text-lg">Arkadaşlarınla bağlantıda kal</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Users size={24} />
                <div>
                  <p className="text-2xl font-bold">{friends.length}</p>
                  <p className="text-white/70 text-sm">Arkadaş</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Clock size={24} />
                <div>
                  <p className="text-2xl font-bold">{requests.length}</p>
                  <p className="text-white/70 text-sm">Bekleyen İstek</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Sparkles size={24} />
                <div>
                  <p className="text-2xl font-bold">{friends.filter(f => f.isOnline).length}</p>
                  <p className="text-white/70 text-sm">Çevrimiçi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-2 mb-6 flex gap-2">
          <button
            onClick={() => setActiveTab('friends')}
            className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'friends'
                ? 'bg-[#00BFA5] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Users size={20} />
            Arkadaşlarım
            <span className="px-2 py-0.5 bg-white/30 rounded-full text-xs font-bold">
              {friends.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'requests'
                ? 'bg-[#00BFA5] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Clock size={20} />
            Bekleyen İstekler
            {requests.length > 0 && (
              <span className="px-2 py-0.5 bg-white/30 rounded-full text-xs font-bold">
                {requests.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('suggestions')}
            className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'suggestions'
                ? 'bg-[#00BFA5] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Sparkles size={20} />
            Öneriler
          </button>
        </div>

        {/* Search (only for friends tab) */}
        {activeTab === 'friends' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-6">
            <div className="relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Arkadaş ara..."
                className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00BFA5] focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={18} className="text-gray-400" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Friends List */}
        {activeTab === 'friends' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredFriends.length === 0 ? (
              <div className="col-span-2 text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200">
                <Users size={64} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Arkadaş Bulunamadı</h3>
                <p className="text-gray-500">
                  {searchQuery 
                    ? `"${searchQuery}" araması için sonuç bulunamadı.`
                    : 'Henüz arkadaşın yok. Öneriler sekmesinden arkadaş ekleyebilirsin!'}
                </p>
              </div>
            ) : (
              filteredFriends.map(friend => (
                <div key={friend.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <img 
                        src={friend.avatarUrl} 
                        alt={friend.username}
                        className="w-16 h-16 rounded-full border-2 border-gray-200"
                      />
                      {friend.isOnline && (
                        <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link to={`/user/${friend.username}`} className="font-bold text-gray-900 hover:text-[#00BFA5] transition-colors flex items-center gap-2 mb-1">
                        {friend.displayName}
                        <RoleBadge role={friend.role as any} size="small" showName={false} />
                      </Link>
                      <p className="text-sm text-gray-500">@{friend.username}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
                        <span className="flex items-center gap-1">
                          <Award size={12} />
                          Lv.{friend.level}
                        </span>
                        <span className="flex items-center gap-1">
                          <Sparkles size={12} />
                          {friend.coins}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users size={12} />
                          {friend.mutualFriends} ortak
                        </span>
                      </div>
                      {!friend.isOnline && (
                        <p className="text-xs text-gray-400 mt-1">Son görülme: {friend.lastSeen}</p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => setOpenChatBox(friend)}
                        className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                        title="Mesaj Gönder"
                      >
                        <MessageSquare size={18} />
                      </button>
                      <button
                        onClick={() => handleRemoveFriend(friend.id, friend.displayName)}
                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                        title="Arkadaşlıktan Çıkar"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Friend Requests */}
        {activeTab === 'requests' && (
          <div className="space-y-4">
            {requests.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200">
                <Clock size={64} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Bekleyen İstek Yok</h3>
                <p className="text-gray-500">Yeni arkadaşlık isteklerin burada görünecek.</p>
              </div>
            ) : (
              requests.map(request => (
                <div key={request.id} className="bg-white rounded-xl shadow-sm border-2 border-yellow-200 p-6">
                  <div className="flex items-start gap-4">
                    <img 
                      src={request.avatarUrl} 
                      alt={request.username}
                      className="w-16 h-16 rounded-full border-2 border-gray-200"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900">{request.displayName}</h3>
                        <RoleBadge role={request.role as any} size="small" showName={false} />
                      </div>
                      <p className="text-sm text-gray-500 mb-2">@{request.username}</p>
                      <p className="text-sm text-gray-600 mb-3">
                        {request.mutualFriends} ortak arkadaşınız var
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAcceptRequest(request.id, request.displayName)}
                          className="px-4 py-2 bg-[#00BFA5] text-white rounded-lg font-medium hover:bg-[#009688] transition-colors flex items-center gap-2"
                        >
                          <Check size={18} />
                          Kabul Et
                        </button>
                        <button
                          onClick={() => handleRejectRequest(request.id, request.displayName)}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                        >
                          Reddet
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Suggestions */}
        {activeTab === 'suggestions' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggestions.map(suggestion => (
              <div key={suggestion.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all">
                <div className="text-center">
                  <img 
                    src={suggestion.avatarUrl} 
                    alt={suggestion.username}
                    className="w-20 h-20 rounded-full border-2 border-gray-200 mx-auto mb-3"
                  />
                  <Link to={`/user/${suggestion.username}`} className="font-bold text-gray-900 hover:text-[#00BFA5] transition-colors flex items-center justify-center gap-2 mb-1">
                    {suggestion.displayName}
                    <RoleBadge role={suggestion.role as any} size="small" showName={false} />
                  </Link>
                  <p className="text-sm text-gray-500 mb-3">@{suggestion.username}</p>
                  <p className="text-xs text-gray-600 mb-4">
                    {suggestion.mutualFriends} ortak arkadaşınız var
                  </p>
                  <button
                    onClick={() => handleAddFriend(suggestion.id, suggestion.displayName)}
                    className="w-full px-4 py-2 bg-[#00BFA5] text-white rounded-lg font-medium hover:bg-[#009688] transition-colors flex items-center justify-center gap-2"
                  >
                    <UserPlus size={18} />
                    Arkadaş Ekle
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Chat Box */}
      {openChatBox && (
        <ChatBox
          friend={{
            username: openChatBox.username,
            displayName: openChatBox.displayName,
            avatarUrl: openChatBox.avatarUrl,
            isOnline: openChatBox.isOnline
          }}
          onClose={() => setOpenChatBox(null)}
        />
      )}
    </div>
  );
}

export default FriendsPage;

