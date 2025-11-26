import React from 'react';
import { Trophy, Coins, ChevronRight, Hash, Link as LinkIcon, Star } from 'lucide-react';
import { CURRENT_USER, RELATED_LINKS, WIKI_DATA, COLORS } from '../constants';

const SidebarRight: React.FC = () => {
  const xpPercentage = (CURRENT_USER.xp / CURRENT_USER.maxXp) * 100;

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
        <div className="flex items-center justify-between bg-yellow-50 rounded-lg p-3 border border-yellow-100">
           <div className="flex items-center gap-2 text-yellow-700 font-bold">
              <Coins size={18} className="text-yellow-500" fill={COLORS.gold} />
              <span>{CURRENT_USER.coins}</span>
           </div>
           <span className="text-xs text-yellow-600 font-medium">SelçukCoin</span>
        </div>
      </div>

      {/* Table of Contents - Sticky Scroll Spy mock */}
      <div className="mb-8">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Hash size={14} />
            İçindekiler
        </h4>
        <ul className="space-y-3 relative border-l-2 border-gray-100 ml-2">
          {WIKI_DATA.headers.map((header, idx) => (
            <li key={header.id} className="pl-4 relative">
              {idx === 0 && (
                <div className="absolute -left-[2px] top-0 bottom-0 w-[2px] bg-[#00BFA5] rounded-full"></div>
              )}
              <a 
                href={`#${header.id}`} 
                className={`text-sm block transition-colors ${idx === 0 ? 'text-[#00BFA5] font-semibold' : 'text-gray-500 hover:text-gray-800'}`}
              >
                {header.text}
              </a>
            </li>
          ))}
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
                    <a href={link.url} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                        <span className="text-sm font-medium text-gray-700">{link.title}</span>
                        <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-600" />
                    </a>
                </li>
            ))}
        </ul>
      </div>

    </aside>
  );
};

export default SidebarRight;
