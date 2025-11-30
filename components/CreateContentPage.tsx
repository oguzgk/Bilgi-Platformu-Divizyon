import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Bold, 
  Italic, 
  Link as LinkIcon, 
  Heading1, 
  Heading2, 
  Quote, 
  Image as ImageIcon,
  Eye,
  Coins,
  CheckCircle2,
  Clock,
  Lightbulb,
  Save,
  Loader2,
  X
} from 'lucide-react';
import { COLORS, COIN_REWARDS, CURRENT_USER } from '../constants';
import { useCoinNotification } from './CoinNotification';
import { formatTimeAgo } from '../utils/dateHelpers';

function CreateContentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [sourceLink, setSourceLink] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const { showNotification } = useCoinNotification();
  
  // ShareBox'tan gelen veriler
  const [feeling, setFeeling] = useState<{ emoji: string; label: string } | null>(null);
  const [taggedFriends, setTaggedFriends] = useState<string[]>([]);

  useEffect(() => {
    if (location.state) {
      const state = location.state as any;
      if (state.feeling) {
        setFeeling(state.feeling);
      }
      if (state.taggedFriends) {
        setTaggedFriends(state.taggedFriends);
      }
    }
  }, [location]);

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      alert('Başlık ve içerik gereklidir!');
      return;
    }

    setIsPublishing(true);
    
    // Simülasyon: Yayınlanıyor
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Coin kazandır
    const coinAmount = COIN_REWARDS.createTopic * CURRENT_USER.multiplier;
    showNotification(coinAmount, 'Yeni başlık oluşturdunuz!', CURRENT_USER.multiplier);
    
    // Yeni içeriği localStorage'a kaydet
    const newWikiEdit = {
      id: `w_${Date.now()}`,
      title: title.trim(),
      category: 'Genel', // Varsayılan kategori, gerçek uygulamada seçilebilir
      editDate: new Date().toISOString(),
      status: 'pending' as const,
      upvotes: 0,
      downvotes: 0,
      coinsEarned: coinAmount,
      userVote: null as const,
    };
    
    // localStorage'dan mevcut içerikleri al
    const existingContents = localStorage.getItem('userWikiEdits');
    const contents = existingContents ? JSON.parse(existingContents) : [];
    
    // Yeni içeriği başa ekle
    contents.unshift(newWikiEdit);
    
    // localStorage'a kaydet
    localStorage.setItem('userWikiEdits', JSON.stringify(contents));
    
    setIsPublishing(false);
    
    // Ana sayfaya yönlendir
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  const toolbarButtons = [
    { icon: Bold, label: 'Kalın' },
    { icon: Italic, label: 'İtalik' },
    { icon: LinkIcon, label: 'Link' },
    { icon: Heading1, label: 'Başlık 1' },
    { icon: Heading2, label: 'Başlık 2' },
    { icon: Quote, label: 'Alıntı' },
    { icon: ImageIcon, label: 'Görsel' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-semibold text-sm"
                style={{ backgroundColor: COLORS.turquoise }}
              >
                K
              </div>
              <span className="text-lg font-semibold text-slate-800">Konya Genç Wiki</span>
            </Link>
            <span className="text-slate-300">|</span>
            <span className="text-sm text-slate-500">Yeni İçerik Oluştur</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Save size={16} />
            <span>Otomatik Kaydedildi</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        {/* Sol: Ana içerik editörü */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Toolbar */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-1">
              {toolbarButtons.map((btn, idx) => (
                <button
                  key={idx}
                  className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
                  title={btn.label}
                >
                  <btn.icon size={18} />
                </button>
              ))}
            </div>

            {/* Editör Alanı */}
            <div className="p-6 md:p-8 min-h-[500px]">
              {/* Duygu ve Etiketlenen Arkadaşlar */}
              {(feeling || taggedFriends.length > 0) && (
                <div className="mb-6 flex flex-wrap items-center gap-2">
                  {feeling && (
                    <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                      <span className="text-2xl">{feeling.emoji}</span>
                      <span className="text-sm font-normal text-amber-700">Kendini {feeling.label} hissediyor</span>
                      <button
                        onClick={() => setFeeling(null)}
                        className="ml-2 text-amber-600 hover:text-amber-800"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                  {taggedFriends.length > 0 && (
                    <div className="flex items-center gap-2 bg-sky-50 border border-sky-200 rounded-lg px-3 py-2">
                      <span className="text-sm font-normal text-sky-700">
                        {taggedFriends.length} arkadaş etiketlendi
                      </span>
                      <button
                        onClick={() => setTaggedFriends([])}
                        className="ml-2 text-sky-600 hover:text-sky-800"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>
              )}
              
              {/* Başlık */}
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Başlık Giriniz (Örn: Selçuk Hukuk Ders Notları)"
                className="w-full text-2xl md:text-3xl font-semibold text-slate-300 placeholder:text-slate-300 focus:text-slate-800 outline-none mb-4 transition-colors"
              />

              {/* İçerik */}
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="İçeriğinizi buraya yazın... Wiki formatında bilgi paylaşımı yapabilirsiniz."
                className="w-full min-h-[350px] text-slate-400 placeholder:text-slate-400 focus:text-slate-700 outline-none resize-none leading-relaxed"
              />

              {/* Örnek içerik bloğu - sarı arka planlı */}
              <div className="mt-6 space-y-4">
                <p className="text-slate-600 leading-relaxed">
                  Bu bölümde Selçuk Üniversitesi Hukuk Fakültesi'nde verilen temel derslerin içeriklerini bulabilirsiniz. Ders notları, sınav örnekleri ve kaynak önerileri ile akademik başarınızı artırabilirsiniz.
                </p>
                
                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                  <p className="text-slate-700">
                    <span className="text-amber-700 font-normal italic">Düzenlendi:</span> Bu paragraf son güncelleme ile eklendi ve topluluk tarafından onaylandı.
                  </p>
                </div>

                <p className="text-slate-600 leading-relaxed">
                  Hukuk eğitimi alan öğrenciler için pratik bilgiler ve güncel mevzuat bilgileri düzenli olarak güncellenmektedir.
                </p>
              </div>

              {/* Kaynak Linki */}
              <div className="mt-8">
                <label className="block text-sm font-normal text-slate-700 mb-2">
                  Kaynak Linki / Referans <span className="text-emerald-500">*</span>
                </label>
                <input
                  type="url"
                  value={sourceLink}
                  onChange={(e) => setSourceLink(e.target.value)}
                  placeholder="https://example.com/kaynak veya kitap/makale adı"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-600 placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Alt butonlar */}
          <div className="mt-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <button 
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
            >
              <Eye size={18} />
              <span>{showPreview ? 'Düzenlemeye Dön' : 'Önizleme'}</span>
            </button>

            <button 
              onClick={handlePublish}
              disabled={!title.trim() || !content.trim() || isPublishing}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: COLORS.turquoise }}
            >
              {isPublishing ? <Loader2 size={18} className="animate-spin" /> : <Coins size={18} />}
              <span>{isPublishing ? 'YAYINLANIYOR...' : 'YAYINLA & COIN KAZAN'}</span>
            </button>
          </div>

          {/* Önizleme Modal */}
          {showPreview && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-semibold">Önizleme</h3>
                  <button 
                    onClick={() => setShowPreview(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                <h1 className="text-3xl font-semibold mb-4">{title || 'Başlık girilmedi'}</h1>
                <div className="prose max-w-none">
                  <p className="whitespace-pre-wrap">{content || 'İçerik girilmedi'}</p>
                </div>
                {sourceLink && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Kaynak: <a href={sourceLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{sourceLink}</a></p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sağ: Bilgi kartları */}
        <div className="hidden lg:block w-80 space-y-4">
          {/* Potansiyel Kazanç */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center">
                <Coins size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-700">Potansiyel Kazanç</h3>
                <p className="text-2xl font-semibold text-emerald-500">+20 GençCoin</p>
                <p className="text-xs text-slate-500 mt-1">
                  Bu katkı sana ödül kazandıracak! Kaliteli içerik üret, coin kazan.
                </p>
              </div>
            </div>
          </div>

          {/* İçerik Kuralları */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
            <h3 className="font-semibold text-slate-700 mb-3">İçerik Kuralları</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-slate-600">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>Objektif bilgi girin</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-600">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>Reklam dili kullanmayın</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-600">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>Kaynak belirtin</span>
              </li>
            </ul>
          </div>

          {/* Versiyon Kontrolü */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
            <h3 className="font-semibold text-slate-700 mb-3">Versiyon Kontrolü</h3>
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
              <Clock size={14} />
              <span>Son düzenleme: 10 dk önce</span>
            </div>
            <span className="inline-block px-3 py-1 text-xs font-normal text-sky-600 bg-sky-50 border border-sky-200 rounded-lg">
              Taslak
            </span>
          </div>

          {/* İpucu */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-sm border border-amber-200/50 p-5">
            <div className="flex items-start gap-2 mb-2">
              <Lightbulb size={18} className="text-amber-500 mt-0.5" />
              <h3 className="font-semibold text-slate-700">İpucu</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Başlığınızı açıklayıcı tutun ve içeriğinizi bölümlere ayırın. Bu, okuyucuların bilgiyi daha kolay bulmasını sağlar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateContentPage;

