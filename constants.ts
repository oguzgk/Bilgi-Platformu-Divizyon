import { Category, User, WikiContent, Comment, RoleInfo, UserRole, Notification } from './types';

export const COLORS = {
  wikiBg: '#F0F4F8',
  dictionaryBg: '#FFFFFF',
  turquoise: '#00BFA5',
  gold: '#FFD700',
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  roles: {
    yeni_gelen: '#94A3B8', // Slate
    seyyah: '#60A5FA', // Blue
    gezgin: '#34D399', // Emerald
    kasif_meraklisi: '#A78BFA', // Purple
    konya_bilgesi: '#FBBF24', // Amber/Gold
  }
};

// PDF'deki 5 Rol Sistemi
export const ROLES: Record<UserRole, RoleInfo> = {
  yeni_gelen: {
    id: 'yeni_gelen',
    name: 'Yeni Gelen',
    minCoins: 0,
    maxCoins: 500,
    multiplier: 1.0,
    color: COLORS.roles.yeni_gelen,
    badgeIcon: '🌱',
    description: 'Meraklı Gözlemci - Platformu yeni keşfediyor',
    permissions: {
      canComment: true,
      canEditWiki: false, // Sadece teklif edebilir
      canCreateTopic: false,
      canModerate: false,
      canAccessAdminPanel: false,
    }
  },
  seyyah: {
    id: 'seyyah',
    name: 'Seyyah',
    minCoins: 501,
    maxCoins: 2500,
    multiplier: 1.2,
    color: COLORS.roles.seyyah,
    badgeIcon: '🚶',
    description: 'Katkıda Bulunan - Deneyimlerini paylaşıyor',
    permissions: {
      canComment: true,
      canEditWiki: true,
      canCreateTopic: false,
      canModerate: false,
      canAccessAdminPanel: false,
    }
  },
  gezgin: {
    id: 'gezgin',
    name: 'Gezgin',
    minCoins: 2501,
    maxCoins: 10000,
    multiplier: 1.5,
    color: COLORS.roles.gezgin,
    badgeIcon: '🧭',
    description: 'Güvenilir İçerik Üretici - Platformun temel direği',
    permissions: {
      canComment: true,
      canEditWiki: true,
      canCreateTopic: true,
      canModerate: false,
      canAccessAdminPanel: false,
    }
  },
  kasif_meraklisi: {
    id: 'kasif_meraklisi',
    name: 'Kaşif Meraklısı',
    minCoins: 10001,
    maxCoins: 50000,
    multiplier: 2.0,
    color: COLORS.roles.kasif_meraklisi,
    badgeIcon: '🔍',
    description: 'Topluluk Lideri - Kaliteyi ve sağlığı koruyor',
    permissions: {
      canComment: true,
      canEditWiki: true,
      canCreateTopic: true,
      canModerate: true,
      canAccessAdminPanel: false,
    }
  },
  konya_bilgesi: {
    id: 'konya_bilgesi',
    name: 'Konya Bilgesi',
    minCoins: 50001,
    maxCoins: 999999,
    multiplier: 2.5,
    color: COLORS.roles.konya_bilgesi,
    badgeIcon: '👑',
    description: 'Usta Rehber - Platformun zirvesi, en güvenilir üye',
    permissions: {
      canComment: true,
      canEditWiki: true,
      canCreateTopic: true,
      canModerate: true,
      canAccessAdminPanel: true,
    }
  }
};

// Coin kazanma matrisi - PDF'den
export const COIN_REWARDS = {
  createTopic: 20,
  editWiki: 10,
  writeComment: 2,
  getUpvoteOnWiki: 5,
  getDownvoteOnWiki: -10,
  getLikeOnComment: 1,
  socialResponsibilityProject: 100, // Genç Kültür Kart entegrasyonu
  referralBonus: 100, // Her iki tarafa
};

export const CURRENT_USER: User = {
  id: 'u1',
  username: 'mehmet_42',
  avatarUrl: 'https://picsum.photos/id/1012/100/100',
  level: 12,
  xp: 750,
  maxXp: 1000,
  coins: 1450,
  role: 'seyyah', // 1450 coin = Seyyah rolü
  multiplier: 1.2,
  badges: ['erken_katilimci', 'ilk_duzenleme'],
  totalContributions: 45,
  joinedDate: '2024-01-15',
};

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Anasayfa', icon: 'Home' },
  { id: 'profile', name: 'Profilim', icon: 'User' },
  { id: '2', name: 'Hukuk Fakültesi', icon: 'Scale', active: true },
  { id: '3', name: 'Mühendislik', icon: 'Cpu' },
  { id: '4', name: 'Tıp Fakültesi', icon: 'Stethoscope' },
  { id: '5', name: 'Edebiyat Fakültesi', icon: 'BookOpen' },
  { id: '6', name: 'Kampüs Yaşamı', icon: 'Coffee' },
  { id: '7', name: 'Sosyal Etkinlikler', icon: 'Calendar' },
];

// Kategori bazlı içerikler
export const CATEGORY_CONTENT: Record<string, {
  title: string;
  description: string;
  popularTopics: string[];
  quickLinks: { title: string; url: string }[];
}> = {
  '2': {
    title: 'Hukuk Fakültesi',
    description: 'Selçuk Üniversitesi Hukuk Fakültesi ders notları, sınav takvimi ve kulüp duyuruları',
    popularTopics: [
      'Roma Hukuku Ders Notları',
      'Anayasa Hukuku Özet',
      'Medeni Hukuk Kişiler',
      'Ceza Hukuku Genel',
    ],
    quickLinks: [
      { title: '2024 Vize Takvimi', url: '/hukuk/vize-takvimi' },
      { title: 'Hukuk Kulübü', url: '/hukuk/kulup' },
      { title: 'Önerilen Kaynaklar', url: '/hukuk/kaynaklar' },
      { title: 'Hocalar Hakkında', url: '/hukuk/hocalar' },
    ]
  },
  '3': {
    title: 'Mühendislik Fakültesi',
    description: 'Bilgisayar, Makine, Elektrik mühendisliği ders notları ve proje arşivi',
    popularTopics: [
      'Programlama Temelleri',
      'Matematik 1 Çözümleri',
      'Fizik Lab Raporları',
      'Bitirme Projesi İpuçları',
    ],
    quickLinks: [
      { title: 'Lab Duyuruları', url: '/muhendislik/lab' },
      { title: 'Proje Arşivi', url: '/muhendislik/projeler' },
      { title: 'Staj Fırsatları', url: '/muhendislik/staj' },
      { title: 'Teknofest Takımları', url: '/muhendislik/teknofest' },
    ]
  },
  '4': {
    title: 'Tıp Fakültesi',
    description: 'Anatomi, fizyoloji, dahiliye notları ve nöbet deneyimleri',
    popularTopics: [
      'Anatomi Atlas Önerileri',
      'Fizyoloji Ders Notları',
      'İlk Yardım Rehberi',
      'Nöbet Günlükleri',
    ],
    quickLinks: [
      { title: 'Hastane Oryantasyonu', url: '/tip/hastane' },
      { title: 'Anatomi Atlası', url: '/tip/anatomi' },
      { title: 'Öğrenci Toplulukları', url: '/tip/topluluklar' },
      { title: 'Yaz Okulu', url: '/tip/yaz-okulu' },
    ]
  },
  '5': {
    title: 'Edebiyat Fakültesi',
    description: 'Türk dili, tarih, psikoloji, sosyoloji bölümleri ders notları',
    popularTopics: [
      'Türk Edebiyatı Özeti',
      'Osmanlıca Dersleri',
      'Psikoloji 101',
      'Sosyoloji Kuramları',
    ],
    quickLinks: [
      { title: 'Edebiyat Kulübü', url: '/edebiyat/kulup' },
      { title: 'Kitap Önerileri', url: '/edebiyat/kitaplar' },
      { title: 'Şiir Akşamları', url: '/edebiyat/siir' },
      { title: 'Arşiv Çalışması', url: '/edebiyat/arsiv' },
    ]
  },
  '6': {
    title: 'Kampüs Yaşamı',
    description: 'Yurt, yemekhane, ulaşım, barınma ve günlük yaşam rehberi',
    popularTopics: [
      'Konya Ulaşım Rehberi',
      'Öğrenci Yurtları',
      'Yemekhane Menüleri',
      'Kampüs Haritası',
    ],
    quickLinks: [
      { title: 'Yurt Başvurusu', url: '/kampus/yurt' },
      { title: 'Toplu Taşıma', url: '/kampus/ulasim' },
      { title: 'Kütüphane Saatleri', url: '/kampus/kutuphane' },
      { title: 'Spor Tesisleri', url: '/kampus/spor' },
    ]
  },
  '7': {
    title: 'Sosyal Etkinlikler',
    description: 'Konserler, festivaller, kulüp etkinlikleri ve buluşma noktaları',
    popularTopics: [
      'Kampüs Konserleri',
      'Kulüp Etkinlikleri',
      'Mevlana Kutlamaları',
      'Mezuniyet Törenleri',
    ],
    quickLinks: [
      { title: 'Etkinlik Takvimi', url: '/etkinlikler/takvim' },
      { title: 'Kulüpler', url: '/etkinlikler/kulupler' },
      { title: 'Konserler', url: '/etkinlikler/konserler' },
      { title: 'Festivaller', url: '/etkinlikler/festivaller' },
    ]
  }
};

export const WIKI_DATA: WikiContent = {
  title: 'Selçuk Hukuk 1. Sınıf Notları',
  lastUpdated: '2 gün önce',
  author: 'Ahmet Yılmaz',
  headers: [
    { id: 'giris', text: 'Giriş: Hukuka Başlangıç' },
    { id: 'roma', text: 'Roma Hukuku Temelleri' },
    { id: 'anayasa', text: 'Anayasa Hukuku Genel Esaslar' },
    { id: 'medeni', text: 'Medeni Hukuk (Kişiler Hukuku)' },
  ],
  content: `
    <p class="mb-4">Hukuk fakültesine yeni başlayanlar için 1. sınıf, temel kavramların oturtulduğu en kritik yıldır. Özellikle <strong>Roma Hukuku</strong> ve <strong>Medeni Hukuk</strong> dersleri, ilerleyen yıllardaki borçlar ve eşya hukuku derslerinin temelini oluşturur.</p>
    
    <h3 id="giris" class="text-xl font-bold mb-2 mt-6 text-gray-800">Giriş: Hukuka Başlangıç</h3>
    <p class="mb-4">Hukukun temel kavramları, normlar hiyerarşisi ve hukuk sistemleri bu dersin ana konusudur. Pozitif hukuk, tabii hukuk ayrımı iyi kavranmalıdır.</p>
    
    <h3 id="roma" class="text-xl font-bold mb-2 mt-6 text-gray-800">Roma Hukuku Temelleri</h3>
    <p class="mb-4">Kara Avrupası hukuk sisteminin temeli olan Roma Hukuku, kavramsal düşünme yeteneğini geliştirir. <em>Ius Civile</em> ve <em>Ius Gentium</em> ayrımlarına dikkat edilmelidir.</p>
    <ul class="list-disc pl-5 mb-4 space-y-2">
       <li><strong>Kişiler Hukuku:</strong> Hak ehliyeti ve fiil ehliyeti kavramları.</li>
       <li><strong>Eşya Hukuku:</strong> Mülkiyet ve zilyetlik ayrımları.</li>
       <li><strong>Usul Hukuku:</strong> Actio sistematiği.</li>
    </ul>

    <h3 id="anayasa" class="text-xl font-bold mb-2 mt-6 text-gray-800">Anayasa Hukuku Genel Esaslar</h3>
    <p class="mb-4">Devletin temel yapısı, yasama, yürütme ve yargı organlarının işleyişi incelenir. 1982 Anayasası'nın temel nitelikleri ezberlenmemeli, mantığı kavranmalıdır.</p>

    <h3 id="medeni" class="text-xl font-bold mb-2 mt-6 text-gray-800">Medeni Hukuk (Kişiler Hukuku)</h3>
    <p class="mb-4">Türk Medeni Kanunu'nun başlangıç hükümleri (TMK m.1-7) hukukun alfabesidir. Dürüstlük kuralı ve iyiniyet kavramları her olayda karşınıza çıkacaktır.</p>
  `,
};

export const MOCK_COMMENTS: Comment[] = [
  {
    id: 'c1',
    userId: 'u2',
    user: { ...CURRENT_USER, id: 'u2', username: 'ayse_hukuk', avatarUrl: 'https://picsum.photos/id/1027/100/100', level: 8 },
    content: 'Roma hukuku vizesi için Pratik Çalışmalar kitabını mutlaka çözün, hoca oradan soruyor.',
    timestamp: '3 saat önce',
    likes: 12,
    dislikes: 1,
    userVote: 'up'
  },
  {
    id: 'c2',
    userId: 'u3',
    user: { ...CURRENT_USER, id: 'u3', username: 'mehmet_can', avatarUrl: 'https://picsum.photos/id/1005/100/100', level: 15 },
    content: 'Anayasa dersi için Kemal Gözler\'in kitabı biraz ağır gelebilir, başlangıç için daha özet kaynaklara bakabilirsiniz.',
    timestamp: '5 saat önce',
    likes: 8,
    dislikes: 0,
    userVote: null
  },
  {
    id: 'c3',
    userId: 'u4',
    user: { ...CURRENT_USER, id: 'u4', username: 'fatih_selcuk', avatarUrl: 'https://picsum.photos/id/1011/100/100', level: 5 },
    content: 'Kampüs kütüphanesinde 3. kat hukuk bölümü çok sessiz, çalışmak için ideal.',
    timestamp: '1 gün önce',
    likes: 24,
    dislikes: 2,
    userVote: 'up'
  }
];

// Dinamik İlgili Linkler (şu anki sayfaya göre)
export const RELATED_LINKS = [
  { title: '2024-2025 Vize Sınav Takvimi', url: '/hukuk/vize-takvimi', category: 'Akademik' },
  { title: 'Kampüs Haritası (İnteraktif)', url: '/kampus/harita', category: 'Kampüs' },
  { title: 'Hukuk Kulübü Etkinlikleri', url: '/hukuk/kulup-etkinlikleri', category: 'Sosyal' },
  { title: 'Öğrenci Yemekhanesi Menüsü', url: '/kampus/yemekhane', category: 'Kampüs' },
  { title: 'Kütüphane Çalışma Saatleri', url: '/kampus/kutuphane-saatleri', category: 'Kampüs' },
  { title: 'Dönerci Şükrü (En İyi Döner)', url: '/sosyal/donerci-sukru', category: 'Yeme-İçme' },
];

// Ana sayfa için trend başlıklar (PDF: en çok düzenlenen Wikiler)
export const TRENDING_TOPICS = [
  {
    id: 't1',
    title: 'Selçuk Hukuk Final Notları',
    category: 'Akademik Destek',
    editCount: 24,
    viewCount: 1250,
    lastEditedBy: 'ayse_hukuk',
    timestamp: '2 saat önce',
    isHot: true,
  },
  {
    id: 't2',
    title: 'Konya\'da Öğrenci Dostu Restoranlar',
    category: 'Sosyal Yaşam',
    editCount: 18,
    viewCount: 890,
    lastEditedBy: 'mehmet_can',
    timestamp: '5 saat önce',
    isHot: true,
  },
  {
    id: 't3',
    title: 'NEÜ Mühendislik Yemekhane Rehberi',
    category: 'Sosyal Yaşam',
    editCount: 15,
    viewCount: 650,
    lastEditedBy: 'fatih_selcuk',
    timestamp: '1 gün önce',
    isHot: false,
  },
];

// Popüler yorumlar (PDF: en çok beğenilen Sözlük girişleri)
export const POPULAR_COMMENTS = [
  {
    id: 'pc1',
    content: 'Roma hukuku vizesi için Pratik Çalışmalar kitabını mutlaka çözün, hoca oradan soruyor.',
    topicTitle: 'Selçuk Hukuk 1. Sınıf Notları',
    user: { ...CURRENT_USER, id: 'u2', username: 'ayse_hukuk', level: 8 },
    likes: 124,
    timestamp: '3 saat önce',
  },
  {
    id: 'pc2',
    content: 'Bosna Hersek Mahallesi\'nde ev ararken mutlaka yerel esnaflarla konuşun. Onlar genelde sahipleri daha iyi tanır ve sizin için referans olabilir.',
    topicTitle: 'Konya Ev Kiralama Rehberi',
    user: { ...CURRENT_USER, id: 'u5', username: 'zeynep_42', level: 15 },
    likes: 89,
    timestamp: '1 gün önce',
  },
];

// KBB Duyuruları
export const KBB_ANNOUNCEMENTS = [
  {
    id: 'a1',
    title: 'Yeni Etkinlik: Genç Yazarlar Buluşması',
    date: '15 Aralık 2024',
    category: 'Etkinlik',
    isPinned: true,
  },
  {
    id: 'a2',
    title: 'Genç Kültür Kart ile %20 İndirim Kampanyası',
    date: '10 Aralık 2024',
    category: 'Kampanya',
    isPinned: false,
  },
];

// Mock Bildirimler - Gerçek zamanlı bildirim sistemi için
export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: 'coin_earned' as const,
    title: 'Coin Kazandın! 🎉',
    message: 'Wiki düzenlemesi için 50 coin kazandın!',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 dakika önce
    read: false,
    link: '/profile',
    metadata: {
      amount: 50,
      contentTitle: 'Selimiye Camii',
    }
  },
  {
    id: 'n2',
    type: 'reply' as const,
    title: 'Yorumuna Yanıt Geldi',
    message: '@kemalguler "Dönerci Şükrü" hakkındaki yorumuna yanıt verdi.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 saat önce
    read: false,
    link: '/wiki/dönerci-şükrü',
    metadata: {
      username: 'kemalguler',
      contentTitle: 'Dönerci Şükrü',
    }
  },
  {
    id: 'n3',
    type: 'like' as const,
    title: '10 Kişi Beğendi',
    message: 'Meram Bağları hakkındaki yorumun 10 beğeni aldı!',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 saat önce
    read: false,
    link: '/wiki/meram-bağları',
    metadata: {
      contentTitle: 'Meram Bağları',
    }
  },
  {
    id: 'n4',
    type: 'level_up' as const,
    title: 'Seviye Atladın! 🎊',
    message: 'Tebrikler! Level 8\'e ulaştın ve 100 bonus coin kazandın!',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 gün önce
    read: true,
    link: '/profile',
    metadata: {
      amount: 100,
    }
  },
  {
    id: 'n5',
    type: 'role_change' as const,
    title: 'Yeni Rol Kazandın! 🏆',
    message: '"Gezgin" rolüne terfi ettin! Artık %1.5 coin çarpanına sahipsin.',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 gün önce
    read: true,
    link: '/profile',
    metadata: {
      oldRole: 'seyyah' as const,
      newRole: 'gezgin' as const,
    }
  },
  {
    id: 'n6',
    type: 'announcement' as const,
    title: 'KBB Duyurusu',
    message: 'Konya Büyükşehir Belediyesi: 15 Aralık\'ta Kart dağıtımı başlıyor!',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 gün önce
    read: true,
    link: '/announcements',
  },
  {
    id: 'n7',
    type: 'wiki_edit' as const,
    title: 'Wiki Güncellemesi',
    message: '"Alaeddin Tepesi" maddesi güncellendi. Katkıların için teşekkürler!',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 gün önce
    read: true,
    link: '/wiki/alaeddin-tepesi',
    metadata: {
      contentTitle: 'Alaeddin Tepesi',
    }
  },
  {
    id: 'n8',
    type: 'mention' as const,
    title: 'Etiketlendin',
    message: '@semaaksoy seni "Selçuklu Tarihi" başlığında etiketledi.',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 hafta önce
    read: true,
    link: '/wiki/selçuklu-tarihi',
    metadata: {
      username: 'semaaksoy',
      contentTitle: 'Selçuklu Tarihi',
    }
  },
];

// ARAMA İÇİN MOCK DATA
export const MOCK_SEARCH_DATA = {
  topics: [
    { id: 't1', title: 'selçuk üniversitesi yurt tavsiyeleri', category: 'Kampüs Yaşamı', excerpt: 'En iyi yurtlar ve fiyatları hakkında bilgiler...', author: 'mehmet_42', views: 234, comments: 18 },
    { id: 't2', title: 'hukuk fakültesi staj başvurusu', category: 'Hukuk Fakültesi', excerpt: 'Staj başvurusu nasıl yapılır, gerekli belgeler...', author: 'ayse_hukuk', views: 567, comments: 42 },
    { id: 't3', title: 'meram bağları gezilecek yerler', category: 'Sosyal Etkinlikler', excerpt: 'Meram Bağlarında neler yapılabilir, piknik alanları...', author: 'kemal_meram', views: 890, comments: 65 },
    { id: 't4', title: 'kampüs yemekhanesi menü önerileri', category: 'Kampüs Yaşamı', excerpt: 'Hangi gün hangi yemek daha iyi, tavsiyeler...', author: 'zeynep_yemek', views: 445, comments: 28 },
    { id: 't5', title: 'selimiye camii tarihi ve mimari', category: 'Sosyal Etkinlikler', excerpt: 'Selimiye Camii hakkında detaylı bilgiler...', author: 'ali_tarih', views: 1200, comments: 87 },
  ],
  wikis: [
    { id: 'w1', title: 'Selçuk Üniversitesi Tarihçesi', category: 'Akademik', excerpt: 'Üniversitemizin kuruluşundan bugüne tarihçesi...', lastUpdated: '2 gün önce', author: 'admin' },
    { id: 'w2', title: 'Kampüs Haritası ve Binalar', category: 'Kampüs', excerpt: 'Tüm fakülte ve binaların konumları...', lastUpdated: '1 hafta önce', author: 'mehmet_42' },
    { id: 'w3', title: 'Konya Mutfağı', category: 'Yeme-İçme', excerpt: 'Konya\'ya özgü yemekler ve tarifleri...', lastUpdated: '3 gün önce', author: 'zeynep_yemek' },
    { id: 'w4', title: 'Mevlana Müzesi Rehberi', category: 'Sosyal', excerpt: 'Mevlana Müzesi ziyaret rehberi ve bilgileri...', lastUpdated: '5 gün önce', author: 'fatma_kultur' },
  ],
  users: [
    { id: 'u1', username: 'mehmet_42', displayName: 'Mehmet Yılmaz', role: 'seyyah', totalContributions: 45, avatarUrl: 'https://i.pravatar.cc/150?img=12' },
    { id: 'u2', username: 'ayse_hukuk', displayName: 'Ayşe Demir', role: 'gezgin', totalContributions: 120, avatarUrl: 'https://i.pravatar.cc/150?img=45' },
    { id: 'u3', username: 'kemal_meram', displayName: 'Kemal Güler', role: 'kasif_meraklisi', totalContributions: 250, avatarUrl: 'https://i.pravatar.cc/150?img=33' },
    { id: 'u4', username: 'zeynep_yemek', displayName: 'Zeynep Arslan', role: 'seyyah', totalContributions: 67, avatarUrl: 'https://i.pravatar.cc/150?img=23' },
  ],
  comments: [
    { id: 'c1', content: 'Kütüphane 3. kat sessiz çalışma bölümü gerçekten harika, herkese tavsiye ederim.', topicTitle: 'En İyi Ders Çalışma Yerleri', author: 'mehmet_42', likes: 8 },
    { id: 'c2', content: 'Bu haftaki konser çok iyiydi, organizasyon harika!', topicTitle: 'Kampüs Etkinlikleri', author: 'ayse_hukuk', likes: 15 },
    { id: 'c3', content: 'Japon Kyoto Parkı huzur bulmak için birebir.', topicTitle: 'Konya\'da Gezilecek Yerler', author: 'kemal_meram', likes: 10 },
  ],
};

// POPÜLER ARAMALAR
export const POPULAR_SEARCHES = [
  'yurt tavsiyeleri',
  'staj başvurusu',
  'yemekhane menü',
  'selimiye camii',
  'kampüs haritası',
  'mevlana müzesi',
  'dönerci şükrü',
  'kütüphane saatleri',
];

// LEADERBOARD MOCK DATA
export const LEADERBOARD_DATA = {
  weekly: [
    { id: 'u1', username: 'kemal_meram', displayName: 'Kemal Güler', avatarUrl: 'https://i.pravatar.cc/150?img=33', role: 'kasif_meraklisi', coins: 450, contributions: 23, change: 'up' },
    { id: 'u2', username: 'ayse_hukuk', displayName: 'Ayşe Demir', avatarUrl: 'https://i.pravatar.cc/150?img=45', role: 'gezgin', coins: 380, contributions: 19, change: 'up' },
    { id: 'u3', username: 'mehmet_42', displayName: 'Mehmet Yılmaz', avatarUrl: 'https://i.pravatar.cc/150?img=12', role: 'seyyah', coins: 290, contributions: 15, change: 'down' },
    { id: 'u4', username: 'zeynep_yemek', displayName: 'Zeynep Arslan', avatarUrl: 'https://i.pravatar.cc/150?img=23', role: 'seyyah', coins: 245, contributions: 12, change: 'same' },
    { id: 'u5', username: 'ali_tarih', displayName: 'Ali Yıldız', avatarUrl: 'https://i.pravatar.cc/150?img=52', role: 'gezgin', coins: 210, contributions: 11, change: 'up' },
    { id: 'u6', username: 'fatma_kultur', displayName: 'Fatma Kaya', avatarUrl: 'https://i.pravatar.cc/150?img=67', role: 'seyyah', coins: 189, contributions: 9, change: 'same' },
    { id: 'u7', username: 'emre_tip', displayName: 'Emre Demir', avatarUrl: 'https://i.pravatar.cc/150?img=71', role: 'yeni_gelen', coins: 156, contributions: 8, change: 'up' },
    { id: 'u8', username: 'sema_aksoy', displayName: 'Sema Aksoy', avatarUrl: 'https://i.pravatar.cc/150?img=82', role: 'seyyah', coins: 134, contributions: 7, change: 'down' },
    { id: 'u9', username: 'ahmet_yilmaz', displayName: 'Ahmet Yılmaz', avatarUrl: 'https://i.pravatar.cc/150?img=92', role: 'yeni_gelen', coins: 112, contributions: 6, change: 'up' },
    { id: 'u10', username: 'beyza_oz', displayName: 'Beyza Öz', avatarUrl: 'https://i.pravatar.cc/150?img=99', role: 'yeni_gelen', coins: 98, contributions: 5, change: 'same' },
  ],
  monthly: [
    { id: 'u1', username: 'ayse_hukuk', displayName: 'Ayşe Demir', avatarUrl: 'https://i.pravatar.cc/150?img=45', role: 'gezgin', coins: 1850, contributions: 95, change: 'up' },
    { id: 'u2', username: 'kemal_meram', displayName: 'Kemal Güler', avatarUrl: 'https://i.pravatar.cc/150?img=33', role: 'kasif_meraklisi', coins: 1720, contributions: 89, change: 'same' },
    { id: 'u3', username: 'mehmet_42', displayName: 'Mehmet Yılmaz', avatarUrl: 'https://i.pravatar.cc/150?img=12', role: 'seyyah', coins: 1450, contributions: 75, change: 'up' },
    { id: 'u4', username: 'ali_tarih', displayName: 'Ali Yıldız', avatarUrl: 'https://i.pravatar.cc/150?img=52', role: 'gezgin', coins: 1290, contributions: 68, change: 'down' },
    { id: 'u5', username: 'zeynep_yemek', displayName: 'Zeynep Arslan', avatarUrl: 'https://i.pravatar.cc/150?img=23', role: 'seyyah', coins: 1120, contributions: 58, change: 'up' },
  ],
  allTime: [
    { id: 'u1', username: 'admin', displayName: 'Admin', avatarUrl: 'https://i.pravatar.cc/150?img=1', role: 'konya_bilgesi', coins: 52340, contributions: 1234, change: 'same' },
    { id: 'u2', username: 'kemal_meram', displayName: 'Kemal Güler', avatarUrl: 'https://i.pravatar.cc/150?img=33', role: 'kasif_meraklisi', coins: 15720, contributions: 789, change: 'same' },
    { id: 'u3', username: 'ayse_hukuk', displayName: 'Ayşe Demir', avatarUrl: 'https://i.pravatar.cc/150?img=45', role: 'gezgin', coins: 12450, contributions: 645, change: 'same' },
  ],
};

// ROZET SİSTEMİ
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: 'contribution' | 'social' | 'special' | 'achievement';
  requirement: string;
  unlocked: boolean;
}

export const ALL_BADGES: Badge[] = [
  // Katkı Rozetleri
  { id: 'first_edit', name: 'İlk Düzenleme', icon: '✍️', rarity: 'common', category: 'contribution', requirement: 'İlk wiki düzenlemesini yap', unlocked: true, description: 'İlk wiki düzenlemesini başarıyla tamamladın!' },
  { id: 'wiki_master', name: 'Wiki Gurusu', icon: '📚', rarity: 'epic', category: 'contribution', requirement: '50 wiki düzenlemesi yap', unlocked: true, description: '50 wiki düzenlemesi yaparak bilgi hazinesi oldun!' },
  { id: 'comment_king', name: 'Yorum Kralı', icon: '💬', rarity: 'rare', category: 'contribution', requirement: '100 yorum yap', unlocked: false, description: '100 yorum yaparak toplulukta aktif ol!' },
  { id: 'topic_creator', name: 'Başlık Yaratıcısı', icon: '🎯', rarity: 'rare', category: 'contribution', requirement: '20 başlık oluştur', unlocked: false, description: '20 yeni başlık açarak konuşmaları başlat!' },
  
  // Sosyal Rozetler
  { id: 'popular', name: 'Popüler', icon: '⭐', rarity: 'rare', category: 'social', requirement: '100 takipçiye ulaş', unlocked: true, description: '100 takipçi kazanarak popüler oldun!' },
  { id: 'social_butterfly', name: 'Sosyal Kelebek', icon: '🦋', rarity: 'epic', category: 'social', requirement: '50 arkadaş edin', unlocked: false, description: '50 arkadaşla bağlantı kur!' },
  { id: 'helpful', name: 'Yardımsever', icon: '🤝', rarity: 'rare', category: 'social', requirement: '50+ beğeni al', unlocked: true, description: 'İçeriklerinle 50+ beğeni kazandın!' },
  { id: 'influencer', name: 'Etkileyici', icon: '🌟', rarity: 'legendary', category: 'social', requirement: '500+ takipçi', unlocked: false, description: '500 takipçiyle topluluk lideri ol!' },
  
  // Özel Rozetler
  { id: 'early_bird', name: 'Erken Katılımcı', icon: '🚀', rarity: 'legendary', category: 'special', requirement: 'Beta dönemde katıl', unlocked: true, description: 'Platformun beta döneminde yer aldın!' },
  { id: 'anniversary', name: 'Yıldönümü', icon: '🎂', rarity: 'epic', category: 'special', requirement: '1 yıl aktif üyelik', unlocked: false, description: '1 yıldır toplulukla birliktesin!' },
  { id: 'night_owl', name: 'Gece Kuşu', icon: '🦉', rarity: 'rare', category: 'special', requirement: 'Gece 2-5 arası aktif ol', unlocked: false, description: 'Gece geç saatlerde bile aktifsin!' },
  
  // Başarı Rozetleri
  { id: 'streak_7', name: 'Haftalık Ateş', icon: '🔥', rarity: 'rare', category: 'achievement', requirement: '7 gün üst üste aktif', unlocked: true, description: '7 gün üst üste platformda aktif oldun!' },
  { id: 'coin_master', name: 'Coin Ustası', icon: '💰', rarity: 'epic', category: 'achievement', requirement: '10,000 coin kazan', unlocked: false, description: '10,000 coin biriktirerek zengin oldun!' },
  { id: 'level_10', name: 'Seviye 10', icon: '🎖️', rarity: 'epic', category: 'achievement', requirement: 'Level 10\'a ulaş', unlocked: false, description: 'Level 10\'a ulaşarak deneyimli oldun!' },
  { id: 'perfectionist', name: 'Mükemmeliyetçi', icon: '✨', rarity: 'legendary', category: 'achievement', requirement: 'Hiç downvote alma', unlocked: false, description: 'Tüm içeriklerin kaliteli ve beğenildi!' },
];