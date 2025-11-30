import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag, TrendingUp, Hash, ChevronLeft } from 'lucide-react';

interface TagData {
  id: string;
  name: string;
  count: number;
  color: string;
}

const POPULAR_TAGS: TagData[] = [
  { id: 't1', name: 'selçuk-üniversitesi', count: 234, color: 'bg-blue-100 text-blue-700 border-blue-300' },
  { id: 't2', name: 'hukuk-fakültesi', count: 189, color: 'bg-purple-100 text-purple-700 border-purple-300' },
  { id: 't3', name: 'yurt-tavsiyeleri', count: 156, color: 'bg-green-100 text-green-700 border-green-300' },
  { id: 't4', name: 'kampüs-yaşamı', count: 142, color: 'bg-teal-100 text-teal-700 border-teal-300' },
  { id: 't5', name: 'staj-başvurusu', count: 128, color: 'bg-amber-100 text-amber-700 border-amber-300' },
  { id: 't6', name: 'yemekhane', count: 112, color: 'bg-red-100 text-red-700 border-red-300' },
  { id: 't7', name: 'mevlana-müzesi', count: 98, color: 'bg-indigo-100 text-indigo-700 border-indigo-300' },
  { id: 't8', name: 'dönerci-şükrü', count: 87, color: 'bg-orange-100 text-orange-700 border-orange-300' },
  { id: 't9', name: 'kütüphane', count: 76, color: 'bg-cyan-100 text-cyan-700 border-cyan-300' },
  { id: 't10', name: 'etli-ekmek', count: 65, color: 'bg-pink-100 text-pink-700 border-pink-300' },
  { id: 't11', name: 'sınav-dönem', count: 54, color: 'bg-violet-100 text-violet-700 border-violet-300' },
  { id: 't12', name: 'ödev-yardım', count: 43, color: 'bg-lime-100 text-lime-700 border-lime-300' },
  { id: 't13', name: 'etkinlik', count: 38, color: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
  { id: 't14', name: 'burs', count: 32, color: 'bg-rose-100 text-rose-700 border-rose-300' },
  { id: 't15', name: 'erasmus', count: 28, color: 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-300' },
];

function TagCloud() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const getFontSize = (count: number) => {
    if (count > 200) return 'text-3xl';
    if (count > 150) return 'text-2xl';
    if (count > 100) return 'text-xl';
    if (count > 50) return 'text-lg';
    return 'text-base';
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-r from-[#00BFA5] to-teal-600 text-white -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-12">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors font-normal mb-4"
          >
            <ChevronLeft size={20} />
            <span>Ana Sayfaya Dön</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Tag size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-semibold">Etiket Bulutu</h1>
              <p className="text-white/80 text-lg">Popüler konular ve etiketler</p>
            </div>
          </div>
        </div>

      {/* Content */}
      <div className="py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <Hash size={24} className="text-[#00BFA5]" />
              <div>
                <p className="text-2xl font-semibold text-gray-900">{POPULAR_TAGS.length}</p>
                <p className="text-sm text-gray-500">Toplam Etiket</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <TrendingUp size={24} className="text-[#00BFA5]" />
              <div>
                <p className="text-2xl font-semibold text-gray-900">
                  {POPULAR_TAGS.reduce((sum, tag) => sum + tag.count, 0)}
                </p>
                <p className="text-sm text-gray-500">Toplam Kullanım</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <Tag size={24} className="text-[#00BFA5]" />
              <div>
                <p className="text-2xl font-semibold text-gray-900">{POPULAR_TAGS[0].name}</p>
                <p className="text-sm text-gray-500">En Popüler</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tag Cloud */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Hash size={28} className="text-[#00BFA5]" />
            Popüler Etiketler
          </h2>
          
          <div className="flex flex-wrap items-center justify-center gap-3 p-8">
            {POPULAR_TAGS.map(tag => (
              <button
                key={tag.id}
                onClick={() => setSelectedTag(tag.id === selectedTag ? null : tag.id)}
                className={`px-4 py-2 rounded-lg font-semibold border-2 transition-all transform hover:scale-110 ${
                  tag.color
                } ${getFontSize(tag.count)} ${
                  selectedTag === tag.id ? 'ring-4 ring-[#00BFA5] scale-110' : ''
                }`}
              >
                #{tag.name} <span className="text-xs ml-1">({tag.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Tag Details */}
        {selectedTag && (
          <div className="mt-8 bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-2xl p-6 animate-slideDown">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Tag size={24} className="text-teal-600" />
                  #{POPULAR_TAGS.find(t => t.id === selectedTag)?.name}
                </h3>
                <p className="text-gray-600">
                  Bu etiket <strong>{POPULAR_TAGS.find(t => t.id === selectedTag)?.count}</strong> içerikte kullanıldı
                </p>
              </div>
              <Link
                to={`/search?tag=${POPULAR_TAGS.find(t => t.id === selectedTag)?.name}`}
                className="px-4 py-2 bg-[#00BFA5] text-white rounded-lg font-normal hover:bg-[#009688] transition-colors"
              >
                İçerikleri Gör
              </Link>
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-8 bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <Hash size={32} className="text-teal-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Etiketler Nasıl Kullanılır?</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-teal-600">•</span>
                  <span>İçerik oluştururken en fazla <strong>5 etiket</strong> ekleyebilirsiniz</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600">•</span>
                  <span>Etiketler içeriklerin <strong>keşfedilmesini</strong> kolaylaştırır</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600">•</span>
                  <span>Popüler etiketler daha büyük görünür</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600">•</span>
                  <span>Bir etikete tıklayarak o etiketli içerikleri görebilirsiniz</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TagCloud;

