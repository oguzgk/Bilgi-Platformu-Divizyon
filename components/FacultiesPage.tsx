import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Scale, Cpu, Stethoscope, BookOpen, ChevronRight, TrendingUp, Users, ExternalLink, GraduationCap } from 'lucide-react';
import { CATEGORY_CONTENT } from '../constants';

const iconMap: Record<string, React.ReactNode> = {
  Scale: <Scale size={32} />,
  Cpu: <Cpu size={32} />,
  Stethoscope: <Stethoscope size={32} />,
  BookOpen: <BookOpen size={32} />,
};

// Üniversiteler ve renkleri - Ana renk paletinin tonlarında
const UNIVERSITIES = [
  { 
    id: 'selcuk', 
    name: 'Selçuk Üniversitesi', 
    shortName: 'Selçuk Ü.',
    color: 'from-[#00BFA5] to-teal-600', // Ana turkuaz renk
    bgColor: 'bg-[#00BFA5]',
    hoverColor: 'hover:bg-teal-600',
    borderColor: 'border-[#00BFA5]',
    textColor: 'text-[#00BFA5]'
  },
  { 
    id: 'konya-teknik', 
    name: 'Konya Teknik Üniversitesi', 
    shortName: 'KTO Ü.',
    color: 'from-teal-400 to-cyan-600', // Daha açık turkuaz/cyan
    bgColor: 'bg-teal-400',
    hoverColor: 'hover:bg-cyan-600',
    borderColor: 'border-teal-400',
    textColor: 'text-teal-500'
  },
  { 
    id: 'kto-karatay', 
    name: 'KTO Karatay Üniversitesi', 
    shortName: 'Karatay Ü.',
    color: 'from-emerald-500 to-teal-700', // Yeşil-turkuaz arası
    bgColor: 'bg-emerald-500',
    hoverColor: 'hover:bg-teal-700',
    borderColor: 'border-emerald-500',
    textColor: 'text-emerald-600'
  },
  { 
    id: 'gida-tarim', 
    name: 'Konya Gıda-Tarım Üniversitesi', 
    shortName: 'Gıda-Tarım Ü.',
    color: 'from-cyan-500 to-teal-600', // Cyan-teal tonu
    bgColor: 'bg-cyan-500',
    hoverColor: 'hover:bg-teal-600',
    borderColor: 'border-cyan-500',
    textColor: 'text-cyan-600'
  },
  { 
    id: 'necmettin-erbakan', 
    name: 'Necmettin Erbakan Üniversitesi', 
    shortName: 'NEÜ',
    color: 'from-teal-600 to-emerald-700', // Koyu teal-emerald
    bgColor: 'bg-teal-600',
    hoverColor: 'hover:bg-emerald-700',
    borderColor: 'border-teal-600',
    textColor: 'text-teal-700'
  },
];

const FACULTIES = [
  { 
    id: '2', 
    name: 'Hukuk Fakültesi', 
    icon: 'Scale',
    stats: { topics: 156, students: 2340 }
  },
  { 
    id: '3', 
    name: 'Mühendislik Fakültesi', 
    icon: 'Cpu',
    stats: { topics: 289, students: 4521 }
  },
  { 
    id: '4', 
    name: 'Tıp Fakültesi', 
    icon: 'Stethoscope',
    stats: { topics: 203, students: 1876 }
  },
  { 
    id: '5', 
    name: 'Edebiyat Fakültesi', 
    icon: 'BookOpen',
    stats: { topics: 178, students: 3102 }
  },
];

function FacultiesPage() {
  const [selectedUniversity, setSelectedUniversity] = useState(UNIVERSITIES[0]);

  return (
    <div className="min-h-[80vh]">
      {/* Hero Section */}
      <div className={`bg-gradient-to-r ${selectedUniversity.color} rounded-2xl p-8 mb-8 text-white shadow-lg transition-all duration-500`}>
        <h1 className="text-4xl font-bold mb-3">🎓 Fakülteler</h1>
        <p className="text-lg opacity-90 max-w-2xl">
          {selectedUniversity.name} fakültelerinin ders notları, sınav takvimleri, kulüp duyuruları ve öğrenci deneyimleri burada!
        </p>
        <div className="flex items-center gap-6 mt-6">
          <div className="flex items-center gap-2">
            <Users size={20} />
            <span className="font-semibold">11.839 Öğrenci</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp size={20} />
            <span className="font-semibold">826 Aktif Başlık</span>
          </div>
        </div>
      </div>

      {/* Üniversite Seçimi */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <GraduationCap size={24} className="text-[#00BFA5]" />
          Üniversite Seç
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {UNIVERSITIES.map((university) => (
            <button
              key={university.id}
              onClick={() => setSelectedUniversity(university)}
              className={`relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                selectedUniversity.id === university.id
                  ? `bg-gradient-to-br ${university.color} text-white shadow-lg scale-105`
                  : 'bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
                  selectedUniversity.id === university.id
                    ? 'bg-white/20 backdrop-blur-sm'
                    : 'bg-gray-100'
                }`}>
                  <GraduationCap size={24} className={selectedUniversity.id === university.id ? 'text-white' : university.textColor} />
                </div>
                <h3 className="font-bold text-lg mb-1 line-clamp-2">
                  {university.name}
                </h3>
                <p className={`text-sm ${
                  selectedUniversity.id === university.id ? 'text-white/80' : 'text-gray-500'
                }`}>
                  {university.shortName}
                </p>
              </div>
              
              {/* Selected Indicator */}
              {selectedUniversity.id === university.id && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              )}

              {/* Background Pattern */}
              <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4">
                <GraduationCap size={80} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Faculties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {FACULTIES.map((faculty) => {
          const content = CATEGORY_CONTENT[faculty.id];
          return (
            <div 
              key={faculty.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-500 group"
            >
              {/* Faculty Header */}
              <div className={`bg-gradient-to-r ${selectedUniversity.color} p-6 text-white relative overflow-hidden transition-all duration-500`}>
                <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4">
                  <div className="scale-[3]">{iconMap[faculty.icon]}</div>
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                      {iconMap[faculty.icon]}
                    </div>
                    <h2 className="text-2xl font-bold">{faculty.name}</h2>
                  </div>
                  <p className="text-sm opacity-90 mb-4">{content?.description || 'Fakülte bilgileri'}</p>
                  <div className="flex items-center gap-6 text-sm">
                    <div>
                      <span className="font-semibold">{faculty.stats.topics}</span> Başlık
                    </div>
                    <div>
                      <span className="font-semibold">{faculty.stats.students}</span> Öğrenci
                    </div>
                  </div>
                </div>
              </div>

              {/* Popular Topics */}
              {content && (
                <div className="p-6">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <TrendingUp size={16} />
                    Popüler Başlıklar
                  </h3>
                  <div className="space-y-2 mb-4">
                    {content.popularTopics.slice(0, 3).map((topic, idx) => (
                      <button
                        key={idx}
                        className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-[#00BFA5]/10 border border-gray-200 hover:border-[#00BFA5] rounded-lg transition-all group/topic flex items-center justify-between"
                      >
                        <span className="text-sm text-gray-700 group-hover/topic:text-[#00BFA5] transition-colors">
                          {topic}
                        </span>
                        <ChevronRight size={16} className="text-gray-400 group-hover/topic:text-[#00BFA5] transition-colors" />
                      </button>
                    ))}
                  </div>

                  {/* Quick Links */}
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2 mt-6">
                    <ExternalLink size={16} />
                    Hızlı Erişim
                  </h3>
                  <div className="space-y-2">
                    {content.quickLinks.map((link, idx) => (
                      <Link
                        key={idx}
                        to={link.url}
                        className="flex items-center justify-between p-3 bg-white border border-gray-200 hover:border-[#00BFA5] hover:shadow-md rounded-lg transition-all group/link"
                      >
                        <span className="text-sm font-medium text-gray-700 group-hover/link:text-[#00BFA5] transition-colors">
                          {link.title}
                        </span>
                        <ExternalLink size={14} className="text-gray-400 group-hover/link:text-[#00BFA5] transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Info Box */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
          <span>💡</span> Fakülte içeriklerine nasıl katkıda bulunurum?
        </h3>
        <p className="text-sm text-gray-700 mb-4">
          Ders notlarını paylaş, wiki sayfalarını düzenle veya deneyimlerini yorumlarda anlat. Her katkın sana coin kazandırır ve rolünü yükseltir!
        </p>
        <div className="flex flex-wrap gap-3">
          <div className="bg-white px-4 py-2 rounded-lg border border-gray-200">
            <span className="text-xs text-gray-500">Wiki Düzenleme</span>
            <p className="font-bold text-[#00BFA5]">+10 Coin</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg border border-gray-200">
            <span className="text-xs text-gray-500">Yeni Başlık</span>
            <p className="font-bold text-[#00BFA5]">+20 Coin</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg border border-gray-200">
            <span className="text-xs text-gray-500">Yorum Yazma</span>
            <p className="font-bold text-[#00BFA5]">+2 Coin</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacultiesPage;

