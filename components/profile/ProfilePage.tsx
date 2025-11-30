import React, { useState } from 'react';
import ProfileSidebar from './ProfileSidebar';
import ProfileContent from './ProfileContent';
import { Home, GraduationCap, Coffee, Calendar, Settings, LogOut, User, X, Menu, Trophy, Award, Tag, Bell, Shield, BarChart3, Users } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { COLORS } from '../../constants';
import { useNotifications } from '../../contexts/NotificationContext';

// İkon haritası - SidebarLeft ile aynı
const iconMap: Record<string, React.ReactNode> = {
    Home: <Home size={20} />,
    GraduationCap: <GraduationCap size={20} />,
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

interface ProfilePageProps {
    onLogout?: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onLogout }) => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

    // Aktif menü öğesini kontrol et
    const isActive = (itemPath: string) => {
        if (itemPath === '/' && location.pathname === '/') return true;
        if (itemPath !== '/' && location.pathname.startsWith(itemPath)) return true;
        return false;
    };

    return (
        <div className="min-h-screen bg-seljuk-ice">
            {/* Sol Menü - Masaüstü için */}
            <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-100 flex-col z-20 hidden lg:flex">
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
            </aside>

            {/* Mobil Menü Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}></div>
                    <aside className="absolute left-0 top-0 h-screen w-64 bg-white border-r border-gray-100 flex flex-col animate-slideIn">
                        {/* Brand */}
                        <div className="p-6 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-semibold" style={{ backgroundColor: COLORS.turquoise }}>
                                    K
                                </div>
                                <h1 className="text-xl font-semibold text-gray-800 tracking-tight">Konya Genç Wiki</h1>
                            </div>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                                <X size={20} />
                            </button>
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
                                                onClick={() => setIsMobileMenuOpen(false)}
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
                                onClick={() => setIsMobileMenuOpen(false)}
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
                    </aside>
                </div>
            )}

            {/* Mobil Header */}
            <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <Menu size={24} className="text-gray-600" />
                </button>
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-semibold text-sm" style={{ backgroundColor: COLORS.turquoise }}>
                        K
                    </div>
                    <span className="text-lg font-semibold text-gray-800">Profilim</span>
                </div>
            </div>

            {/* Ana İçerik */}
            <div className="lg:ml-64 p-4 md:p-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Sidebar (Identity & Wallet Control) - ~30% */}
                    <div className="lg:col-span-4 xl:col-span-4 h-full">
                        <ProfileSidebar />
                    </div>

                    {/* Right Main Area (Activity Log & Stats) - ~70% */}
                    <div className="lg:col-span-8 xl:col-span-8">
                        <ProfileContent />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ProfilePage;
