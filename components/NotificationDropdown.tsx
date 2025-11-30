import React, { useState, useRef, useEffect } from 'react';
import { Bell, Coins, MessageCircle, ThumbsUp, TrendingUp, Shield, Megaphone, AtSign, Check, X } from 'lucide-react';
import { Notification, NotificationType } from '../types';
import { COLORS } from '../constants';
import { formatDistanceToNow } from '../utils/dateHelpers';

// Bildirim tiplerine göre ikon ve renk
const getNotificationStyle = (type: NotificationType) => {
  switch (type) {
    case 'coin_earned':
      return { icon: Coins, color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' };
    case 'reply':
      return { icon: MessageCircle, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' };
    case 'like':
      return { icon: ThumbsUp, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
    case 'level_up':
      return { icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' };
    case 'role_change':
      return { icon: Shield, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-200' };
    case 'wiki_edit':
      return { icon: Shield, color: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-200' };
    case 'announcement':
      return { icon: Megaphone, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
    case 'mention':
      return { icon: AtSign, color: 'text-pink-600', bg: 'bg-pink-50', border: 'border-pink-200' };
    default:
      return { icon: Bell, color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200' };
  }
};

interface NotificationDropdownProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDeleteNotification: (id: string) => void;
}

function NotificationDropdown({ 
  notifications, 
  onMarkAsRead, 
  onMarkAllAsRead, 
  onDeleteNotification 
}: NotificationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Dışarı tıklandığında dropdown'u kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      onMarkAsRead(notification.id);
    }
    // Link varsa yönlendir
    if (notification.link) {
      window.location.href = notification.link;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-lg transition-all relative group"
      >
        <Bell size={20} className={`transition-colors ${isOpen ? 'text-[#00BFA5]' : 'text-gray-600 group-hover:text-gray-900'}`} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 min-w-[18px] h-[18px] flex items-center justify-center bg-red-500 text-white text-[10px] font-semibold rounded-full px-1 animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-slideDown">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 text-sm">Bildirimler</h3>
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllAsRead}
                className="text-xs text-[#00BFA5] hover:text-[#009688] font-normal transition-colors"
              >
                Tümünü Okundu İşaretle
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-[480px] overflow-y-auto custom-scrollbar">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell size={48} className="mx-auto mb-3 text-gray-300" />
                <p className="text-sm">Henüz bildiriminiz yok</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => {
                  const style = getNotificationStyle(notification.type);
                  const Icon = style.icon;
                  
                  return (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer relative group ${
                        !notification.read ? 'bg-blue-50/30' : ''
                      }`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      {/* Okunmadı işareti */}
                      {!notification.read && (
                        <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#00BFA5] rounded-full"></div>
                      )}

                      <div className="flex gap-3 pl-3">
                        {/* Icon */}
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full ${style.bg} border ${style.border} flex items-center justify-center`}>
                          <Icon size={18} className={style.color} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className={`text-sm font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                              {notification.title}
                            </h4>
                            {/* Delete Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteNotification(notification.id);
                              }}
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-50 rounded"
                            >
                              <X size={14} className="text-gray-400 hover:text-red-600" />
                            </button>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                            {notification.message}
                          </p>

                          {/* Metadata */}
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>{formatDistanceToNow(notification.timestamp)}</span>
                            {notification.metadata?.amount && (
                              <span className="flex items-center gap-1 text-yellow-600 font-semibold">
                                <Coins size={12} />
                                +{notification.metadata.amount}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Mark as Read Button */}
                      {!notification.read && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onMarkAsRead(notification.id);
                          }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-green-50 rounded"
                          title="Okundu işaretle"
                        >
                          <Check size={16} className="text-green-600" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 text-center">
              <button className="text-sm text-[#00BFA5] hover:text-[#009688] font-normal transition-colors">
                Tüm Bildirimleri Görüntüle
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationDropdown;

