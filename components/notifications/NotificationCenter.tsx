import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, X, Check, Trash2, Filter, ChevronLeft,
  Coins, MessageSquare, ThumbsUp, TrendingUp, Award, Megaphone, UserPlus
} from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';
import { formatTimeAgo } from '../../utils/dateHelpers';
import { Notification, NotificationType } from '../../types';

function NotificationCenter() {
  const { notifications, markAsRead, markAllAsRead, deleteNotification } = useNotifications();
  const [filter, setFilter] = useState<'all' | NotificationType | 'unread'>('all');

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.read;
    return notif.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: NotificationType) => {
    const icons = {
      coin_earned: <Coins size={20} className="text-yellow-600" />,
      reply: <MessageSquare size={20} className="text-blue-600" />,
      like: <ThumbsUp size={20} className="text-green-600" />,
      level_up: <TrendingUp size={20} className="text-purple-600" />,
      role_change: <Award size={20} className="text-amber-600" />,
      wiki_edit: <MessageSquare size={20} className="text-teal-600" />,
      announcement: <Megaphone size={20} className="text-red-600" />,
      mention: <UserPlus size={20} className="text-indigo-600" />,
    };
    return icons[type] || <Bell size={20} className="text-gray-600" />;
  };

  const getNotificationBg = (type: NotificationType) => {
    const bgs = {
      coin_earned: 'bg-yellow-50 border-yellow-200',
      reply: 'bg-blue-50 border-blue-200',
      like: 'bg-green-50 border-green-200',
      level_up: 'bg-purple-50 border-purple-200',
      role_change: 'bg-amber-50 border-amber-200',
      wiki_edit: 'bg-teal-50 border-teal-200',
      announcement: 'bg-red-50 border-red-200',
      mention: 'bg-indigo-50 border-indigo-200',
    };
    return bgs[type] || 'bg-gray-50 border-gray-200';
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-4">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-[#00BFA5] transition-colors font-normal mb-3"
          >
            <ChevronLeft size={20} />
            <span>Ana Sayfaya Dön</span>
          </Link>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#00BFA5] rounded-xl flex items-center justify-center relative">
                <Bell size={24} className="text-white" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Bildirimler</h1>
                <p className="text-sm text-gray-500">{unreadCount} okunmamış bildirim</p>
              </div>
            </div>

            <button
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                unreadCount > 0
                  ? 'bg-[#00BFA5] text-white hover:bg-[#009688]'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Check size={18} />
              Tümünü Okundu İşaretle
            </button>
          </div>
        </div>

      {/* Content */}
      <div className="py-8">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Filter size={16} />
            Filtrele
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'Tümü', count: notifications.length },
              { id: 'unread', label: 'Okunmamış', count: unreadCount },
              { id: 'coin_earned', label: 'Coin', icon: Coins },
              { id: 'reply', label: 'Yanıtlar', icon: MessageSquare },
              { id: 'like', label: 'Beğeniler', icon: ThumbsUp },
              { id: 'level_up', label: 'Seviye', icon: TrendingUp },
              { id: 'announcement', label: 'Duyurular', icon: Megaphone },
            ].map(f => {
              const Icon = f.icon;
              return (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id as any)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                    filter === f.id
                      ? 'bg-[#00BFA5] text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {Icon && <Icon size={16} />}
                  {f.label}
                  {f.count !== undefined && (
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      filter === f.id ? 'bg-white/30' : 'bg-gray-200'
                    }`}>
                      {f.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200">
              <Bell size={64} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Bildirim Yok</h3>
              <p className="text-gray-500">
                {filter === 'unread' 
                  ? 'Tüm bildirimleriniz okundu! 🎉'
                  : 'Henüz hiç bildiriminiz yok.'}
              </p>
            </div>
          ) : (
            filteredNotifications.map(notif => (
              <div
                key={notif.id}
                className={`bg-white rounded-xl shadow-sm border-2 p-5 transition-all hover:shadow-md ${
                  notif.read ? 'border-gray-200' : `${getNotificationBg(notif.type)} border-l-4`
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    notif.read ? 'bg-gray-100' : getNotificationBg(notif.type).split(' ')[0]
                  }`}>
                    {getNotificationIcon(notif.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold mb-1 ${notif.read ? 'text-gray-700' : 'text-gray-900'}`}>
                      {notif.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{notif.message}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{formatTimeAgo(notif.timestamp)}</span>
                      {!notif.read && (
                        <span className="px-2 py-0.5 bg-[#00BFA5] text-white rounded-full font-semibold">
                          Yeni
                        </span>
                      )}
                      {notif.link && (
                        <Link 
                          to={notif.link}
                          className="text-[#00BFA5] hover:text-[#009688] font-normal hover:underline"
                        >
                          Görüntüle →
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {!notif.read && (
                      <button
                        onClick={() => markAsRead(notif.id)}
                        className="p-2 hover:bg-green-50 rounded-lg transition-colors group"
                        title="Okundu işaretle"
                      >
                        <Check size={18} className="text-gray-400 group-hover:text-green-600" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notif.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                      title="Sil"
                    >
                      <Trash2 size={18} className="text-gray-400 group-hover:text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationCenter;

