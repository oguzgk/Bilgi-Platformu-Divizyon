import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Coins, ChevronRight, Link as LinkIcon, Star, ArrowRight } from 'lucide-react';
import { CURRENT_USER, RELATED_LINKS, COLORS } from '../constants';
import RoleBadge from './RoleBadge';
import { getCoinsToNextRole, getRoleInfo } from '../utils/roleHelpers';

const SidebarRight: React.FC = () => {
  const xpPercentage = (CURRENT_USER.xp / CURRENT_USER.maxXp) * 100;
  const { nextRole, coinsNeeded } = getCoinsToNextRole(CURRENT_USER.coins);
  const currentRoleInfo = getRoleInfo(CURRENT_USER.role);

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

      {/* Leaderboard Quick Link */}
      <div className="mb-6">
        <Link
          to="/leaderboard"
          className="block p-4 bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-xl hover:shadow-lg transition-all hover:-translate-y-1 group"
        >
          <div className="flex items-center gap-3 mb-2">
            <Trophy size={24} className="text-yellow-600 group-hover:animate-bounce" />
            <div>
              <h4 className="font-bold text-gray-900">Liderlik Tablosu</h4>
              <p className="text-xs text-gray-600">En başarılılar</p>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-yellow-200">
            <span>Sıralamayı gör</span>
            <ChevronRight size={16} className="text-yellow-600" />
          </div>
        </Link>
      </div>

      {/* Related Topics */}
      <div>
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <LinkIcon size={14} />
            İlgili Konular
        </h4>
        <ul className="space-y-2">
            {RELATED_LINKS.map((link, idx) => {
              const categoryColors: Record<string, { bg: string, text: string, border: string }> = {
                'Akademik': { 
                  bg: 'bg-teal-50/50 hover:bg-teal-50', 
                  text: 'text-teal-700',
                  border: 'border-teal-100 hover:border-teal-200'
                },
                'Kampüs': { 
                  bg: 'bg-emerald-50/50 hover:bg-emerald-50', 
                  text: 'text-emerald-700',
                  border: 'border-emerald-100 hover:border-emerald-200'
                },
                'Sosyal': { 
                  bg: 'bg-cyan-50/50 hover:bg-cyan-50', 
                  text: 'text-cyan-700',
                  border: 'border-cyan-100 hover:border-cyan-200'
                },
                'Yeme-İçme': { 
                  bg: 'bg-amber-50/50 hover:bg-amber-50', 
                  text: 'text-amber-700',
                  border: 'border-amber-100 hover:border-amber-200'
                },
              };
              const colors = categoryColors[link.category || 'Kampüs'];
              
              return (
                <li key={idx}>
                    <Link 
                      to={link.url} 
                      className={`flex items-start justify-between p-3 rounded-xl border transition-all group ${colors.bg} ${colors.border}`}
                    >
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-[#00BFA5] transition-colors">
                          {link.title}
                        </span>
                        {link.category && (
                          <span className={`inline-block mt-1 text-xs font-semibold ${colors.text}`}>
                            {link.category}
                          </span>
                        )}
                      </div>
                      <ChevronRight size={16} className="text-gray-400 group-hover:text-[#00BFA5] flex-shrink-0 ml-2 mt-0.5" />
                    </Link>
                </li>
              );
            })}
        </ul>
      </div>

    </aside>
  );
};

export default SidebarRight;
