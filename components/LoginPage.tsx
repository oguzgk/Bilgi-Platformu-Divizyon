import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, Mail, Monitor, BookOpen, Smartphone, User, Phone, Eye, EyeOff, CheckCircle2, ArrowLeft, KeyRound } from 'lucide-react';
import { COLORS } from '../constants';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'forgot'>('login');
  const [tcNo, setTcNo] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Kayıt formu state'leri
  const [registerData, setRegisterData] = useState({
    fullName: '',
    email: '',
    tcNo: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [registerSuccess, setRegisterSuccess] = useState(false);
  
  // Şifremi unuttum state'leri
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Test kullanıcısı: TC: 123, Şifre: 123
    if (tcNo === '123' && password === '123') {
      onLogin();
      navigate('/');
    } else {
      setError('Geçersiz TC No veya şifre. Test için: TC: 123, Şifre: 123');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validasyon
    if (!registerData.fullName || !registerData.email || !registerData.tcNo || !registerData.phone || !registerData.password) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setError('Şifreler eşleşmiyor.');
      return;
    }

    if (registerData.password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır.');
      return;
    }

    if (!registerData.acceptTerms) {
      setError('Kullanım koşullarını kabul etmelisiniz.');
      return;
    }

    // Başarılı kayıt simülasyonu
    setRegisterSuccess(true);
    setTimeout(() => {
      setRegisterSuccess(false);
      setActiveTab('login');
      setRegisterData({
        fullName: '',
        email: '',
        tcNo: '',
        phone: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
      });
    }, 2000);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!forgotEmail) {
      setError('Lütfen e-posta adresinizi girin.');
      return;
    }

    // E-posta format kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(forgotEmail)) {
      setError('Geçerli bir e-posta adresi girin.');
      return;
    }

    // Başarılı gönderim simülasyonu
    setForgotSuccess(true);
    setTimeout(() => {
      setForgotSuccess(false);
      setActiveTab('login');
      setForgotEmail('');
    }, 3000);
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sol Panel - Hoş Geldin */}
      <div 
        className="hidden lg:flex lg:w-1/2 h-screen relative overflow-hidden flex-shrink-0"
        style={{ backgroundColor: COLORS.turquoise }}
      >
        {/* Arka Plan Görseli - Konya Mevlana */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1596306499317-8490fd7fa7cd?q=80&w=1920&auto=format&fit=crop')`,
            filter: 'brightness(0.4) saturate(1.2)',
          }}
        />
        
        {/* Türkuaz Gradient Overlay */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: `linear-gradient(135deg, ${COLORS.turquoise}dd 0%, ${COLORS.turquoise}99 50%, ${COLORS.turquoise}cc 100%)`,
          }}
        />
        
        {/* Arka plan efekti - deniz dalgası */}
        <div className="absolute inset-0 opacity-30">
          <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path 
              fill="rgba(255,255,255,0.1)" 
              d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
          <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path 
              fill="rgba(255,255,255,0.15)" 
              d="M0,256L48,240C96,224,192,192,288,192C384,192,480,224,576,218.7C672,213,768,171,864,165.3C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>

        {/* İçerik */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Şehrin Bilgi Evrenine Hoş Geldin
          </h1>
          <p className="text-xl text-white/90 mb-12">
            Paylaş, Kazan, Harca
          </p>

          {/* İkonlar */}
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <Monitor size={28} className="text-white" />
            </div>
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <BookOpen size={28} className="text-white" />
            </div>
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <Smartphone size={28} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Sağ Panel - Giriş Formu */}
      <div className="w-full lg:w-1/2 flex flex-col bg-white">
        {/* Sabit Üst Kısım - Logo ve Tab'lar */}
        <div className="flex-shrink-0 px-8 pt-8">
          <div className="max-w-md mx-auto">
            {/* Logo ve Başlık */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Konya Genç Wiki</h2>
              <p className="text-slate-500">Genç Kültür Kart</p>
            </div>

            {/* Tab Seçici */}
            {activeTab !== 'forgot' ? (
              <div className="flex mb-6 border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => {
                    setActiveTab('login');
                    setError('');
                  }}
                  className="flex-1 py-3 text-sm font-medium transition-all"
                  style={activeTab === 'login' 
                    ? { backgroundColor: COLORS.turquoise, color: 'white' } 
                    : { backgroundColor: '#f8fafc', color: '#64748b' }
                  }
                >
                  Giriş Yap
                </button>
                <button
                  onClick={() => {
                    setActiveTab('register');
                    setError('');
                  }}
                  className="flex-1 py-3 text-sm font-medium transition-all"
                  style={activeTab === 'register' 
                    ? { backgroundColor: COLORS.turquoise, color: 'white' } 
                    : { backgroundColor: '#f8fafc', color: '#64748b' }
                  }
                >
                  Kayıt Ol
                </button>
              </div>
            ) : (
              <div className="mb-6">
                <button
                  onClick={() => {
                    setActiveTab('login');
                    setError('');
                    setForgotEmail('');
                  }}
                  className="flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity"
                  style={{ color: COLORS.turquoise }}
                >
                  <ArrowLeft size={18} />
                  Giriş Sayfasına Dön
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Scroll Edilebilir Form Alanı */}
        <div className="flex-1 overflow-y-auto px-8 pb-8">
          <div className="max-w-md mx-auto">

          {activeTab === 'forgot' ? (
            <>
              {/* Şifremi Unuttum Ekranı */}
              {forgotSuccess ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                    <Mail size={40} className="text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">E-posta Gönderildi!</h3>
                  <p className="text-slate-500 mb-2">Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.</p>
                  <p className="text-sm text-slate-400">Giriş sayfasına yönlendiriliyorsunuz...</p>
                </div>
              ) : (
                <>
                  {/* Şifremi Unuttum Başlık */}
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${COLORS.turquoise}15` }}>
                      <KeyRound size={32} style={{ color: COLORS.turquoise }} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Şifreni mi Unuttun?</h3>
                    <p className="text-sm text-slate-500">
                      Endişelenme! E-posta adresini gir, sana şifre sıfırlama bağlantısı gönderelim.
                    </p>
                  </div>

                  {/* Şifremi Unuttum Formu */}
                  <form onSubmit={handleForgotPassword} className="space-y-5">
                    {/* E-posta */}
                    <div>
                      <label className="block text-sm text-slate-600 mb-2">
                        E-posta Adresi
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                          <Mail size={18} />
                        </div>
                        <input
                          type="email"
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          placeholder="ornek@email.com"
                          className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700"
                        />
                      </div>
                    </div>

                    {/* Hata Mesajı */}
                    {error && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                        {error}
                      </div>
                    )}

                    {/* Gönder Butonu */}
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl text-white font-bold text-sm uppercase tracking-wide shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
                      style={{ backgroundColor: COLORS.turquoise }}
                    >
                      SIFIRLAMA BAĞLANTISI GÖNDER
                    </button>
                  </form>

                  {/* Alt Bilgi */}
                  <div className="mt-6 p-4 bg-slate-50 rounded-xl">
                    <p className="text-xs text-slate-500 text-center">
                      Şifre sıfırlama bağlantısı 24 saat geçerlidir. Spam klasörünü de kontrol etmeyi unutmayın.
                    </p>
                  </div>
                </>
              )}
            </>
          ) : activeTab === 'login' ? (
            <>
              {/* Giriş Formu */}
              <form onSubmit={handleLogin} className="space-y-5">
                {/* TC No */}
                <div>
                  <label className="block text-sm text-slate-600 mb-2">
                    Genç Kültür Kart ID / T.C. No
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <CreditCard size={18} />
                    </div>
                    <input
                      type="text"
                      value={tcNo}
                      onChange={(e) => setTcNo(e.target.value)}
                      placeholder="12345678901"
                      className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700"
                    />
                  </div>
                </div>

                {/* Şifre */}
                <div>
                  <label className="block text-sm text-slate-600 mb-2">
                    Şifre
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <Lock size={18} />
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700"
                    />
                  </div>
                </div>

                {/* Beni Hatırla & Şifremi Unuttum */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500"
                    />
                    <span className="text-sm text-slate-600">Beni Hatırla</span>
                  </label>
                  <button 
                    type="button" 
                    onClick={() => {
                      setActiveTab('forgot');
                      setError('');
                    }}
                    className="text-sm font-medium hover:underline" 
                    style={{ color: COLORS.turquoise }}
                  >
                    Şifremi Unuttum
                  </button>
                </div>

                {/* Hata Mesajı */}
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                    {error}
                  </div>
                )}

                {/* Giriş Butonu */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl text-white font-bold text-sm uppercase tracking-wide shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
                  style={{ backgroundColor: COLORS.turquoise }}
                >
                  GİRİŞ YAP
                </button>
              </form>

              {/* Ayırıcı */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-slate-200"></div>
                <span className="text-sm text-slate-400">veya</span>
                <div className="flex-1 h-px bg-slate-200"></div>
              </div>

              {/* Üniversite E-posta ile Kayıt */}
              <button 
                onClick={() => setActiveTab('register')}
                className="w-full flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <Mail size={18} />
                <span>Üniversite E-postası (.edu.tr) ile Kayıt Ol</span>
              </button>
            </>
          ) : (
            <>
              {/* Kayıt Başarılı Mesajı */}
              {registerSuccess ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={40} className="text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Kayıt Başarılı!</h3>
                  <p className="text-slate-500">Giriş sayfasına yönlendiriliyorsunuz...</p>
                </div>
              ) : (
                <>
                  {/* Kayıt Formu */}
                  <form onSubmit={handleRegister} className="space-y-4">
                    {/* Ad Soyad */}
                    <div>
                      <label className="block text-sm text-slate-600 mb-2">
                        Ad Soyad
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                          <User size={18} />
                        </div>
                        <input
                          type="text"
                          value={registerData.fullName}
                          onChange={(e) => setRegisterData({...registerData, fullName: e.target.value})}
                          placeholder="Adınız Soyadınız"
                          className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700"
                        />
                      </div>
                    </div>

                    {/* E-posta */}
                    <div>
                      <label className="block text-sm text-slate-600 mb-2">
                        E-posta Adresi
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                          <Mail size={18} />
                        </div>
                        <input
                          type="email"
                          value={registerData.email}
                          onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                          placeholder="ornek@universite.edu.tr"
                          className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700"
                        />
                      </div>
                    </div>

                    {/* TC No ve Telefon - Yan yana */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm text-slate-600 mb-2">
                          T.C. Kimlik No
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                            <CreditCard size={16} />
                          </div>
                          <input
                            type="text"
                            maxLength={11}
                            value={registerData.tcNo}
                            onChange={(e) => setRegisterData({...registerData, tcNo: e.target.value.replace(/\D/g, '')})}
                            placeholder="12345678901"
                            className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700 text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-slate-600 mb-2">
                          Telefon
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                            <Phone size={16} />
                          </div>
                          <input
                            type="tel"
                            value={registerData.phone}
                            onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
                            placeholder="05XX XXX XX XX"
                            className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700 text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Şifre */}
                    <div>
                      <label className="block text-sm text-slate-600 mb-2">
                        Şifre
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                          <Lock size={18} />
                        </div>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={registerData.password}
                          onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                          placeholder="En az 6 karakter"
                          className="w-full pl-12 pr-12 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    {/* Şifre Tekrar */}
                    <div>
                      <label className="block text-sm text-slate-600 mb-2">
                        Şifre Tekrar
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                          <Lock size={18} />
                        </div>
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={registerData.confirmPassword}
                          onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                          placeholder="Şifrenizi tekrar girin"
                          className="w-full pl-12 pr-12 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    {/* Kullanım Koşulları */}
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="acceptTerms"
                        checked={registerData.acceptTerms}
                        onChange={(e) => setRegisterData({...registerData, acceptTerms: e.target.checked})}
                        className="w-4 h-4 mt-0.5 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500"
                      />
                      <label htmlFor="acceptTerms" className="text-sm text-slate-600 cursor-pointer">
                        <span className="font-medium" style={{ color: COLORS.turquoise }}>Kullanım Koşulları</span> ve{' '}
                        <span className="font-medium" style={{ color: COLORS.turquoise }}>Gizlilik Politikası</span>'nı okudum, kabul ediyorum.
                      </label>
                    </div>

                    {/* Hata Mesajı */}
                    {error && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                        {error}
                      </div>
                    )}

                    {/* Kayıt Butonu */}
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl text-white font-bold text-sm uppercase tracking-wide shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
                      style={{ backgroundColor: COLORS.turquoise }}
                    >
                      KAYIT OL
                    </button>
                  </form>

                  {/* Ayırıcı */}
                  <div className="flex items-center gap-4 my-5">
                    <div className="flex-1 h-px bg-slate-200"></div>
                    <span className="text-sm text-slate-400">veya</span>
                    <div className="flex-1 h-px bg-slate-200"></div>
                  </div>

                  {/* Giriş Yap linki */}
                  <p className="text-center text-sm text-slate-600">
                    Zaten hesabın var mı?{' '}
                    <button 
                      onClick={() => {
                        setActiveTab('login');
                        setError('');
                      }}
                      className="font-semibold hover:underline"
                      style={{ color: COLORS.turquoise }}
                    >
                      Giriş Yap
                    </button>
                  </p>
                </>
              )}
            </>
          )}

          {/* Alt Bilgi */}
          <p className="text-center text-xs text-slate-400 mt-8">
            Konya Büyükşehir Belediyesi Projesidir
          </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

