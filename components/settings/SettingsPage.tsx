import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  Bell, 
  Lock, 
  Palette, 
  Globe, 
  Shield, 
  Mail,
  Eye,
  EyeOff,
  Check,
  X,
  Home,
  GraduationCap,
  Coffee,
  Calendar,
  LogOut,
  ChevronLeft
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { CURRENT_USER, COLORS } from '../../constants';
import { useNotifications } from '../../contexts/NotificationContext';

interface SettingsPageProps {
  onLogout?: () => void;
}

function SettingsPage({ onLogout }: SettingsPageProps) {
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  
  // Hesap Ayarları
  const [username, setUsername] = useState(CURRENT_USER.username);
  const [email, setEmail] = useState('mehmet@example.com');
  const [bio, setBio] = useState('Selçuk Üniversitesi Hukuk Fakültesi öğrencisi');
  const [showPassword, setShowPassword] = useState(false);
  
  // Bildirim Tercihleri
  const [notifications, setNotifications] = useState({
    coinEarned: true,
    commentReply: true,
    contentLiked: true,
    levelUp: true,
    roleChange: true,
    wikiUpdate: false,
    kbbAnnouncement: true,
    userTagged: true,
    emailNotifications: false,
  });

  // Gizlilik Ayarları
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public', // public, friends, private
    showEmail: false,
    showActivity: true,
    allowMessages: true,
  });

  // Tema
  const [theme, setTheme] = useState('light'); // light, dark, auto

  // Dil
  const [language, setLanguage] = useState('tr');

  const handleSaveAccount = () => {
    addNotification(
      'level_up',
      'Hesap Güncellendi',
      'Hesap bilgileriniz başarıyla güncellendi!',
      { username }
    );
  };

  const handleSaveNotifications = () => {
    addNotification(
      'level_up',
      'Bildirimler Güncellendi',
      'Bildirim tercihleriniz kaydedildi.',
      {}
    );
  };

  const handleSavePrivacy = () => {
    addNotification(
      'level_up',
      'Gizlilik Güncellendi',
      'Gizlilik ayarlarınız başarıyla güncellendi!',
      {}
    );
  };

  const handleSaveTheme = () => {
    addNotification(
      'level_up',
      'Tema Değiştirildi',
      `Tema "${theme === 'light' ? 'Açık' : theme === 'dark' ? 'Koyu' : 'Otomatik'}" olarak ayarlandı.`,
      {}
    );
  };

  const MENU_ITEMS = [
    { id: '1', name: 'Anasayfa', icon: Home, path: '/' },
    { id: 'faculties', name: 'Fakülteler', icon: GraduationCap, path: '/faculties' },
    { id: '6', name: 'Kampüs Yaşamı', icon: Coffee, path: '/kampus/yasam' },
    { id: '7', name: 'Sosyal Etkinlikler', icon: Calendar, path: '/sosyal/etkinlikler' },
    { id: 'profile', name: 'Profilim', icon: User, path: '/profile' },
  ];

  return (
    <div className="min-h-screen bg-[#F0F4F8]">
      {/* Sol Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-100 flex flex-col z-20 hidden lg:flex">
        {/* Brand */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold" style={{ backgroundColor: COLORS.turquoise }}>
            K
          </div>
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">Konya Genç Wiki</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 overflow-y-auto custom-scrollbar">
          <div className="mb-6">
            <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Menü</p>
            <ul className="space-y-1">
              {MENU_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <Link
                      to={item.path}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    >
                      <Icon size={20} className="text-gray-400" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-100">
          <Link
            to="/settings"
            className="flex items-center gap-3 px-4 py-2 text-sm font-medium bg-[#F0F4F8] text-[#00BFA5] w-full rounded-lg transition-colors"
          >
            <Settings size={18} />
            Ayarlar
          </Link>
          <button 
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-500 hover:text-red-600 w-full rounded-lg hover:bg-red-50 transition-colors mt-1"
          >
            <LogOut size={18} />
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Ana İçerik */}
      <div className="lg:ml-64">
        {/* Header with Back Button */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <Link 
              to="/"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-[#00BFA5] transition-colors font-medium mb-3"
            >
              <ChevronLeft size={20} />
              <span>Ana Sayfaya Dön</span>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#00BFA5] rounded-xl flex items-center justify-center">
                <Settings size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Ayarlar</h1>
                <p className="text-sm text-gray-500">Hesap ve uygulama tercihlerini yönet</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        
        {/* 1. Hesap Ayarları */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <User size={24} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Hesap Ayarları</h2>
              <p className="text-sm text-gray-500">Profil bilgilerini düzenle</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Kullanıcı Adı */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Kullanıcı Adı
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00BFA5] focus:border-transparent transition-all"
                placeholder="kullanici_adi"
              />
            </div>

            {/* E-posta */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                E-posta Adresi
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00BFA5] focus:border-transparent transition-all"
                placeholder="ornek@mail.com"
              />
            </div>

            {/* Biyografi */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Biyografi
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00BFA5] focus:border-transparent transition-all resize-none"
                placeholder="Kendin hakkında bir şeyler yaz..."
              />
              <p className="text-xs text-gray-500 mt-1">{bio.length}/200 karakter</p>
            </div>

            {/* Şifre Değiştir */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Yeni Şifre
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00BFA5] focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {showPassword ? <EyeOff size={20} className="text-gray-500" /> : <Eye size={20} className="text-gray-500" />}
                </button>
              </div>
            </div>

            <button
              onClick={handleSaveAccount}
              className="w-full px-6 py-3 bg-[#00BFA5] hover:bg-[#009688] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Check size={20} />
              Hesap Bilgilerini Kaydet
            </button>
          </div>
        </section>

        {/* 2. Bildirim Tercihleri */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Bell size={24} className="text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Bildirim Tercihleri</h2>
              <p className="text-sm text-gray-500">Hangi bildirimleri almak istediğini seç</p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { key: 'coinEarned', label: 'Coin Kazandım', desc: 'Coin kazandığında bildirim al' },
              { key: 'commentReply', label: 'Yoruma Cevap', desc: 'Yorumuna cevap geldiğinde' },
              { key: 'contentLiked', label: 'İçerik Beğenildi', desc: 'İçeriğin beğenildiğinde' },
              { key: 'levelUp', label: 'Seviye Atladım', desc: 'Yeni seviyeye ulaştığında' },
              { key: 'roleChange', label: 'Rol Değişimi', desc: 'Rolün değiştiğinde' },
              { key: 'wikiUpdate', label: 'Wiki Güncellemeleri', desc: 'Takip ettiğin wiki\'ler güncellendiğinde' },
              { key: 'kbbAnnouncement', label: 'KBB Duyuruları', desc: 'Önemli duyurular' },
              { key: 'userTagged', label: 'Etiketlendim', desc: 'Biri seni etiketlediğinde' },
              { key: 'emailNotifications', label: 'E-posta Bildirimleri', desc: 'Bildirimleri e-posta ile al' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{item.label}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
                <button
                  onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notifications[item.key as keyof typeof notifications] ? 'bg-[#00BFA5]' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      notifications[item.key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={handleSaveNotifications}
            className="w-full mt-6 px-6 py-3 bg-[#00BFA5] hover:bg-[#009688] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Check size={20} />
            Bildirim Tercihlerini Kaydet
          </button>
        </section>

        {/* 3. Gizlilik Ayarları */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <Lock size={24} className="text-amber-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Gizlilik</h2>
              <p className="text-sm text-gray-500">Gizlilik ayarlarını yönet</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Profil Görünürlüğü */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Profil Görünürlüğü
              </label>
              <select
                value={privacy.profileVisibility}
                onChange={(e) => setPrivacy(prev => ({ ...prev, profileVisibility: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00BFA5] focus:border-transparent transition-all"
              >
                <option value="public">🌍 Herkese Açık</option>
                <option value="friends">👥 Sadece Arkadaşlar</option>
                <option value="private">🔒 Özel (Sadece Ben)</option>
              </select>
            </div>

            {/* Diğer Gizlilik Seçenekleri */}
            {[
              { key: 'showEmail', label: 'E-posta Adresini Göster', desc: 'E-posta adresin profilinde görünsün' },
              { key: 'showActivity', label: 'Aktivite Geçmişini Göster', desc: 'Yaptığın düzenlemeler ve yorumlar görünsün' },
              { key: 'allowMessages', label: 'Mesajlara İzin Ver', desc: 'Diğer kullanıcılar sana mesaj atabilsin' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{item.label}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
                <button
                  onClick={() => setPrivacy(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    privacy[item.key as keyof typeof privacy] ? 'bg-[#00BFA5]' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      privacy[item.key as keyof typeof privacy] ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={handleSavePrivacy}
            className="w-full mt-6 px-6 py-3 bg-[#00BFA5] hover:bg-[#009688] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Check size={20} />
            Gizlilik Ayarlarını Kaydet
          </button>
        </section>

        {/* 4. Tema */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
              <Palette size={24} className="text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Tema</h2>
              <p className="text-sm text-gray-500">Açık/Koyu mod seçenekleri</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { value: 'light', label: '☀️ Açık', desc: 'Aydınlık tema' },
              { value: 'dark', label: '🌙 Koyu', desc: 'Karanlık tema' },
              { value: 'auto', label: '🔄 Otomatik', desc: 'Sistem temasını takip et' },
            ].map((item) => (
              <button
                key={item.value}
                onClick={() => setTheme(item.value)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  theme === item.value
                    ? 'border-[#00BFA5] bg-[#00BFA5]/10 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <div className="text-2xl mb-2">{item.label.split(' ')[0]}</div>
                <p className="font-semibold text-gray-900 text-sm">{item.label.split(' ')[1]}</p>
                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                {theme === item.value && (
                  <div className="mt-2 flex justify-center">
                    <Check size={20} className="text-[#00BFA5]" />
                  </div>
                )}
              </button>
            ))}
          </div>

          <button
            onClick={handleSaveTheme}
            className="w-full mt-6 px-6 py-3 bg-[#00BFA5] hover:bg-[#009688] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Check size={20} />
            Tema Tercihini Kaydet
          </button>
        </section>

        {/* 5. Dil Ayarları */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Globe size={24} className="text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Dil</h2>
              <p className="text-sm text-gray-500">Uygulama dilini değiştir</p>
            </div>
          </div>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00BFA5] focus:border-transparent transition-all"
          >
            <option value="tr">🇹🇷 Türkçe</option>
            <option value="en">🇬🇧 English</option>
            <option value="de">🇩🇪 Deutsch</option>
            <option value="fr">🇫🇷 Français</option>
          </select>

          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-800">
              <strong>💡 Not:</strong> Dil değişikliği şu an mock olarak çalışmaktadır. Gerçek uygulamada tüm arayüz seçilen dile çevrilecektir.
            </p>
          </div>
        </section>

        {/* 6. Hesap Yönetimi */}
        <section className="bg-white rounded-2xl shadow-sm border border-red-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <Shield size={24} className="text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Tehlikeli Bölge</h2>
              <p className="text-sm text-gray-500">Hesap yönetimi ve silme işlemleri</p>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
              <Mail size={20} />
              E-posta Adresini Doğrula
            </button>
            
            <button className="w-full px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
              Hesabı Geçici Olarak Dondur
            </button>
            
            <button className="w-full px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
              <X size={20} />
              Hesabı Kalıcı Olarak Sil
            </button>
          </div>

          <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-sm text-red-800">
              <strong>⚠️ Uyarı:</strong> Hesabını silersen tüm verilerini ve coin'lerini kaybedersin. Bu işlem geri alınamaz!
            </p>
          </div>
        </section>

        </div>
      </div>
    </div>
  );
}

export default SettingsPage;

