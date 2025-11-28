import React, { useState, useEffect } from 'react';
import { TrendingUp, Eye, Edit3, Clock, ThumbsUp, MessageCircle, Flame, Megaphone, Sparkles, ExternalLink } from 'lucide-react';
import { TRENDING_TOPICS, POPULAR_COMMENTS, KBB_ANNOUNCEMENTS, COLORS } from '../constants';
import { Link } from 'react-router-dom';
import { TrendingSkeleton, CommentSkeleton } from './LoadingSkeleton';
import { useNotifications } from '../contexts/NotificationContext';

function DiscoverFeed() {
  const [isLoading, setIsLoading] = useState(true);
  const [showAnnouncementDetail, setShowAnnouncementDetail] = useState<string | null>(null);
  const { addNotification } = useNotifications();

  useEffect(() => {
    // Simülasyon: Veri yükleniyor
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleAnnouncementClick = (announcementId: string, title: string) => {
    // Bildirim oluştur
    addNotification(
      'announcement',
      'KBB Duyurusu Okundu',
      `"${title}" duyurusunu okudunuz.`,
      { contentTitle: title }
    );
    setShowAnnouncementDetail(announcementId);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="h-6 w-48 bg-gray-200 rounded animate-shimmer"></div>
          <TrendingSkeleton />
          <TrendingSkeleton />
        </div>
        <div className="space-y-3">
          <div className="h-6 w-48 bg-gray-200 rounded animate-shimmer"></div>
          <CommentSkeleton />
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      {/* KBB Duyuruları */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Megaphone size={20} className="text-blue-600" />
          <h2 className="text-lg font-bold text-gray-800">KBB Duyuruları</h2>
        </div>
        <div className="space-y-3">
          {KBB_ANNOUNCEMENTS.map((announcement) => (
            <button 
              key={announcement.id}
              onClick={() => handleAnnouncementClick(announcement.id, announcement.title)}
              className={`w-full text-left bg-white rounded-xl p-4 border-2 transition-all hover:shadow-md cursor-pointer ${
                announcement.isPinned 
                  ? 'border-blue-300 bg-blue-50/50' 
                  : 'border-gray-200 hover:border-blue-200'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {announcement.isPinned && (
                      <span className="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                        SABİTLENDİ
                      </span>
                    )}
                    <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-0.5 rounded">
                      {announcement.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{announcement.title}</h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock size={12} />
                    {announcement.date}
                  </p>
                </div>
                <ExternalLink size={18} className="text-blue-500 flex-shrink-0" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Trend Başlıklar */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Flame size={20} className="text-orange-600" />
          <h2 className="text-lg font-bold text-gray-800">Trend Başlıklar</h2>
          <span className="text-xs text-gray-500">(En çok düzenlenen Wikiler)</span>
        </div>
        <div className="space-y-3">
          {TRENDING_TOPICS.map((topic) => (
            <Link
              key={topic.id}
              to="/"
              className="block bg-white rounded-xl p-4 border border-gray-200 hover:border-[#00BFA5] transition-all hover:shadow-lg hover:-translate-y-1 group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {topic.isHot && (
                      <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
                        <Flame size={12} />
                        SICAK
                      </span>
                    )}
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      {topic.category}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#00BFA5] transition-colors">
                    {topic.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Edit3 size={12} />
                      {topic.editCount} düzenleme
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye size={12} />
                      {topic.viewCount.toLocaleString()} görüntüleme
                    </span>
                  </div>
                  
                  <p className="text-xs text-gray-400 mt-2">
                    Son düzenleyen: <span className="text-[#00BFA5] font-medium hover:underline">@{topic.lastEditedBy}</span> • {topic.timestamp}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popüler Yorumlar */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={20} className="text-purple-600" />
          <h2 className="text-lg font-bold text-gray-800">Popüler Yorumlar</h2>
          <span className="text-xs text-gray-500">(En çok beğenilen Sözlük girişleri)</span>
        </div>
        <div className="space-y-3">
          {POPULAR_COMMENTS.map((comment) => (
            <div
              key={comment.id}
              className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200 hover:shadow-md transition-all"
            >
              {/* Topic başlığı */}
              <Link 
                to="/"
                className="text-xs text-purple-600 font-semibold hover:underline mb-2 block"
              >
                📌 {comment.topicTitle}
              </Link>
              
              {/* Yorum içeriği */}
              <p className="text-gray-800 text-sm leading-relaxed mb-3">
                "{comment.content}"
              </p>
              
              {/* Alt bilgiler */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img 
                    src={comment.user.avatarUrl} 
                    alt={comment.user.username}
                    className="w-6 h-6 rounded-full border-2 border-white"
                  />
                  <span className="text-xs font-semibold text-gray-700">
                    @{comment.user.username}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span className="text-xs text-gray-500">{comment.timestamp}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-sm font-bold text-purple-600">
                    <ThumbsUp size={14} fill="currentColor" />
                    {comment.likes}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Keşfet butonu */}
      <div className="text-center py-6">
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-block px-8 py-3 bg-gradient-to-r from-[#00BFA5] to-teal-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
        >
          Daha Fazla Keşfet
        </Link>
      </div>

      {/* Announcement Detail Modal */}
      {showAnnouncementDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50" 
            onClick={() => setShowAnnouncementDetail(null)}
          ></div>
          <div className="relative bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl animate-slideDown">
            <button
              onClick={() => setShowAnnouncementDetail(null)}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-lg"
            >
              <ExternalLink size={20} />
            </button>
            <div className="flex items-start gap-3 mb-4">
              <Megaphone size={24} className="text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {KBB_ANNOUNCEMENTS.find(a => a.id === showAnnouncementDetail)?.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {KBB_ANNOUNCEMENTS.find(a => a.id === showAnnouncementDetail)?.date}
                </p>
              </div>
            </div>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 leading-relaxed">
                Bu duyuru hakkında detaylı bilgi yakında eklenecektir. 
                Konya Büyükşehir Belediyesi'nin resmi web sitesini ziyaret edebilirsiniz.
              </p>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowAnnouncementDetail(null)}
                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors"
              >
                Kapat
              </button>
              <a
                href="https://www.konya.bel.tr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-center"
              >
                Web Sitesine Git
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DiscoverFeed;

