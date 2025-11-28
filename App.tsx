import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import WikiSection from './components/WikiSection';
import CommentSection from './components/CommentSection';
import ProfilePage from './components/profile/ProfilePage';
import ShareBox from './components/ShareBox';
import CreateContentPage from './components/CreateContentPage';
import LoginPage from './components/LoginPage';
import DiscoverFeed from './components/DiscoverFeed';
import { CoinNotificationProvider } from './components/CoinNotification';
import { NotificationProvider } from './contexts/NotificationContext';

interface HomePageProps {
  onLogout: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'discover' | 'topic'>('discover');

  return (
    <Layout onLogout={onLogout}>
      {/* Tab Navigation */}
      <div className="mb-6 flex items-center gap-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('discover')}
          className={`pb-3 px-4 font-bold transition-all ${
            activeTab === 'discover'
              ? 'text-[#00BFA5] border-b-2 border-[#00BFA5]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          🔥 Keşfet
        </button>
        <button
          onClick={() => setActiveTab('topic')}
          className={`pb-3 px-4 font-bold transition-all ${
            activeTab === 'topic'
              ? 'text-[#00BFA5] border-b-2 border-[#00BFA5]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          📖 Başlık Detay (Demo)
        </button>
      </div>

      {/* Content */}
      {activeTab === 'discover' ? (
        <>
          <ShareBox />
          <DiscoverFeed />
        </>
      ) : (
        <>
          <ShareBox />
          <WikiSection />
          <CommentSection />
        </>
      )}
    </Layout>
  );
};

// Korumalı Route bileşeni
interface ProtectedRouteProps {
  isLoggedIn: boolean;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // localStorage'dan giriş durumunu kontrol et
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <NotificationProvider>
      <CoinNotificationProvider>
        <Router>
          <Routes>
            <Route 
              path="/login" 
              element={
                isLoggedIn ? <Navigate to="/" replace /> : <LoginPage onLogin={handleLogin} />
              } 
            />
            <Route 
              path="/" 
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <HomePage onLogout={handleLogout} />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <ProfilePage onLogout={handleLogout} />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/create" 
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <CreateContentPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
      </CoinNotificationProvider>
    </NotificationProvider>
  );
};

export default App;
