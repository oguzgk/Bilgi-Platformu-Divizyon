import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  Save
} from 'lucide-react';
import { COLORS } from '../constants';

const CreateContentPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [sourceLink, setSourceLink] = useState('');

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
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: COLORS.turquoise }}
              >
                K
              </div>
              <span className="text-lg font-bold text-slate-800">Konya Genç Wiki</span>
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
              {/* Başlık */}
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Başlık Giriniz (Örn: Selçuk Hukuk Ders Notları)"
                className="w-full text-2xl md:text-3xl font-bold text-slate-300 placeholder:text-slate-300 focus:text-slate-800 outline-none mb-4 transition-colors"
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
                    <span className="text-amber-700 font-medium italic">Düzenlendi:</span> Bu paragraf son güncelleme ile eklendi ve topluluk tarafından onaylandı.
                  </p>
                </div>

                <p className="text-slate-600 leading-relaxed">
                  Hukuk eğitimi alan öğrenciler için pratik bilgiler ve güncel mevzuat bilgileri düzenli olarak güncellenmektedir.
                </p>
              </div>

              {/* Kaynak Linki */}
              <div className="mt-8">
                <label className="block text-sm font-medium text-slate-700 mb-2">
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
          <div className="mt-6 flex items-center justify-between">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
              <Eye size={18} />
              <span>Önizleme</span>
            </button>

            <button 
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold shadow-lg hover:shadow-xl transition-all active:scale-95"
              style={{ backgroundColor: COLORS.turquoise }}
            >
              <Coins size={18} />
              <span>YAYINLA & COIN KAZAN</span>
            </button>
          </div>
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
                <p className="text-2xl font-bold text-emerald-500">+20 GençCoin</p>
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
            <span className="inline-block px-3 py-1 text-xs font-medium text-sky-600 bg-sky-50 border border-sky-200 rounded-lg">
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
};

export default CreateContentPage;

