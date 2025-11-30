import React, { useState } from 'react';
import { Home, Scale, Cpu, Stethoscope, BookOpen, Coffee, Calendar, Settings, LogOut, GraduationCap, User, X, ExternalLink, TrendingUp, Trophy, Award, Tag, Bell, Shield, BarChart3, Users } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CATEGORIES, COLORS, CATEGORY_CONTENT } from '../constants';
import { useNotifications } from '../contexts/NotificationContext';

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home size={20} />,
  GraduationCap: <GraduationCap size={20} />,
  Scale: <Scale size={20} />,
  Cpu: <Cpu size={20} />,
  Stethoscope: <Stethoscope size={20} />,
  BookOpen: <BookOpen size={20} />,
  Coffee: <Coffee size={20} />,
  Calendar: <Calendar size={20} />,
  User: <User size={20} />,
  Users: <Users size={20} />,
  Trophy: <Trophy size={20} />,
  Award: <Award size={20} />,
  Tag: <Tag size={20} />,
  Bell: <Bell size={20} />,
  Shield: <Shield size={20} />,
  BarChart3: <BarChart3 size={20} />,
};

interface SidebarLeftProps {
  onLogout?: () => void;
}

const SidebarLeft: React.FC<SidebarLeftProps> = ({ onLogout }) => {
  const location = useLocation();
  const [showCategoryModal, setShowCategoryModal] = useState<{ id: string; name: string } | null>(null);
  const { addNotification } = useNotifications();

  const MENU_ITEMS = [
    { id: '1', name: 'Anasayfa', icon: 'Home', path: '/' },
    { id: 'faculties', name: 'Fakülteler', icon: 'GraduationCap', path: '/faculties' },
    { id: '6', name: 'Kampüs Yaşamı', icon: 'Coffee', path: '/kampus' },
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

  const handleCategoryClick = (category: { id: string; name: string; }) => {
    setShowCategoryModal(category);
    addNotification(
      'announcement',
      `${category.name} Kategorisi`,
      `${category.name} kategorisini görüntülüyorsunuz.`,
      { contentTitle: category.name }
    );
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-100 flex flex-col z-20 hidden lg:flex">
      {/* Brand */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-semibold" style={{ backgroundColor: COLORS.turquoise }}>
          K
        </div>
        <h1 className="text-xl font-semibold text-gray-800 tracking-tight">Konya Genç Wiki</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 overflow-y-auto custom-scrollbar">
        <div className="mb-6">
          <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Menü</p>
          <ul className="space-y-1">
            {MENU_ITEMS.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-normal transition-colors ${isActive(item.path)
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
        </div>
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-100">
        <Link
          to="/settings"
          className="flex items-center gap-3 px-4 py-2 text-sm font-normal text-gray-600 hover:text-gray-900 w-full rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Settings size={18} />
          Ayarlar
        </Link>
        <button 
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-2 text-sm font-normal text-red-500 hover:text-red-600 w-full rounded-lg hover:bg-red-50 transition-colors mt-1"
        >
          <LogOut size={18} />
          Çıkış Yap
        </button>
      </div>


      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50" 
            onClick={() => setShowCategoryModal(null)}
          ></div>
          <div className="relative bg-white rounded-2xl p-6 max-w-2xl w-full shadow-2xl animate-slideDown max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowCategoryModal(null)}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-lg"
            >
              <X size={20} />
            </button>
            
            {/* Header */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#00BFA5] to-teal-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                <span className="text-3xl">{iconMap[CATEGORIES.find(c => c.id === showCategoryModal.id)?.icon || 'Home']}</span>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900">{CATEGORY_CONTENT[showCategoryModal.id]?.title || showCategoryModal.name}</h3>
                <p className="text-sm text-gray-500">{CATEGORY_CONTENT[showCategoryModal.id]?.description || 'Kategori açıklaması'}</p>
              </div>
            </div>

            {CATEGORY_CONTENT[showCategoryModal.id] ? (
              <>
                {/* Popüler Başlıklar */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <TrendingUp size={16} />
                    Popüler Başlıklar
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {CATEGORY_CONTENT[showCategoryModal.id].popularTopics.map((topic, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setShowCategoryModal(null);
                          // TODO: Başlığa yönlendir
                        }}
                        className="text-left p-3 bg-gray-50 hover:bg-[#00BFA5]/10 border border-gray-200 hover:border-[#00BFA5] rounded-lg transition-all group"
                      >
                        <span className="text-sm font-normal text-gray-700 group-hover:text-[#00BFA5] transition-colors">
                          {topic}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hızlı Linkler */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <ExternalLink size={16} />
                    Hızlı Erişim
                  </h4>
                  <div className="space-y-2">
                    {CATEGORY_CONTENT[showCategoryModal.id].quickLinks.map((link, idx) => (
                      <Link
                        key={idx}
                        to={link.url}
                        onClick={() => setShowCategoryModal(null)}
                        className="flex items-center justify-between p-3 bg-white border border-gray-200 hover:border-[#00BFA5] hover:shadow-md rounded-lg transition-all group"
                      >
                        <span className="text-sm font-normal text-gray-700 group-hover:text-[#00BFA5] transition-colors">
                          {link.title}
                        </span>
                        <ExternalLink size={14} className="text-gray-400 group-hover:text-[#00BFA5] transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-sm text-gray-700">
                    <strong className="text-[#00BFA5]">💡 İpucu:</strong> Bu kategorideki içeriklere katkıda bulunarak coin kazanabilir ve rolünüzü yükseltebilirsiniz!
                  </p>
                </div>
              </>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-700">
                  <strong>Yakında:</strong> Bu kategori içerikleri hazırlanıyor...
                </p>
              </div>
            )}

            {/* Action Button */}
            <button
              onClick={() => setShowCategoryModal(null)}
              className="w-full mt-4 px-4 py-3 bg-[#00BFA5] hover:bg-[#009688] text-white font-semibold rounded-xl transition-colors"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default SidebarLeft;
