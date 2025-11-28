import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Coins, ChevronRight, Hash, Link as LinkIcon, Star, ArrowRight } from 'lucide-react';
import { CURRENT_USER, RELATED_LINKS, WIKI_DATA, COLORS } from '../constants';
import RoleBadge from './RoleBadge';
import { getCoinsToNextRole, getRoleInfo } from '../utils/roleHelpers';

const SidebarRight: React.FC = () => {
  const xpPercentage = (CURRENT_USER.xp / CURRENT_USER.maxXp) * 100;
  const { nextRole, coinsNeeded } = getCoinsToNextRole(CURRENT_USER.coins);
  const currentRoleInfo = getRoleInfo(CURRENT_USER.role);
  const [activeSection, setActiveSection] = useState<string>(WIKI_DATA.headers[0]?.id || '');

  useEffect(() => {
    const handleScroll = () => {
      // Tüm section'ları bul
      const sections = WIKI_DATA.headers.map(header => {
        const element = document.getElementById(header.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          return {
            id: header.id,
            top: rect.top,
            inView: rect.top >= 0 && rect.top <= window.innerHeight / 2
          };
        }
        return null;
      }).filter(Boolean);

      // En üstteki görünür section'ı bul
      const visibleSection = sections.find(section => section && section.top >= -100 && section.top <= 300);
      
      if (visibleSection) {
        setActiveSection(visibleSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // İlk yüklemede çalıştır

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // Header yüksekliği kadar offset
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <aside className="fixed right-0 top-0 h-screen w-80 bg-white border-l border-gray-100 flex flex-col z-20 hidden xl:flex overflow-y-auto custom-scrollbar p-6">
      
      {/* User Stats Widget - Gamification */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <Trophy size={64} color={COLORS.gold} />
        </div>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <img 
              src={CURRENT_USER.avatarUrl} 
              alt={CURRENT_USER.username} 
              className="w-14 h-14 rounded-full border-2 border-white shadow-md object-cover"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-white">
              {CURRENT_USER.level}
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gray-800">{CURRENT_USER.username}</h3>
            <p className="text-xs text-gray-500">Hukuk 2. Sınıf</p>
          </div>
        </div>

        {/* Rol Badge */}
        <div className="mb-4 flex items-center justify-between">
          <RoleBadge role={CURRENT_USER.role} size="medium" showMultiplier={true} />
          <span className="text-xs text-gray-400">{CURRENT_USER.totalContributions} katkı</span>
        </div>

        {/* XP Bar */}
        <div className="mb-3">
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-gray-500">Seviye {CURRENT_USER.level}</span>
            <span className="text-[#00BFA5]">{CURRENT_USER.xp} / {CURRENT_USER.maxXp} XP</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
            <div 
              className="h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${xpPercentage}%`, backgroundColor: COLORS.gold }}
            ></div>
          </div>
        </div>

        {/* Coins */}
        <div className="flex items-center justify-between bg-yellow-50 rounded-lg p-3 border border-yellow-100 mb-4">
           <div className="flex items-center gap-2 text-yellow-700 font-bold">
              <Coins size={18} className="text-yellow-500" fill={COLORS.gold} />
              <span>{CURRENT_USER.coins.toLocaleString()}</span>
           </div>
           <span className="text-xs text-yellow-600 font-medium">GençCoin</span>
        </div>

        {/* Next Role Progress */}
        {nextRole && (
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg p-3 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-600">Bir sonraki rol</span>
              <div className="flex items-center gap-1">
                <RoleBadge role={nextRole} size="small" showName={false} />
                <span className="text-xs font-bold text-gray-700">{getRoleInfo(nextRole).name}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span className="font-semibold">{coinsNeeded.toLocaleString()} Coin</span>
              <ArrowRight size={12} />
              <span>daha gerekli</span>
            </div>
          </div>
        )}
      </div>

      {/* Table of Contents - Sticky Scroll Spy mock */}
      <div className="mb-8">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Hash size={14} />
            İçindekiler
        </h4>
        <ul className="space-y-3 relative border-l-2 border-gray-100 ml-2">
          {WIKI_DATA.headers.map((header) => {
            const isActive = activeSection === header.id;
            return (
              <li key={header.id} className="pl-4 relative">
                {isActive && (
                  <div className="absolute -left-[2px] top-0 bottom-0 w-[2px] bg-[#00BFA5] rounded-full transition-all duration-300"></div>
                )}
                <button 
                  onClick={() => scrollToSection(header.id)}
                  className={`text-sm block transition-all duration-200 text-left w-full hover:translate-x-1 ${
                    isActive 
                      ? 'text-[#00BFA5] font-semibold' 
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {header.text}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Related Topics */}
      <div>
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <LinkIcon size={14} />
            İlgili Konular
        </h4>
        <ul className="space-y-2">
            {RELATED_LINKS.map((link, idx) => (
                <li key={idx}>
                    {link.url.startsWith('/') ? (
                      <Link to={link.url} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                          <span className="text-sm font-medium text-gray-700">{link.title}</span>
                          <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-600" />
                      </Link>
                    ) : (
                      <a href={link.url} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                          <span className="text-sm font-medium text-gray-700">{link.title}</span>
                          <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-600" />
                      </a>
                    )}
                </li>
            ))}
        </ul>
      </div>

    </aside>
  );
};

export default SidebarRight;
