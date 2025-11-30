import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, User, MapPin, Calendar, Award, TrendingUp, 
  MessageSquare, BookOpen, Users, UserPlus, UserCheck, Mail,
  Flag, MoreVertical, Share2, Crown, Zap
} from 'lucide-react';
import { COLORS, MOCK_SEARCH_DATA } from '../../constants';
import { getRoleInfo } from '../../utils/roleHelpers';
import RoleBadge from '../RoleBadge';
import { useNotifications } from '../../contexts/NotificationContext';
import ChatBox from '../social/ChatBox';

function UserProfilePage() {
  const { username } = useParams<{ username: string }>();
  const { addNotification } = useNotifications();
  
  // Mock kullanıcı verisi - gerçek uygulamada API'den gelecek
  const user = MOCK_SEARCH_DATA.users.find(u => u.username === username) || MOCK_SEARCH_DATA.users[0];
  const roleInfo = getRoleInfo(user.role);
  
  const [isFollowing, setIsFollowing] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showChatBox, setShowChatBox] = useState(false);

  // Kullanıcı aktiviteleri (mock)
  const activities = [
    { id: '1', type: 'wiki_edit', title: 'Selçuk Üniversitesi Tarihçesi', time: '2 saat önce', coins: 10 },
    { id: '2', type: 'comment', title: 'Kampüs yemekhanesi hakkında yorum yaptı', time: '5 saat önce', coins: 2 },
    { id: '3', type: 'topic', title: 'Yeni başlık oluşturdu: "Konya\'da gezilecek yerler"', time: '1 gün önce', coins: 20 },
    { id: '4', type: 'comment', title: 'Hukuk stajları konusunda yorum yaptı', time: '2 gün önce', coins: 2 },
  ];

  // Rozetler (mock)
  const badges = [
    { id: 'b1', name: 'Erken Katılımcı', icon: '🚀', rarity: 'legendary', description: 'Beta dönemde platforma katıldı' },
    { id: 'b2', name: 'İlk Düzenleme', icon: '✍️', rarity: 'common', description: 'İlk wiki düzenlemesini yaptı' },
    { id: 'b3', name: 'Popüler Yazar', icon: '⭐', rarity: 'rare', description: '50+ beğeni aldı' },
    { id: 'b4', name: 'Aktif Üye', icon: '🔥', rarity: 'epic', description: '7 gün üst üste aktif' },
  ];

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    addNotification(
      'announcement',
      isFollowing ? 'Takibi Bıraktın' : 'Takip Ediliyor!',
      isFollowing 
        ? `${user.username} kullanıcısını takip etmeyi bıraktın.`
        : `${user.username} kullanıcısını takip etmeye başladın. Yeni içerikleri bildirimlerden görebilirsin!`,
      { username: user.username }
    );
  };

  const handleMessage = () => {
    setShowChatBox(true);
  };

  const handleReport = (reason: string) => {
    addNotification('announcement', 'Rapor Gönderildi 🚨', `${user.username} kullanıcısı "${reason}" sebebiyle raporlandı. Moderatörler inceleyecek.`);
    setShowReportModal(false);
  };

  const getRarityColor = (rarity: string) => {
    const colors = {
      common: 'from-gray-400 to-gray-600',
      rare: 'from-blue-400 to-blue-600',
      epic: 'from-purple-400 to-purple-600',
      legendary: 'from-amber-400 to-amber-600',
    };
    return colors[rarity as keyof typeof colors] || colors.common;
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-[#00BFA5] transition-colors font-normal mb-3"
          >
            <ArrowLeft size={20} />
            <span>Ana Sayfaya Dön</span>
          </Link>
          
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <img 
                src={user.metadata?.avatarUrl || 'https://i.pravatar.cc/150'} 
                alt={user.username}
                className="w-20 h-20 rounded-full border-4 border-gray-200 shadow-lg"
              />
              <div>
                <h1 className="text-3xl font-semibold text-gray-900">{user.title}</h1>
                <p className="text-gray-500">@{user.username}</p>
                <div className="flex items-center gap-2 mt-2">
                  <RoleBadge role={user.metadata?.role || 'yeni_gelen'} size="small" showMultiplier={true} />
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-600">{user.metadata?.totalContributions || 0} katkı</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleFollow}
                className={`px-6 py-2.5 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                  isFollowing
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    : 'bg-[#00BFA5] text-white hover:bg-[#009688] shadow-lg'
                }`}
              >
                {isFollowing ? <UserCheck size={18} /> : <UserPlus size={18} />}
                {isFollowing ? 'Takip Ediliyor' : 'Takip Et'}
              </button>
              <button
                onClick={handleMessage}
                className="px-6 py-2.5 rounded-lg font-semibold bg-blue-500 text-white hover:bg-blue-600 transition-all flex items-center gap-2"
              >
                <Mail size={18} />
                Mesaj Gönder
              </button>
              <button className="p-2.5 rounded-lg hover:bg-gray-100 transition-colors">
                <Share2 size={20} className="text-gray-600" />
              </button>
              <button 
                onClick={() => setShowReportModal(true)}
                className="p-2.5 rounded-lg hover:bg-red-50 transition-colors"
              >
                <Flag size={20} className="text-red-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Hakkında */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User size={20} className="text-[#00BFA5]" />
                Hakkında
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={16} className="text-gray-400" />
                  <span>Konya, Türkiye</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={16} className="text-gray-400" />
                  <span>Ocak 2024'te katıldı</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users size={16} className="text-gray-400" />
                  <span>124 takipçi • 89 takip</span>
                </div>
              </div>
            </div>

            {/* İstatistikler */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp size={20} className="text-[#00BFA5]" />
                İstatistikler
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <BookOpen size={16} className="text-blue-500" />
                    <span>Wiki Düzenlemeleri</span>
                  </div>
                  <span className="font-semibold text-gray-900">45</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MessageSquare size={16} className="text-green-500" />
                    <span>Yorumlar</span>
                  </div>
                  <span className="font-semibold text-gray-900">128</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <TrendingUp size={16} className="text-purple-500" />
                    <span>Başlıklar</span>
                  </div>
                  <span className="font-semibold text-gray-900">23</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Zap size={16} className="text-amber-500" />
                    <span>Toplam Beğeni</span>
                  </div>
                  <span className="font-semibold text-gray-900">567</span>
                </div>
              </div>
            </div>

            {/* Rozetler */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Award size={20} className="text-[#00BFA5]" />
                Rozetler ({badges.length})
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {badges.map(badge => (
                  <div
                    key={badge.id}
                    className={`relative p-4 rounded-xl bg-gradient-to-br ${getRarityColor(badge.rarity)} text-white text-center group cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl`}
                    title={badge.description}
                  >
                    <div className="text-3xl mb-1">{badge.icon}</div>
                    <p className="text-xs font-semibold line-clamp-2">{badge.name}</p>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                      {badge.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Main - Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <TrendingUp size={24} className="text-[#00BFA5]" />
                Son Aktiviteler
              </h3>

              <div className="space-y-4">
                {activities.map(activity => {
                  const getIcon = () => {
                    switch (activity.type) {
                      case 'wiki_edit': return <BookOpen size={18} className="text-blue-500" />;
                      case 'comment': return <MessageSquare size={18} className="text-green-500" />;
                      case 'topic': return <TrendingUp size={18} className="text-purple-500" />;
                      default: return <Award size={18} className="text-gray-500" />;
                    }
                  };

                  return (
                    <div
                      key={activity.id}
                      className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                        {getIcon()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-normal text-gray-900">{activity.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">{activity.time}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs font-semibold text-[#FFD700] flex items-center gap-1">
                            <Crown size={12} />
                            +{activity.coins} coin
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Load More */}
              <button className="w-full mt-6 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-normal rounded-xl transition-colors">
                Daha Fazla Yükle
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-slideDown">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Flag size={24} className="text-red-500" />
                Kullanıcıyı Raporla
              </h3>
              <button
                onClick={() => setShowReportModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <MoreVertical size={20} className="text-gray-500" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Lütfen rapor sebebini seçin. Moderatörler konuyu inceleyecektir.
            </p>

            <div className="space-y-2">
              {['Spam', 'Hakaret', 'Yanıltıcı Bilgi', 'Uygunsuz İçerik', 'Diğer'].map(reason => (
                <button
                  key={reason}
                  onClick={() => handleReport(reason)}
                  className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-red-50 rounded-lg transition-colors text-gray-700 hover:text-red-600 font-normal"
                >
                  {reason}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowReportModal(false)}
              className="w-full mt-4 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-normal rounded-lg transition-colors"
            >
              İptal
            </button>
          </div>
        </div>
      )}

      {/* Chat Box */}
      {showChatBox && (
        <ChatBox
          friend={{
            username: user.username,
            displayName: user.title,
            avatarUrl: user.metadata?.avatarUrl || 'https://i.pravatar.cc/150',
            isOnline: true // Mock olarak true, gerçek uygulamada API'den gelecek
          }}
          onClose={() => setShowChatBox(false)}
        />
      )}
    </div>
  );
}

export default UserProfilePage;

