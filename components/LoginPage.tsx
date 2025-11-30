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
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Kayıt formu state'leri
  const [registerData, setRegisterData] = useState({
    fullName: '',
    email: '',
    genckartId: '',
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

    const idRaw = loginIdentifier.trim();
    const id = idRaw.toLowerCase();

    // Eğer kullanıcı e-posta girdiyse, yalnızca .edu.tr domainini kabul et
    if (id.includes('@')) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(id)) {
        setError('Geçerli bir e-posta adresi girin.');
        return;
      }
      const atIndex = id.lastIndexOf('@');
      if (atIndex === -1) {
        setError('Geçerli bir e-posta adresi girin.');
        return;
      }
      const domain = id.slice(atIndex + 1);
      if (!domain.endsWith('edu.tr')) {
        setError('Sadece "@...edu.tr" domainine sahip üniversite e-postaları kabul edilir.');
        return;
      }

      // Test e-posta kullanıcı
      if (id === 'test@uni.edu.tr' && password === '123') {
        onLogin();
        navigate('/');
        return;
      }
    } else {
      // Genç Kart ID ile giriş
      if (id === '123' && password === '123') {
        onLogin();
        navigate('/');
        return;
      }
    }

    setError('Geçersiz Genç Kart ID, üniversite e-posta adresi veya şifre. Test: ID: 123 veya test@uni.edu.tr (Şifre: 123)');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validasyon
    // Zorunlu alanlar: fullName, phone, password ve en az biri: genckartId veya üniversite e-posta
    if (!registerData.fullName || !registerData.phone || !registerData.password || (!registerData.genckartId && !registerData.email)) {
      setError('Lütfen tüm gerekli alanları doldurun (Genç Kart ID veya üniversite e-posta dahil).');
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

    // Eğer e-posta sağlanmışsa, format ve domain kontrolü yap
    if (registerData.email) {
      const email = registerData.email.trim().toLowerCase();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Geçerli bir e-posta adresi girin.');
        return;
      }
      const atIndex = email.lastIndexOf('@');
      if (atIndex === -1) {
        setError('Geçerli bir e-posta adresi girin.');
        return;
      }
      const domain = email.slice(atIndex + 1);
      if (!domain.endsWith('edu.tr')) {
        setError('E-posta adresi "@...edu.tr" domainiyle bitmelidir.');
        return;
      }
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
        genckartId: '',
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
    const atIndex = forgotEmail.lastIndexOf('@');
    if (atIndex === -1) {
      setError('Geçerli bir e-posta adresi girin.');
      return;
    }
    const domain = forgotEmail.toLowerCase().slice(atIndex + 1);
    if (!domain.endsWith('edu.tr')) {
      setError('Sadece "@...edu.tr" domainine sahip üniversite e-postaları kabul edilir.');
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

        {/* Zambak Çiçekleri */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Merkez - Büyük Zambak */}
          <svg 
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
            width="450" 
            height="80vh" 
            viewBox="0 0 200 300"
            style={{
              animation: 'lilyGrow 2s ease-out forwards',
              transformOrigin: 'bottom center'
            }}
          >
            {/* Gövde (kalın ve düz) */}
            <path
              d="M 100 300 L 100 60"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            
            {/* Sol alt yaprak */}
            <path
              d="M 100 240 Q 55 235, 35 255 Q 40 265, 100 248"
              fill="rgba(255,255,255,0.65)"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="1.5"
            />
            
            {/* Sağ alt yaprak */}
            <path
              d="M 100 240 Q 145 235, 165 255 Q 160 265, 100 248"
              fill="rgba(255,255,255,0.65)"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="1.5"
            />
            
            {/* Sol orta yaprak */}
            <path
              d="M 100 170 Q 60 168, 42 182 Q 46 190, 100 175"
              fill="rgba(255,255,255,0.65)"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="1.5"
            />
            
            {/* Sağ orta yaprak */}
            <path
              d="M 100 170 Q 140 168, 158 182 Q 154 190, 100 175"
              fill="rgba(255,255,255,0.65)"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="1.5"
            />
            
            {/* Zambak yaprakları - 6 taç yaprak (uzun, sivri, geriye kıvrımlı) */}
            
            {/* Arka üç yaprak */}
            <path
              d="M 100 60 Q 82 45, 72 20 Q 68 5, 65 -5 Q 72 0, 78 10 Q 88 30, 100 60"
              fill="rgba(255,255,255,0.75)"
              stroke="rgba(255,255,255,0.95)"
              strokeWidth="1.5"
            />
            <path
              d="M 100 60 Q 100 40, 100 20 Q 100 5, 100 -5 Q 100 5, 100 20 Q 100 40, 100 60"
              fill="rgba(255,255,255,0.75)"
              stroke="rgba(255,255,255,0.95)"
              strokeWidth="1.5"
            />
            <path
              d="M 100 60 Q 118 45, 128 20 Q 132 5, 135 -5 Q 128 0, 122 10 Q 112 30, 100 60"
              fill="rgba(255,255,255,0.75)"
              stroke="rgba(255,255,255,0.95)"
              strokeWidth="1.5"
            />
            
            {/* Ön üç yaprak (daha beyaz ve belirgin) */}
            <path
              d="M 100 60 Q 65 48, 45 28 Q 30 8, 18 -10 Q 32 -5, 46 5 Q 72 35, 100 60"
              fill="rgba(255,255,255,0.88)"
              stroke="rgba(255,255,255,1)"
              strokeWidth="2"
            />
            <path
              d="M 100 60 Q 135 48, 155 28 Q 170 8, 182 -10 Q 168 -5, 154 5 Q 128 35, 100 60"
              fill="rgba(255,255,255,0.88)"
              stroke="rgba(255,255,255,1)"
              strokeWidth="2"
            />
            <path
              d="M 100 60 Q 94 35, 88 15 Q 85 0, 82 -10 Q 90 -3, 95 8 Q 98 30, 100 60"
              fill="rgba(255,255,255,0.88)"
              stroke="rgba(255,255,255,1)"
              strokeWidth="2"
            />
            
            {/* Organ (erkek üreme organı - polen çubukları) */}
            <line x1="100" y1="60" x2="93" y2="40" stroke="rgba(180,255,180,0.9)" strokeWidth="1.5" />
            <line x1="100" y1="60" x2="100" y2="37" stroke="rgba(180,255,180,0.9)" strokeWidth="1.5" />
            <line x1="100" y1="60" x2="107" y2="40" stroke="rgba(180,255,180,0.9)" strokeWidth="1.5" />
            
            {/* Polen (turuncu uçlar) */}
            <ellipse cx="93" cy="38" rx="2.5" ry="3.5" fill="rgba(255,140,0,0.95)" />
            <ellipse cx="100" cy="35" rx="2.5" ry="3.5" fill="rgba(255,140,0,0.95)" />
            <ellipse cx="107" cy="38" rx="2.5" ry="3.5" fill="rgba(255,140,0,0.95)" />
            
            {/* Dişi organ (merkez pistil) */}
            <line x1="100" y1="60" x2="100" y2="30" stroke="rgba(200,255,200,0.95)" strokeWidth="2" />
            <circle cx="100" cy="28" r="3" fill="rgba(150,255,150,0.95)" />
          </svg>

          {/* Küçük Zambak 1 - En sol */}
          <svg 
            className="absolute bottom-0"
            style={{
              left: '5%',
              animation: 'lilyGrow 2s ease-out forwards 0.2s',
              transformOrigin: 'bottom center',
              opacity: 0,
              width: '280px',
              height: '280px'
            }}
            viewBox="0 0 200 200"
          >
            <path d="M 100 200 L 100 90" stroke="rgba(255,255,255,0.75)" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 100 140 Q 70 135, 58 148 Q 60 152, 100 143" fill="rgba(255,255,255,0.6)" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />
            
            <path d="M 100 90 Q 90 80, 85 62 Q 83 50, 82 42 Q 86 48, 90 58 Q 95 73, 100 90" fill="rgba(255,255,255,0.7)" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" />
            <path d="M 100 90 Q 100 75, 100 58 Q 100 45, 100 38 Q 100 45, 100 58 Q 100 75, 100 90" fill="rgba(255,255,255,0.7)" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" />
            <path d="M 100 90 Q 110 80, 115 62 Q 117 50, 118 42 Q 114 48, 110 58 Q 105 73, 100 90" fill="rgba(255,255,255,0.7)" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" />
            <path d="M 100 90 Q 78 82, 68 70 Q 60 58, 55 48 Q 63 55, 72 65 Q 85 78, 100 90" fill="rgba(255,255,255,0.82)" stroke="rgba(255,255,255,0.98)" strokeWidth="1.8" />
            <path d="M 100 90 Q 122 82, 132 70 Q 140 58, 145 48 Q 137 55, 128 65 Q 115 78, 100 90" fill="rgba(255,255,255,0.82)" stroke="rgba(255,255,255,0.98)" strokeWidth="1.8" />
            <path d="M 100 90 Q 97 70, 94 52 Q 93 40, 92 32 Q 96 38, 98 48 Q 99 65, 100 90" fill="rgba(255,255,255,0.82)" stroke="rgba(255,255,255,0.98)" strokeWidth="1.8" />
            
            <line x1="100" y1="90" x2="97" y2="75" stroke="rgba(180,255,180,0.85)" strokeWidth="1.2" />
            <line x1="100" y1="90" x2="100" y2="73" stroke="rgba(180,255,180,0.85)" strokeWidth="1.2" />
            <line x1="100" y1="90" x2="103" y2="75" stroke="rgba(180,255,180,0.85)" strokeWidth="1.2" />
            <ellipse cx="97" cy="73" rx="2" ry="3" fill="rgba(255,140,0,0.9)" />
            <ellipse cx="100" cy="71" rx="2" ry="3" fill="rgba(255,140,0,0.9)" />
            <ellipse cx="103" cy="73" rx="2" ry="3" fill="rgba(255,140,0,0.9)" />
          </svg>

          {/* Küçük Zambak 2 - Sol ortada */}
          <svg 
            className="absolute bottom-0"
            style={{
              left: '28%',
              animation: 'lilyGrow 2s ease-out forwards 0.3s',
              transformOrigin: 'bottom center',
              opacity: 0,
              width: '280px',
              height: '280px'
            }}
            viewBox="0 0 200 200"
          >
            <path d="M 100 200 L 100 90" stroke="rgba(255,255,255,0.75)" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 100 140 Q 130 135, 142 148 Q 140 152, 100 143" fill="rgba(255,255,255,0.6)" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />
            
            <path d="M 100 90 Q 90 80, 85 62 Q 83 50, 82 42 Q 86 48, 90 58 Q 95 73, 100 90" fill="rgba(255,255,255,0.7)" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" />
            <path d="M 100 90 Q 100 75, 100 58 Q 100 45, 100 38 Q 100 45, 100 58 Q 100 75, 100 90" fill="rgba(255,255,255,0.7)" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" />
            <path d="M 100 90 Q 110 80, 115 62 Q 117 50, 118 42 Q 114 48, 110 58 Q 105 73, 100 90" fill="rgba(255,255,255,0.7)" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" />
            <path d="M 100 90 Q 78 82, 68 70 Q 60 58, 55 48 Q 63 55, 72 65 Q 85 78, 100 90" fill="rgba(255,255,255,0.82)" stroke="rgba(255,255,255,0.98)" strokeWidth="1.8" />
            <path d="M 100 90 Q 122 82, 132 70 Q 140 58, 145 48 Q 137 55, 128 65 Q 115 78, 100 90" fill="rgba(255,255,255,0.82)" stroke="rgba(255,255,255,0.98)" strokeWidth="1.8" />
            <path d="M 100 90 Q 97 70, 94 52 Q 93 40, 92 32 Q 96 38, 98 48 Q 99 65, 100 90" fill="rgba(255,255,255,0.82)" stroke="rgba(255,255,255,0.98)" strokeWidth="1.8" />
            
            <line x1="100" y1="90" x2="97" y2="75" stroke="rgba(180,255,180,0.85)" strokeWidth="1.2" />
            <line x1="100" y1="90" x2="100" y2="73" stroke="rgba(180,255,180,0.85)" strokeWidth="1.2" />
            <line x1="100" y1="90" x2="103" y2="75" stroke="rgba(180,255,180,0.85)" strokeWidth="1.2" />
            <ellipse cx="97" cy="73" rx="2" ry="3" fill="rgba(255,140,0,0.9)" />
            <ellipse cx="100" cy="71" rx="2" ry="3" fill="rgba(255,140,0,0.9)" />
            <ellipse cx="103" cy="73" rx="2" ry="3" fill="rgba(255,140,0,0.9)" />
          </svg>

          {/* Küçük Zambak 3 - Sağ ortada */}
          <svg 
            className="absolute bottom-0"
            style={{
              right: '28%',
              animation: 'lilyGrow 2s ease-out forwards 0.4s',
              transformOrigin: 'bottom center',
              opacity: 0,
              width: '280px',
              height: '280px'
            }}
            viewBox="0 0 200 200"
          >
            <path d="M 100 200 L 100 100" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 100 150 Q 72 146, 62 158 Q 64 162, 100 153" fill="rgba(255,255,255,0.55)" stroke="rgba(255,255,255,0.75)" strokeWidth="1.3" />
            
            <path d="M 100 100 Q 92 92, 88 78 Q 86 68, 85 62 Q 88 67, 91 75 Q 95 87, 100 100" fill="rgba(255,255,255,0.65)" stroke="rgba(255,255,255,0.85)" strokeWidth="1.3" />
            <path d="M 100 100 Q 100 88, 100 74 Q 100 63, 100 57 Q 100 63, 100 74 Q 100 88, 100 100" fill="rgba(255,255,255,0.65)" stroke="rgba(255,255,255,0.85)" strokeWidth="1.3" />
            <path d="M 100 100 Q 108 92, 112 78 Q 114 68, 115 62 Q 112 67, 109 75 Q 105 87, 100 100" fill="rgba(255,255,255,0.65)" stroke="rgba(255,255,255,0.85)" strokeWidth="1.3" />
            <path d="M 100 100 Q 82 93, 74 83 Q 68 72, 64 62 Q 70 68, 77 78 Q 88 91, 100 100" fill="rgba(255,255,255,0.75)" stroke="rgba(255,255,255,0.95)" strokeWidth="1.5" />
            <path d="M 100 100 Q 118 93, 126 83 Q 132 72, 136 62 Q 130 68, 123 78 Q 112 91, 100 100" fill="rgba(255,255,255,0.75)" stroke="rgba(255,255,255,0.95)" strokeWidth="1.5" />
            <path d="M 100 100 Q 98 82, 95 66 Q 94 56, 93 50 Q 96 55, 98 63 Q 99 78, 100 100" fill="rgba(255,255,255,0.75)" stroke="rgba(255,255,255,0.95)" strokeWidth="1.5" />
            
            <line x1="100" y1="100" x2="97" y2="87" stroke="rgba(180,255,180,0.8)" strokeWidth="1" />
            <line x1="100" y1="100" x2="100" y2="85" stroke="rgba(180,255,180,0.8)" strokeWidth="1" />
            <line x1="100" y1="100" x2="103" y2="87" stroke="rgba(180,255,180,0.8)" strokeWidth="1" />
            <ellipse cx="97" cy="85" rx="1.8" ry="2.5" fill="rgba(255,140,0,0.85)" />
            <ellipse cx="100" cy="83" rx="1.8" ry="2.5" fill="rgba(255,140,0,0.85)" />
            <ellipse cx="103" cy="85" rx="1.8" ry="2.5" fill="rgba(255,140,0,0.85)" />
          </svg>

          {/* Küçük Zambak 4 - En sağ */}
          <svg 
            className="absolute bottom-0"
            style={{
              right: '5%',
              animation: 'lilyGrow 2s ease-out forwards 0.5s',
              transformOrigin: 'bottom center',
              opacity: 0,
              width: '280px',
              height: '280px'
            }}
            viewBox="0 0 200 200"
          >
            <path d="M 100 200 L 100 100" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 100 150 Q 128 146, 138 158 Q 136 162, 100 153" fill="rgba(255,255,255,0.55)" stroke="rgba(255,255,255,0.75)" strokeWidth="1.3" />
            
            <path d="M 100 100 Q 92 92, 88 78 Q 86 68, 85 62 Q 88 67, 91 75 Q 95 87, 100 100" fill="rgba(255,255,255,0.65)" stroke="rgba(255,255,255,0.85)" strokeWidth="1.3" />
            <path d="M 100 100 Q 100 88, 100 74 Q 100 63, 100 57 Q 100 63, 100 74 Q 100 88, 100 100" fill="rgba(255,255,255,0.65)" stroke="rgba(255,255,255,0.85)" strokeWidth="1.3" />
            <path d="M 100 100 Q 108 92, 112 78 Q 114 68, 115 62 Q 112 67, 109 75 Q 105 87, 100 100" fill="rgba(255,255,255,0.65)" stroke="rgba(255,255,255,0.85)" strokeWidth="1.3" />
            <path d="M 100 100 Q 82 93, 74 83 Q 68 72, 64 62 Q 70 68, 77 78 Q 88 91, 100 100" fill="rgba(255,255,255,0.75)" stroke="rgba(255,255,255,0.95)" strokeWidth="1.5" />
            <path d="M 100 100 Q 118 93, 126 83 Q 132 72, 136 62 Q 130 68, 123 78 Q 112 91, 100 100" fill="rgba(255,255,255,0.75)" stroke="rgba(255,255,255,0.95)" strokeWidth="1.5" />
            <path d="M 100 100 Q 98 82, 95 66 Q 94 56, 93 50 Q 96 55, 98 63 Q 99 78, 100 100" fill="rgba(255,255,255,0.75)" stroke="rgba(255,255,255,0.95)" strokeWidth="1.5" />
            
            <line x1="100" y1="100" x2="97" y2="87" stroke="rgba(180,255,180,0.8)" strokeWidth="1" />
            <line x1="100" y1="100" x2="100" y2="85" stroke="rgba(180,255,180,0.8)" strokeWidth="1" />
            <line x1="100" y1="100" x2="103" y2="87" stroke="rgba(180,255,180,0.8)" strokeWidth="1" />
            <ellipse cx="97" cy="85" rx="1.8" ry="2.5" fill="rgba(255,140,0,0.85)" />
            <ellipse cx="100" cy="83" rx="1.8" ry="2.5" fill="rgba(255,140,0,0.85)" />
            <ellipse cx="103" cy="85" rx="1.8" ry="2.5" fill="rgba(255,140,0,0.85)" />
          </svg>
        </div>

        <style>{`
          @keyframes lilyGrow {
            0% {
              transform: scale(0) translateY(50px);
              opacity: 0;
            }
            100% {
              transform: scale(1) translateY(0);
              opacity: 0.3;
            }
          }
        `}</style>
        
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
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4 leading-tight">
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
              <h2 className="text-3xl font-semibold text-slate-800 mb-2">Konya Genç Wiki</h2>
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
                  className="flex-1 py-3 text-sm font-normal transition-all"
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
                  className="flex-1 py-3 text-sm font-normal transition-all"
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
                  className="flex items-center gap-2 text-sm font-normal hover:opacity-80 transition-opacity"
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
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">E-posta Gönderildi!</h3>
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
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">Şifreni mi Unuttun?</h3>
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
                      className="w-full py-3.5 rounded-xl text-white font-semibold text-sm uppercase tracking-wide shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
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
                    Genç Kart ID
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <CreditCard size={18} />
                    </div>
                    <input
                      type="text"
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      placeholder="Genç Kart ID veya üniversite e-posta (.edu.tr)"
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
                    className="text-sm font-normal hover:underline" 
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
                  className="w-full py-3.5 rounded-xl text-white font-semibold text-sm uppercase tracking-wide shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
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
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Kayıt Başarılı!</h3>
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
                          Genç Kart ID
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                            <CreditCard size={16} />
                          </div>
                          <input
                            type="text"
                            maxLength={20}
                            value={registerData.genckartId}
                            onChange={(e) => setRegisterData({...registerData, genckartId: e.target.value})}
                            placeholder="Genç Kart ID"
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
                        <span className="font-normal" style={{ color: COLORS.turquoise }}>Kullanım Koşulları</span> ve{' '}
                        <span className="font-normal" style={{ color: COLORS.turquoise }}>Gizlilik Politikası</span>'nı okudum, kabul ediyorum.
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
                      className="w-full py-3.5 rounded-xl text-white font-semibold text-sm uppercase tracking-wide shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
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

