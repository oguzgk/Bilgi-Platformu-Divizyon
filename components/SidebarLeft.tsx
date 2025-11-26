import React from 'react';
import { Home, Scale, Cpu, Stethoscope, BookOpen, Coffee, Calendar, Settings, LogOut, GraduationCap, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { CATEGORIES, COLORS } from '../constants';

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

const SidebarLeft: React.FC = () => {
  const location = useLocation();

  const isActive = (catId: string) => {
    if (catId === '1' && location.pathname === '/') return true;
    if (catId === 'profile' && location.pathname === '/profile') return true;
    return false;
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
                <Link
                  to={cat.id === '1' ? '/' : cat.id === 'profile' ? '/profile' : '#'}
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
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-100">
        <button className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 w-full rounded-lg hover:bg-gray-50 transition-colors">
          <Settings size={18} />
          Ayarlar
        </button>
        <button className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-500 hover:text-red-600 w-full rounded-lg hover:bg-red-50 transition-colors mt-1">
          <LogOut size={18} />
          Çıkış Yap
        </button>
      </div>
    </aside>
  );
};

export default SidebarLeft;
