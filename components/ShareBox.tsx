import React from 'react';
import { Link } from 'react-router-dom';
import { Image as ImageIcon, Users, Smile } from 'lucide-react';

const ShareBox: React.FC = () => {
  return (
    <div className="mb-6 md:mb-8 rounded-2xl bg-white shadow-sm border border-slate-200/70">
      {/* Üst kısım: avatar + başlık butonu */}
      <div className="px-4 md:px-5 pt-4 pb-3 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-sky-400 to-emerald-400 flex items-center justify-center text-white text-sm font-semibold shadow-sm">
          H
        </div>
        <Link 
          to="/create" 
          className="flex-1 text-left text-sm md:text-base font-semibold text-slate-700 hover:text-sky-600 transition-colors"
        >
          Bugün Aklında Ne Var!
        </Link>
      </div>

      {/* Alt kısım: aksiyon butonları */}
      <div className="px-4 md:px-5 pt-2 pb-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs md:text-sm">
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors">
          <ImageIcon size={16} className="text-emerald-500" />
          <span>Fotoğraf / Video</span>
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors">
          <Users size={16} className="text-sky-500" />
          <span>Arkadaşını Etiketle</span>
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors">
          <Smile size={16} className="text-amber-500" />
          <span>Duygu / Aktivite</span>
        </button>
      </div>
    </div>
  );
};

export default ShareBox;


