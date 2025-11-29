import React from 'react';
import { X, Home, User, GraduationCap, Coffee, Calendar, Settings, LogOut, Users, Award, Tag, Bell } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { COLORS, CURRENT_USER } from '../constants';
import RoleBadge from './RoleBadge';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout?: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home size={20} />,
  GraduationCap: <GraduationCap size={20} />,
  Coffee: <Coffee size={20} />,
  Calendar: <Calendar size={20} />,
  User: <User size={20} />,
  Users: <Users size={20} />,
  Award: <Award size={20} />,
  Tag: <Tag size={20} />,
  Bell: <Bell size={20} />,
};

function MobileMenu({ isOpen, onClose, onLogout }: MobileMenuProps) {
  const location = useLocation();

  const MENU_ITEMS = [
    { id: '1', name: 'Anasayfa', icon: 'Home', path: '/' },
    { id: 'faculties', name: 'Fakülteler', icon: 'GraduationCap', path: '/faculties' },
    { id: '6', name: 'Kampüs Yaşamı', icon: 'Coffee', path: '/kampus/yasam' },
    { id: '7', name: 'Sosyal Etkinlikler', icon: 'Calendar', path: '/sosyal/etkinlikler' },
    { id: 'profile', name: 'Profilim', icon: 'User', path: '/profile' },
    { id: 'friends', name: 'Arkadaşlar', icon: 'Users', path: '/friends' },
    { id: 'badges', name: 'Rozetler', icon: 'Award', path: '/badges' },
    { id: 'tags', name: 'Etiketler', icon: 'Tag', path: '/tags' },
    { id: 'notifications', name: 'Bildirimler', icon: 'Bell', path: '/notifications' },
  ];

  const isActive = (itemPath: string) => {
    if (itemPath === '/' && location.pathname === '/') return true;
    if (itemPath !== '/' && location.pathname.startsWith(itemPath)) return true;
    return false;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Menu Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-80 bg-white z-50 lg:hidden overflow-y-auto shadow-2xl animate-in slide-in-from-left duration-300">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: COLORS.turquoise }}
            >
              K
            </div>
            <h1 className="text-xl font-bold text-gray-800">Konya Genç Wiki</h1>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
          <div className="flex items-center gap-3 mb-3">
            <img 
              src={CURRENT_USER.avatarUrl}
              alt={CURRENT_USER.username}
              className="w-12 h-12 rounded-full border-2 border-white shadow-md"
            />
            <div>
              <h3 className="font-bold text-gray-800">@{CURRENT_USER.username}</h3>
              <p className="text-xs text-gray-500">Level {CURRENT_USER.level}</p>
            </div>
          </div>
          <RoleBadge role={CURRENT_USER.role} size="small" showMultiplier={true} />
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Menü</p>
          <ul className="space-y-1">
            {MENU_ITEMS.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? `bg-[#F0F4F8] text-[#00BFA5]`
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className={isActive(item.path) ? 'text-[#00BFA5]' : 'text-gray-400'}>
                    {iconMap[item.icon]}
                  </span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-100 absolute bottom-0 left-0 right-0 bg-white">
          <Link 
            to="/settings"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 w-full rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Settings size={18} />
            Ayarlar
          </Link>
          <button 
            onClick={() => {
              onLogout?.();
              onClose();
            }}
            className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-500 hover:text-red-600 w-full rounded-lg hover:bg-red-50 transition-colors mt-1"
          >
            <LogOut size={18} />
            Çıkış Yap
          </button>
        </div>
      </aside>
    </>
  );
}

export default MobileMenu;

