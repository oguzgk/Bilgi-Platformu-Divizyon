import React, { useState } from 'react';
import { Edit2, Clock, ExternalLink, ThumbsUp, ThumbsDown, Wand2, Loader2, Share2, MoreHorizontal } from 'lucide-react';
import { WIKI_DATA, COLORS } from '../constants';
import { summarizeWikiContent } from '../services/geminiService';

const WikiSection: React.FC = () => {
  const [summary, setSummary] = useState<string | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(false);

  const handleSummarize = async () => {
    if (summary) {
      setSummary(null); // Toggle off
      return;
    }
    setLoadingSummary(true);
    // Strip HTML tags for the prompt to save tokens (simple regex)
    const cleanText = WIKI_DATA.content.replace(/<[^>]*>?/gm, '');
    const result = await summarizeWikiContent(cleanText);
    setSummary(result);
    setLoadingSummary(false);
  };

  return (
    <div className="rounded-3xl overflow-hidden shadow-sm border border-slate-200/60 mb-8 transition-all hover:shadow-md">
      {/* Header / Meta Bar */}
      <div className="bg-white border-b border-slate-100 px-8 py-5 flex items-center justify-between sticky top-0 z-10 opacity-95 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-sm text-gray-500">
           <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded text-xs font-medium text-slate-600">
             <Clock size={12} />
             {WIKI_DATA.lastUpdated}
           </span>
           <span className="text-slate-300">|</span>
           <span>Yazar: <span className="text-[#00BFA5] font-medium cursor-pointer hover:underline">{WIKI_DATA.author}</span></span>
        </div>
        
        <div className="flex items-center gap-2">
           <button 
             onClick={handleSummarize}
             className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors border border-purple-100"
             title="AI ile Özetle"
           >
             {loadingSummary ? <Loader2 size={14} className="animate-spin" /> : <Wand2 size={14} />}
             {summary ? 'Özeti Kapat' : 'AI Özet'}
           </button>
           
           <div className="h-4 w-px bg-slate-200 mx-1"></div>

           <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="Geçmiş">
             <Clock size={18} />
           </button>
           <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="Kaynağı Görüntüle">
             <ExternalLink size={18} />
           </button>
           <button 
             className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-bold shadow-sm hover:shadow-md transition-all active:scale-95 ml-2"
             style={{ backgroundColor: COLORS.turquoise }}
           >
             <Edit2 size={16} />
             Düzenle
           </button>
        </div>
      </div>

      {/* Wiki Content Body - Pale Ice Blue Background */}
      <div className="p-8 md:p-12 relative min-h-[400px]" style={{ backgroundColor: COLORS.wikiBg }}>
        
        <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-8 tracking-tight leading-tight">
          {WIKI_DATA.title}
        </h1>

        {/* AI Summary Card */}
        {summary && (
          <div className="mb-8 bg-white/80 border border-purple-100 p-6 rounded-2xl shadow-sm backdrop-blur-sm relative animate-in fade-in slide-in-from-top-4">
             <div className="absolute top-0 left-0 w-1 h-full bg-purple-400 rounded-l-2xl"></div>
             <div className="flex items-start gap-3">
               <div className="p-2 bg-purple-100 rounded-lg text-purple-600 mt-1">
                 <Wand2 size={18} />
               </div>
               <div>
                 <h4 className="text-sm font-bold text-purple-900 mb-1">Gemini Özeti</h4>
                 <p className="text-slate-700 leading-relaxed text-sm">{summary}</p>
               </div>
             </div>
          </div>
        )}

        {/* Main Text Content */}
        <div 
          className="prose prose-slate prose-lg max-w-none text-slate-700 wiki-content"
          dangerouslySetInnerHTML={{ __html: WIKI_DATA.content }}
        ></div>

        {/* Voting Footer */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex items-center justify-between">
            <div className="text-sm font-medium text-slate-500">Bu içerik yararlı mıydı?</div>
            <div className="flex items-center gap-3">
               <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 hover:border-[#00BFA5] hover:text-[#00BFA5] text-slate-600 transition-all shadow-sm group">
                  <ThumbsUp size={16} className="group-hover:scale-110 transition-transform" />
                  <span>Evet (124)</span>
               </button>
               <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 hover:border-red-400 hover:text-red-500 text-slate-600 transition-all shadow-sm group">
                  <ThumbsDown size={16} className="group-hover:scale-110 transition-transform mt-1" />
                  <span>Hayır (4)</span>
               </button>
               <button className="p-2 rounded-full hover:bg-slate-200 text-slate-400 ml-2">
                 <Share2 size={18} />
               </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default WikiSection;
