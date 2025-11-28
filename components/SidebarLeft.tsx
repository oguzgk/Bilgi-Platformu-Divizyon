import React, { useState } from 'react';
import { Home, Scale, Cpu, Stethoscope, BookOpen, Coffee, Calendar, Settings, LogOut, GraduationCap, User, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CATEGORIES, COLORS } from '../constants';
import { useNotifications } from '../contexts/NotificationContext';

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home size={20} />,
  Scale: <Scale size={20} />,
  Cpu: <Cpu size={20} />,
  Stethoscope: <Stethoscope size={20} />,
  BookOpen: <BookOpen size={20} />,
  Coffee: <Coffee size={20} />,
  Calendar: <Calendar size={20} />,
  User: <User size={20} />,
};

interface SidebarLeftProps {
  onLogout?: () => void;
}

const SidebarLeft: React.FC<SidebarLeftProps> = ({ onLogout }) => {
  const location = useLocation();
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState<{ id: string; name: string } | null>(null);
  const { addNotification } = useNotifications();

  const isActive = (catId: string) => {
    if (catId === '1' && location.pathname === '/') return true;
    if (catId === 'profile' && location.pathname === '/profile') return true;
    return false;
  };

  const handleCategoryClick = (category: { id: string; name: string; }) => {
    if (category.id === '1' || category.id === 'profile') {
      return; // Ana sayfa ve profil zaten yönlendiriliyor
    }
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
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold" style={{ backgroundColor: COLORS.turquoise }}>
          K
        </div>
        <h1 className="text-xl font-bold text-gray-800 tracking-tight">Konya Genç Wiki</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 overflow-y-auto custom-scrollbar">
        <div className="mb-6">
          <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Menü</p>
          <ul className="space-y-1">
            {CATEGORIES.map((cat) => (
              <li key={cat.id}>
                {cat.id === '1' || cat.id === 'profile' ? (
                  <Link
                    to={cat.id === '1' ? '/' : '/profile'}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive(cat.id)
                        ? `bg-[#F0F4F8] text-[#00BFA5]`
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                  >
                    <span className={isActive(cat.id) ? 'text-[#00BFA5]' : 'text-gray-400'}>
                      {iconMap[cat.icon]}
                    </span>
                    {cat.name}
                  </Link>
                ) : (
                  <button
                    onClick={() => handleCategoryClick(cat)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  >
                    <span className="text-gray-400">
                      {iconMap[cat.icon]}
                    </span>
                    {cat.name}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-100">
        <button 
          onClick={() => setShowSettingsModal(true)}
          className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 w-full rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Settings size={18} />
          Ayarlar
        </button>
        <button 
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-500 hover:text-red-600 w-full rounded-lg hover:bg-red-50 transition-colors mt-1"
        >
          <LogOut size={18} />
          Çıkış Yap
        </button>
      </div>

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50" 
            onClick={() => setShowSettingsModal(false)}
          ></div>
          <div className="relative bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl animate-slideDown">
            <button
              onClick={() => setShowSettingsModal(false)}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-lg"
            >
              <X size={20} />
            </button>
            <div className="flex items-center gap-3 mb-6">
              <Settings size={28} className="text-[#00BFA5]" />
              <h3 className="text-2xl font-bold text-gray-900">Ayarlar</h3>
            </div>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors">
                <h4 className="font-semibold text-gray-900">Hesap Ayarları</h4>
                <p className="text-sm text-gray-500">Profil bilgilerini düzenle</p>
              </button>
              <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors">
                <h4 className="font-semibold text-gray-900">Bildirim Tercihleri</h4>
                <p className="text-sm text-gray-500">Hangi bildirimleri almak istediğini seç</p>
              </button>
              <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors">
                <h4 className="font-semibold text-gray-900">Gizlilik</h4>
                <p className="text-sm text-gray-500">Gizlilik ayarlarını yönet</p>
              </button>
              <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors">
                <h4 className="font-semibold text-gray-900">Tema</h4>
                <p className="text-sm text-gray-500">Açık/Koyu mod seçenekleri</p>
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center mt-6">
              Detaylı ayarlar yakında eklenecek 🚀
            </p>
          </div>
        </div>
      )}

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50" 
            onClick={() => setShowCategoryModal(null)}
          ></div>
          <div className="relative bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl animate-slideDown">
            <button
              onClick={() => setShowCategoryModal(null)}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-lg"
            >
              <X size={20} />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#00BFA5] rounded-xl flex items-center justify-center">
                {iconMap[CATEGORIES.find(c => c.id === showCategoryModal.id)?.icon || 'Home']}
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{showCategoryModal.name}</h3>
            </div>
            <p className="text-gray-600 mb-6">
              {showCategoryModal.name} kategorisine ait içerikler yakında eklenecek!
            </p>
            <div className="bg-gradient-to-r from-[#00BFA5]/10 to-teal-500/10 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-700">
                <strong>Çok Yakında:</strong> Bu kategoride wiki maddeleri, yorumlar ve kullanıcı katkılarını görebileceksiniz.
              </p>
            </div>
            <button
              onClick={() => setShowCategoryModal(null)}
              className="w-full px-4 py-3 bg-[#00BFA5] hover:bg-[#009688] text-white font-bold rounded-xl transition-colors"
            >
              Anladım
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default SidebarLeft;
