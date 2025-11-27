import { Category, User, WikiContent, Comment } from './types';

export const COLORS = {
  wikiBg: '#F0F4F8',
  dictionaryBg: '#FFFFFF',
  turquoise: '#00BFA5',
  gold: '#FFD700',
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
};

export const CURRENT_USER: User = {
  id: 'u1',
  username: 'mehmet_42',
  avatarUrl: 'https://picsum.photos/id/1012/100/100',
  level: 12,
  xp: 750,
  maxXp: 1000,
  coins: 1450,
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
