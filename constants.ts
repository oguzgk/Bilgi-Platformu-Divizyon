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
  { id: '5', name: 'Edebiyat', icon: 'BookOpen' },
  { id: '6', name: 'Kampüs Yaşamı', icon: 'Coffee' },
  { id: '7', name: 'Etkinlikler', icon: 'Calendar' },
];

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

export const RELATED_LINKS = [
  { title: '2024 Vize Takvimi', url: '/exam-calendar' },
  { title: 'Kampüs Haritası', url: '#' },
  { title: 'Hukuk Kulübü Duyuruları', url: '#' },
  { title: 'Yemekhane Menüsü', url: '#' },
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