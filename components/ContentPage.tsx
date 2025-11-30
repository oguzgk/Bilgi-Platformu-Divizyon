import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Utensils, Book, Users, ExternalLink } from 'lucide-react';
import { COLORS } from '../constants';

// İçerik sayfaları için mock data
const CONTENT_DATA: Record<string, {
  title: string;
  icon: React.ElementType;
  description: string;
  content: React.ReactNode;
  category: string;
}> = {
  'vize-takvimi': {
    title: '2024-2025 Vize Sınav Takvimi',
    icon: Calendar,
    category: 'Akademik',
    description: 'Hukuk Fakültesi vize sınav tarihleri ve duyuruları',
    content: (
      <div className="space-y-6">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">📅 Vize Sınavları: 18-29 Aralık 2024</h3>
          <p className="text-blue-800 text-sm">Sınav yerleri ve saatleri için dekanlık web sitesini kontrol edin.</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">Hukuk Fakültesi Sınav Takvimi</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-left">Tarih</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">Ders</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">Sınıf</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">Saat</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">Salon</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { date: '18 Aralık', course: 'Roma Hukuku', class: '1. Sınıf', time: '10:00', room: 'A101' },
                  { date: '20 Aralık', course: 'Anayasa Hukuku', class: '1. Sınıf', time: '14:00', room: 'A102' },
                  { date: '23 Aralık', course: 'Medeni Hukuk', class: '1. Sınıf', time: '10:00', room: 'A101' },
                  { date: '26 Aralık', course: 'Ceza Hukuku', class: '2. Sınıf', time: '10:00', room: 'B201' },
                  { date: '27 Aralık', course: 'Borçlar Hukuku', class: '2. Sınıf', time: '14:00', room: 'B202' },
                ].map((exam, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">{exam.date}</td>
                    <td className="border border-gray-300 px-4 py-3 font-semibold">{exam.course}</td>
                    <td className="border border-gray-300 px-4 py-3">{exam.class}</td>
                    <td className="border border-gray-300 px-4 py-3">{exam.time}</td>
                    <td className="border border-gray-300 px-4 py-3">{exam.room}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-900 mb-2">⚠️ Önemli Hatırlatmalar:</h4>
            <ul className="list-disc list-inside text-yellow-800 text-sm space-y-1">
              <li>Sınavlara kimlik ve öğrenci belgesi ile gelin</li>
              <li>Sınav salonlarına en az 15 dakika önceden gelin</li>
              <li>Cep telefonu ve elektronik cihazlar yasaktır</li>
              <li>Mazeret sınavları için dekanlığa başvurun</li>
            </ul>
          </div>
        </div>
      </div>
    )
  },
  'kampus-harita': {
    title: 'Kampüs Haritası',
    icon: MapPin,
    category: 'Kampüs',
    description: 'Selçuk Üniversitesi kampüs haritası ve binalar',
    content: (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">🗺️ Kampüs Binalar Rehberi</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { name: 'Hukuk Fakültesi', code: 'A Blok', floor: '3 Kat', facilities: 'Kütüphane, Kantin' },
              { name: 'Mühendislik Fakültesi', code: 'B Blok', floor: '5 Kat', facilities: 'Lab, Atölye' },
              { name: 'Tıp Fakültesi', code: 'C Blok', floor: '4 Kat', facilities: 'Hastane, Lab' },
              { name: 'Merkez Kütüphane', code: 'D Blok', floor: '6 Kat', facilities: 'Çalışma Alanları' },
            ].map((building, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900">{building.name}</h4>
                <p className="text-sm text-gray-600 mt-1">📍 {building.code} - {building.floor}</p>
                <p className="text-xs text-gray-500 mt-2">✨ {building.facilities}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>💡 İpucu:</strong> Kampüs içinde kaybolmamak için giriş kapısındaki bilgi masasından detaylı harita alabilirsiniz.
          </p>
        </div>
      </div>
    )
  },
  'yemekhane': {
    title: 'Öğrenci Yemekhanesi Menüsü',
    icon: Utensils,
    category: 'Kampüs',
    description: 'Günlük yemekhane menüsü ve fiyatları',
    content: (
      <div className="space-y-6">
        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-lg">
          <h3 className="font-semibold text-orange-900 mb-2">🍽️ Bu Hafta Menü</h3>
          <p className="text-orange-800 text-sm">Öğrenci kartı ile 12₺ | Personel: 35₺</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            { day: 'Pazartesi', menu: ['Mercimek Çorbası', 'Tavuk Sote', 'Pilav', 'Cacık', 'Meyve'] },
            { day: 'Salı', menu: ['Ezogelin Çorbası', 'İzmir Köfte', 'Makarna', 'Turşu', 'Sütlaç'] },
            { day: 'Çarşamba', menu: ['Domates Çorbası', 'Etli Kuru Fasulye', 'Pilav', 'Salata', 'Ayran'] },
            { day: 'Perşembe', menu: ['Yayla Çorbası', 'Tavuk Döner', 'Patates', 'Cacık', 'Meyve'] },
            { day: 'Cuma', menu: ['Tarhana Çorbası', 'Karnıyarık', 'Bulgur', 'Salata', 'Komposto'] },
          ].map((day, idx) => (
            <div key={idx} className="bg-white border-2 border-gray-200 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-3 pb-2 border-b">{day.day}</h4>
              <ul className="space-y-2">
                {day.menu.map((item, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-center gap-2">
                    <span className="text-orange-500">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-green-900 mb-2">📍 Yemekhane Saatleri</h4>
          <div className="text-sm text-green-800 space-y-1">
            <p>🕐 Öğle Yemeği: 11:30 - 14:30</p>
            <p>🕔 Akşam Yemeği: 17:30 - 20:00</p>
          </div>
        </div>
      </div>
    )
  },
  'donerci-sukru': {
    title: 'Dönerci Şükrü',
    icon: Utensils,
    category: 'Yeme-İçme',
    description: 'Konya\'nın en sevilen döner mekanı',
    content: (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-orange-300 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="text-6xl">🥙</div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Dönerci Şükrü</h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                <span className="text-sm text-gray-600">(487 değerlendirme)</span>
              </div>
              <p className="text-gray-700">Kampüse 10 dakika yürüme mesafesinde, öğrenci dostu fiyatlarla en lezzetli döner!</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">📋 Menü & Fiyatlar</h4>
            <div className="space-y-2">
              {[
                { item: 'Tavuk Döner Dürüm', price: '45₺' },
                { item: 'Et Döner Dürüm', price: '60₺' },
                { item: 'Yarım Ekmek', price: '50₺' },
                { item: 'Tam Ekmek', price: '85₺' },
                { item: 'Porsiyon', price: '95₺' },
                { item: 'Ayran', price: '10₺' },
              ].map((menu, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-normal text-gray-800">{menu.item}</span>
                  <span className="font-semibold text-orange-600">{menu.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">📍 Bilgiler</h4>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-semibold text-gray-700 mb-1">📍 Adres</p>
                <p className="text-sm text-gray-600">Selçuklu, Kampüs Cd. No:42</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-semibold text-gray-700 mb-1">🕐 Açılış Saatleri</p>
                <p className="text-sm text-gray-600">Her gün: 10:00 - 23:00</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-semibold text-gray-700 mb-1">💳 Ödeme</p>
                <p className="text-sm text-gray-600">Nakit, Kredi Kartı</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm font-semibold text-green-700 mb-1">🎓 Öğrenci İndirimi</p>
                <p className="text-sm text-green-600">Öğrenci kartı ile %10 indirim!</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">💬 Öğrenci Yorumları</h4>
          <div className="space-y-2 text-sm text-blue-800">
            <p>"Kampüsteki en iyi döner burası!" - @ahmetyilmaz</p>
            <p>"Fiyat/performans çok iyi, kesinlikle deneyin!" - @aysedemir</p>
          </div>
        </div>
      </div>
    )
  }
};

function ContentPage() {
  const { slug } = useParams<{ slug: string }>();
  const content = slug ? CONTENT_DATA[slug] : null;

  if (!content) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-6xl font-semibold text-gray-300 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-6">Sayfa bulunamadı</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#00BFA5] text-white font-semibold rounded-xl hover:bg-[#009688] transition-colors"
          >
            <ArrowLeft size={20} />
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  const Icon = content.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-600 hover:text-[#00BFA5] transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-normal">Geri</span>
          </Link>
          <div className="h-6 w-px bg-gray-300"></div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00BFA5] to-teal-600 flex items-center justify-center text-white">
              <Icon size={20} />
            </div>
            <div>
              <h1 className="font-semibold text-gray-900">{content.title}</h1>
              <p className="text-xs text-gray-500">{content.category}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
          <div className="mb-6">
            <p className="text-gray-600">{content.description}</p>
          </div>
          {content.content}
        </div>
      </main>
    </div>
  );
}

export default ContentPage;

