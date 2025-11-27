import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, Mail, Monitor, BookOpen, Smartphone } from 'lucide-react';
import { COLORS } from '../constants';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [tcNo, setTcNo] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

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

  return (
    <div className="min-h-screen flex">
      {/* Sol Panel - Hoş Geldin */}
      <div 
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
        style={{ backgroundColor: COLORS.turquoise }}
      >
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
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Logo ve Başlık */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Konya Genç Wiki</h2>
            <p className="text-slate-500">Genç Kültür Kart</p>
          </div>

          {/* Tab Seçici */}
          <div className="flex mb-8 border border-slate-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activeTab === 'login'
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'bg-slate-50 text-slate-500 hover:text-slate-700'
              }`}
            >
              Giriş Yap
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activeTab === 'register'
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'bg-slate-50 text-slate-500 hover:text-slate-700'
              }`}
            >
              Kayıt Ol
            </button>
          </div>

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
              <button type="button" className="text-sm font-medium" style={{ color: COLORS.turquoise }}>
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
          <button className="w-full flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
            <Mail size={18} />
            <span>Üniversite E-postası (.edu.tr) ile Kayıt Ol</span>
          </button>

          {/* Alt Bilgi */}
          <p className="text-center text-xs text-slate-400 mt-8">
            Konya Büyükşehir Belediyesi Projesidir
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

