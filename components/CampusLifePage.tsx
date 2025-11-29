import React, { useState, useRef } from 'react';
import { 
  Calendar, Clock, MapPin, Users, Heart, MessageCircle, Share2,
  TrendingUp, Coffee, Music, BookOpen, Utensils, Dumbbell,
  ChevronRight, ChevronLeft, ExternalLink, Bell, CheckCircle, X
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface ClubEvent {
  id: string;
  title: string;
  club: string;
  image: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  likes: number;
  comments: number;
  category: string;
  status: 'upcoming' | 'live' | 'ended';
  day: number; // Takvim için gün numarası
}

interface LiveStatus {
  id: string;
  title: string;
  location: string;
  time: string;
  attendees: number;
  type: 'concert' | 'sport' | 'workshop' | 'food';
}

interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
}

function CampusLifePage() {
  const [selectedDate, setSelectedDate] = useState(15); // Seçili gün (1-31)
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); // Carousel sayfa numarası
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Kulüp Etkinlikleri (Resimli) - day eklendi
  const clubEvents: ClubEvent[] = [
    {
      id: '1',
      title: 'Bahar Şenliği 2024',
      club: 'Öğrenci Konseyi',
      image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&q=80',
      date: '15 Mayıs 2024',
      time: '14:00',
      location: 'Ana Kampüs Bahçesi',
      attendees: 342,
      likes: 89,
      comments: 23,
      category: 'Festival',
      status: 'upcoming',
      day: 15
    },
    {
      id: '2',
      title: 'Akustik Konser: Genç Yetenekler',
      club: 'Müzik Kulübü',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80',
      date: '20 Mayıs 2024',
      time: '19:00',
      location: 'Kültür Merkezi',
      attendees: 156,
      likes: 67,
      comments: 12,
      category: 'Müzik',
      status: 'upcoming',
      day: 20
    },
    {
      id: '3',
      title: 'Basketbol Turnuvası Finali',
      club: 'Spor Kulübü',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80',
      date: '18 Mayıs 2024',
      time: '16:00',
      location: 'Kapalı Spor Salonu',
      attendees: 234,
      likes: 102,
      comments: 34,
      category: 'Spor',
      status: 'live',
      day: 18
    },
    {
      id: '4',
      title: 'Kitap Okuma Kulübü Buluşması',
      club: 'Edebiyat Kulübü',
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80',
      date: '22 Mayıs 2024',
      time: '15:00',
      location: 'Merkez Kütüphane',
      attendees: 45,
      likes: 28,
      comments: 8,
      category: 'Edebiyat',
      status: 'upcoming',
      day: 22
    },
    {
      id: '5',
      title: 'Sinema Gecesi',
      club: 'Film Kulübü',
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80',
      date: '25 Mayıs 2024',
      time: '20:00',
      location: 'Konferans Salonu',
      attendees: 98,
      likes: 45,
      comments: 15,
      category: 'Festival',
      status: 'upcoming',
      day: 25
    }
  ];

  // Canlı Durum
  const liveStatuses: LiveStatus[] = [
    {
      id: '1',
      title: 'Basketbol Turnuvası Devam Ediyor',
      location: 'Kapalı Spor Salonu',
      time: 'Şu an canlı',
      attendees: 234,
      type: 'sport'
    },
    {
      id: '2',
      title: 'Yemekhane Kalabalık',
      location: 'Ana Yemekhane',
      time: '12:00 - 13:30',
      attendees: 456,
      type: 'food'
    },
    {
      id: '3',
      title: 'Kütüphane Sessiz Çalışma',
      location: 'Merkez Kütüphane 3. Kat',
      time: 'Açık',
      attendees: 89,
      type: 'workshop'
    }
  ];

  // Yaklaşan Etkinlikler (Sağ Taraf)
  const upcomingEvents: UpcomingEvent[] = [
    { id: '1', title: 'Bahar Şenliği', date: '15 May', time: '14:00', location: 'Ana Kampüs', category: 'festival' },
    { id: '2', title: 'Basketbol Finali', date: '18 May', time: '16:00', location: 'Spor Salonu', category: 'sport' },
    { id: '3', title: 'Akustik Konser', date: '20 May', time: '19:00', location: 'Kültür Merkezi', category: 'music' },
    { id: '4', title: 'Kitap Kulübü', date: '22 May', time: '15:00', location: 'Kütüphane', category: 'education' },
    { id: '5', title: 'Sinema Gecesi', date: '25 May', time: '20:00', location: 'Konferans Salonu', category: 'entertainment' },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'müzik':
      case 'music':
        return <Music size={20} className="text-purple-500" />;
      case 'spor':
      case 'sport':
        return <Dumbbell size={20} className="text-red-500" />;
      case 'edebiyat':
      case 'education':
        return <BookOpen size={20} className="text-blue-500" />;
      case 'festival':
        return <Coffee size={20} className="text-amber-500" />;
      default:
        return <Users size={20} className="text-teal-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            CANLI
          </span>
        );
      case 'upcoming':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#00BFA5] text-white text-xs font-bold rounded-full">
            <Clock size={12} />
            YAKLAŞAN
          </span>
        );
      default:
        return null;
    }
  };

  // Etkinlikleri tarihe göre sırala (en yakın tarihli önce)
  const sortedEvents = [...clubEvents].sort((a, b) => a.day - b.day);

  // Seçili güne göre etkinlikleri filtrele
  const filteredEvents = selectedDate 
    ? sortedEvents.filter(event => event.day === selectedDate)
    : sortedEvents;

  // 4'lü gruplar halinde böl
  const eventsInGroups = (events: ClubEvent[]) => {
    const groups = [];
    for (let i = 0; i < events.length; i += 4) {
      groups.push(events.slice(i, i + 4));
    }
    return groups;
  };

  const eventGroups = eventsInGroups(sortedEvents);
  const totalPages = eventGroups.length;

  // Gösterilecek etkinlikler
  const displayedEvents = showAllEvents 
    ? eventGroups[currentPage] || []
    : filteredEvents.slice(0, 4);

  // Etkinlik olan günler
  const eventDays = sortedEvents.map(event => event.day);

  // Carousel navigasyon
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#00BFA5] to-teal-600 rounded-2xl p-8 mb-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold mb-3 flex items-center gap-3">
          <Coffee size={40} />
          Kampüs Yaşamı
        </h1>
        <p className="text-lg opacity-90 max-w-2xl">
          Kampüsteki tüm etkinlikler, kulüp aktiviteleri ve sosyal yaşam burada! Canlı durumu takip et, etkinliklere katıl.
        </p>
        <div className="flex items-center gap-6 mt-6">
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
            <Users size={20} />
            <span className="font-semibold">2.340 Aktif Kullanıcı</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
            <TrendingUp size={20} />
            <span className="font-semibold">45 Etkinlik Bu Ay</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sol Taraf - Ana İçerik */}
        <div className="lg:col-span-2 space-y-6">
          {/* Kulüp Etkinlikleri */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <TrendingUp size={24} className="text-[#00BFA5]" />
                Kulüp Etkinlikleri
              </h2>
              <button 
                onClick={() => {
                  if (!showAllEvents) {
                    setShowAllEvents(true);
                    setSelectedDate(0); // Filtre kaldır
                    setCurrentPage(0); // İlk sayfaya dön
                  } else {
                    setShowAllEvents(false);
                    setCurrentPage(0);
                  }
                }}
                className="text-sm text-[#00BFA5] hover:text-teal-600 font-medium flex items-center gap-1"
              >
                {showAllEvents ? 'Daha Az Göster' : 'Tümünü Gör'}
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Seçili gün bilgisi */}
            {selectedDate > 0 && filteredEvents.length > 0 && !showAllEvents && (
              <div className="mb-4 p-3 bg-teal-50 border border-teal-200 rounded-lg">
                <p className="text-sm font-semibold text-teal-700">
                  {selectedDate} Mayıs tarihindeki etkinlikler gösteriliyor ({filteredEvents.length} etkinlik)
                </p>
              </div>
            )}
            {selectedDate > 0 && filteredEvents.length === 0 && !showAllEvents && (
              <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-600">
                  {selectedDate} Mayıs tarihinde etkinlik bulunmuyor.
                </p>
              </div>
            )}

            {/* Carousel Navigasyon - Sadece "Tümünü Gör" aktifken */}
            {showAllEvents && totalPages > 1 && (
              <div className="mb-4 flex items-center justify-between p-3 bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-lg">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                  className={`p-2 rounded-lg transition-all ${
                    currentPage === 0
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-[#00BFA5] hover:bg-[#00BFA5] hover:text-white shadow-md'
                  }`}
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="text-sm font-semibold text-gray-700">
                  Sayfa {currentPage + 1} / {totalPages} ({sortedEvents.length} etkinlik)
                </div>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages - 1}
                  className={`p-2 rounded-lg transition-all ${
                    currentPage === totalPages - 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-[#00BFA5] hover:bg-[#00BFA5] hover:text-white shadow-md'
                  }`}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayedEvents.length > 0 ? displayedEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:border-[#00BFA5] hover:shadow-lg transition-all duration-300 group cursor-pointer"
                >
                  {/* Event Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      {getStatusBadge(event.status)}
                    </div>
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  </div>

                  {/* Event Info */}
                  <div className="p-4">
                    <div className="text-xs text-[#00BFA5] font-semibold mb-1">{event.club}</div>
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#00BFA5] transition-colors">
                      {event.title}
                    </h3>
                    
                    <div className="space-y-1.5 text-xs text-gray-600 mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-gray-400" />
                        <span>{event.date} • {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-gray-400" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Users size={14} />
                          {event.attendees}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart size={14} />
                          {event.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle size={14} />
                          {event.comments}
                        </span>
                      </div>
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                        <Share2 size={14} className="text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="col-span-2 text-center py-12">
                  <p className="text-gray-500">Etkinlik bulunamadı.</p>
                </div>
              )}
            </div>
          </div>

          {/* Canlı Durum */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="relative">
                <Bell size={24} className="text-red-500" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
              </div>
              Canlı Durum
            </h2>

            <div className="space-y-3">
              {liveStatuses.map((status) => (
                <div
                  key={status.id}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-xl hover:shadow-md transition-all"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    status.type === 'sport' ? 'bg-red-100 text-red-600' :
                    status.type === 'food' ? 'bg-amber-100 text-amber-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {status.type === 'sport' ? <Dumbbell size={24} /> :
                     status.type === 'food' ? <Utensils size={24} /> :
                     <BookOpen size={24} />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{status.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-gray-600 mt-1">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {status.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {status.time}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm font-bold text-teal-600">
                      <Users size={16} />
                      {status.attendees}
                    </div>
                    <p className="text-xs text-gray-500">Katılımcı</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sağ Taraf - Etkinlik Takvimi ve Yaklaşan Etkinlikler */}
        <div className="lg:col-span-1 space-y-6">
          {/* Etkinlik Takvimi */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar size={20} className="text-[#00BFA5]" />
              Etkinlik Takvimi
            </h2>
            
            {/* Mini Calendar */}
            <div className="bg-gradient-to-br from-[#00BFA5] to-teal-600 rounded-xl p-4 text-white mb-4">
              <div className="text-center">
                <p className="text-sm opacity-80">Mayıs 2024</p>
                <p className="text-5xl font-bold my-2">{selectedDate || 15}</p>
                <p className="text-sm opacity-80">
                  {selectedDate && eventDays.includes(selectedDate) 
                    ? `${filteredEvents.length} Etkinlik` 
                    : 'Etkinlik Yok'}
                </p>
              </div>
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['P', 'S', 'Ç', 'P', 'C', 'C', 'P'].map((day, idx) => (
                <div key={idx} className="text-center text-xs font-semibold text-gray-400 py-2">
                  {day}
                </div>
              ))}
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                const hasEvent = eventDays.includes(day);
                const isSelected = day === selectedDate;
                return (
                  <button
                    key={day}
                    onClick={() => {
                      setSelectedDate(day);
                      setShowAllEvents(false);
                    }}
                    className={`aspect-square text-sm font-medium rounded-lg transition-all ${
                      isSelected
                        ? 'bg-[#00BFA5] text-white shadow-lg scale-110'
                        : hasEvent
                        ? 'bg-teal-50 text-teal-600 hover:bg-teal-100 hover:scale-105'
                        : 'text-gray-600 hover:bg-gray-50'
                    } ${hasEvent && !isSelected ? 'relative' : ''}`}
                  >
                    {day}
                    {hasEvent && !isSelected && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-teal-500 rounded-full"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Yaklaşan Etkinlikler */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clock size={20} className="text-[#00BFA5]" />
              Yaklaşan Etkinlikler
            </h2>

            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex gap-3 p-3 bg-gray-50 hover:bg-teal-50 border border-gray-200 hover:border-[#00BFA5] rounded-xl transition-all cursor-pointer group"
                >
                  <div className="flex-shrink-0 w-12 text-center">
                    <div className="bg-gradient-to-br from-[#00BFA5] to-teal-600 text-white rounded-lg p-2">
                      <p className="text-xs font-semibold">{event.date.split(' ')[1]}</p>
                      <p className="text-lg font-bold">{event.date.split(' ')[0]}</p>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-gray-900 group-hover:text-[#00BFA5] transition-colors line-clamp-1">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                      <Clock size={12} />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600 mt-0.5">
                      <MapPin size={12} />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-400 group-hover:text-[#00BFA5] transition-colors" />
                </div>
              ))}
            </div>

            <button className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-[#00BFA5] to-teal-600 text-white font-bold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2">
              <Calendar size={18} />
              Tüm Etkinlikleri Gör
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampusLifePage;

