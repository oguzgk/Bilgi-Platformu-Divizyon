import React, { useState } from 'react';
import { Edit2, Clock, ExternalLink, ThumbsUp, ThumbsDown, Wand2, Loader2, Share2, MoreHorizontal, History, X, GitBranch, Link2, BookOpen, Video, FileText } from 'lucide-react';
import { WIKI_DATA, COLORS, COIN_REWARDS, CURRENT_USER } from '../constants';
import { summarizeWikiContent } from '../services/geminiService';
import { useCoinNotification } from './CoinNotification';
import { useNotifications } from '../contexts/NotificationContext';

function WikiSection() {
  const [summary, setSummary] = useState<string | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(124);
  const [downvoteCount, setDownvoteCount] = useState(4);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const { showNotification } = useCoinNotification();
  const { addNotification } = useNotifications();

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

  const handleVote = (voteType: 'up' | 'down') => {
    if (userVote === voteType) {
      // Oy geri çekildi
      if (voteType === 'up') setUpvoteCount(prev => prev - 1);
      else setDownvoteCount(prev => prev - 1);
      setUserVote(null);
    } else {
      // Yeni oy veya değiştirme
      if (userVote === 'up') setUpvoteCount(prev => prev - 1);
      if (userVote === 'down') setDownvoteCount(prev => prev - 1);
      
      if (voteType === 'up') {
        setUpvoteCount(prev => prev + 1);
        // Wiki yazarına coin kazandır (simülasyon)
        const coinAmount = COIN_REWARDS.getUpvoteOnWiki * CURRENT_USER.multiplier;
        showNotification(coinAmount, `"${WIKI_DATA.title}" için oy aldınız`, CURRENT_USER.multiplier);
      } else {
        setDownvoteCount(prev => prev + 1);
      }
      setUserVote(voteType);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    // Simülasyon: Düzenleme yapıldı
    setTimeout(() => {
      const coinAmount = COIN_REWARDS.editWiki * CURRENT_USER.multiplier;
      showNotification(coinAmount, 'Wiki düzenlemesi yaptınız!', CURRENT_USER.multiplier);
      
      // Bildirim oluştur
      addNotification(
        'coin_earned',
        'Coin Kazandın! 🎉',
        `Wiki düzenlemesi için ${coinAmount} coin kazandın!`,
        { amount: coinAmount, contentTitle: WIKI_DATA.title }
      );
      
      setIsEditing(false);
    }, 1500);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link kopyalandı! 📋');
  };

  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showSourceModal, setShowSourceModal] = useState(false);

  const handleViewHistory = () => {
    setShowHistoryModal(true);
  };

  const handleViewSource = () => {
    setShowSourceModal(true);
  };

  // Mock version history
  const versionHistory = [
    {
      id: 'v5',
      editor: 'Ahmet Yılmaz',
      avatar: 'https://i.pravatar.cc/150?img=12',
      timestamp: '2 gün önce',
      changes: '+124 karakter, 3 paragraf eklendi',
      note: 'Medeni Hukuk bölümü genişletildi'
    },
    {
      id: 'v4',
      editor: 'Ayşe Demir',
      avatar: 'https://i.pravatar.cc/150?img=45',
      timestamp: '1 hafta önce',
      changes: '-45 karakter, 1 başlık güncellendi',
      note: 'Roma Hukuku başlığı düzeltildi'
    },
    {
      id: 'v3',
      editor: 'Mehmet Kara',
      avatar: 'https://i.pravatar.cc/150?img=33',
      timestamp: '2 hafta önce',
      changes: '+89 karakter, kaynak eklendi',
      note: 'Anayasa hukuku kaynakları eklendi'
    },
    {
      id: 'v2',
      editor: 'Fatma Arslan',
      avatar: 'https://i.pravatar.cc/150?img=23',
      timestamp: '1 ay önce',
      changes: '+201 karakter, yeni bölüm',
      note: 'Giriş bölümü oluşturuldu'
    },
    {
      id: 'v1',
      editor: 'Ahmet Yılmaz',
      avatar: 'https://i.pravatar.cc/150?img=12',
      timestamp: '2 ay önce',
      changes: 'İlk sürüm',
      note: 'Sayfa oluşturuldu'
    }
  ];

  // Mock sources
  const sources = [
    {
      id: 's1',
      title: 'Selçuk Üniversitesi Hukuk Fakültesi Ders Notları',
      url: 'https://hukuk.selcuk.edu.tr',
      type: 'Resmi Kaynak'
    },
    {
      id: 's2',
      title: 'Prof. Dr. Kemal Gözler - Anayasa Hukuku',
      url: 'https://example.com',
      type: 'Kitap'
    },
    {
      id: 's3',
      title: 'Roma Hukuku Dersleri - YouTube',
      url: 'https://youtube.com',
      type: 'Video'
    },
    {
      id: 's4',
      title: 'Türk Medeni Kanunu (TMK)',
      url: 'https://mevzuat.gov.tr',
      type: 'Mevzuat'
    }
  ];

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

           <button 
             onClick={handleViewHistory}
             className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" 
             title="Geçmiş"
           >
             <History size={18} />
           </button>
           <button 
             onClick={handleViewSource}
             className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" 
             title="Kaynağı Görüntüle"
           >
             <ExternalLink size={18} />
           </button>
           <button 
             onClick={handleEdit}
             disabled={isEditing}
             className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-bold shadow-sm hover:shadow-md transition-all active:scale-95 ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
             style={{ backgroundColor: COLORS.turquoise }}
           >
             {isEditing ? <Loader2 size={16} className="animate-spin" /> : <Edit2 size={16} />}
             {isEditing ? 'Düzenleniyor...' : 'Düzenle'}
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
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm font-medium text-slate-500">Bu içerik yararlı mıydı?</div>
            <div className="flex items-center gap-3">
               <button 
                 onClick={() => handleVote('up')}
                 className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all shadow-sm group ${
                   userVote === 'up' 
                     ? 'bg-[#00BFA5] border-[#00BFA5] text-white' 
                     : 'bg-white border-slate-200 hover:border-[#00BFA5] hover:text-[#00BFA5] text-slate-600'
                 }`}
               >
                  <ThumbsUp 
                    size={16} 
                    className="group-hover:scale-110 transition-transform" 
                    fill={userVote === 'up' ? 'currentColor' : 'none'}
                  />
                  <span>Evet ({upvoteCount})</span>
               </button>
               <button 
                 onClick={() => handleVote('down')}
                 className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all shadow-sm group ${
                   userVote === 'down' 
                     ? 'bg-red-500 border-red-500 text-white' 
                     : 'bg-white border-slate-200 hover:border-red-400 hover:text-red-500 text-slate-600'
                 }`}
               >
                  <ThumbsDown 
                    size={16} 
                    className="group-hover:scale-110 transition-transform mt-1" 
                    fill={userVote === 'down' ? 'currentColor' : 'none'}
                  />
                  <span>Hayır ({downvoteCount})</span>
               </button>
               <button 
                 onClick={handleShare}
                 className="p-2 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 ml-2 transition-colors"
                 title="Paylaş"
               >
                 <Share2 size={18} />
               </button>
            </div>
        </div>
      </div>

      {/* History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowHistoryModal(false)}></div>
          <div className="relative bg-white rounded-2xl p-6 max-w-2xl w-full shadow-2xl animate-slideDown max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setShowHistoryModal(false)}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-lg"
            >
              <X size={20} />
            </button>
            <div className="flex items-center gap-3 mb-6">
              <History size={28} className="text-purple-600" />
              <h3 className="text-2xl font-bold text-gray-900">Sürüm Geçmişi</h3>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Bu sayfanın düzenleme geçmişi. Her değişiklik coin kazandırır!
            </p>
            <div className="space-y-4">
              {versionHistory.map((version, index) => (
                <div
                  key={version.id}
                  className={`p-4 border rounded-xl hover:shadow-md transition-all ${
                    index === 0 ? 'border-purple-300 bg-purple-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={version.avatar}
                      alt={version.editor}
                      className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-gray-900">{version.editor}</h4>
                        {index === 0 && (
                          <span className="bg-purple-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                            SON SÜRÜM
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{version.note}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {version.timestamp}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitBranch size={12} />
                          {version.changes}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Source Modal */}
      {showSourceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowSourceModal(false)}></div>
          <div className="relative bg-white rounded-2xl p-6 max-w-2xl w-full shadow-2xl animate-slideDown">
            <button
              onClick={() => setShowSourceModal(false)}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-lg"
            >
              <X size={20} />
            </button>
            <div className="flex items-center gap-3 mb-6">
              <Link2 size={28} className="text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-900">Kaynaklar</h3>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Bu içeriğin oluşturulmasında kullanılan güvenilir kaynaklar.
            </p>
            <div className="space-y-3">
              {sources.map((source) => {
                const getIcon = () => {
                  switch (source.type) {
                    case 'Resmi Kaynak': return BookOpen;
                    case 'Kitap': return BookOpen;
                    case 'Video': return Video;
                    case 'Mevzuat': return FileText;
                    default: return ExternalLink;
                  }
                };
                const Icon = getIcon();
                
                return (
                  <a
                    key={source.id}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Icon size={18} className="text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                          {source.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">{source.type}</p>
                        <p className="text-xs text-blue-600 mt-1 truncate">{source.url}</p>
                      </div>
                      <ExternalLink size={16} className="text-gray-400 group-hover:text-blue-600 flex-shrink-0" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WikiSection;
