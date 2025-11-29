import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ProfilePage from './components/profile/ProfilePage';
import UserProfilePage from './components/profile/UserProfilePage';
import ShareBox from './components/ShareBox';
import CreateContentPage from './components/CreateContentPage';
import LoginPage from './components/LoginPage';
import DiscoverFeed from './components/DiscoverFeed';
import ContentPage from './components/ContentPage';
import FacultiesPage from './components/FacultiesPage';
import SettingsPage from './components/settings/SettingsPage';
import MyContents from './components/MyContents';
import TopicDetailPage from './components/TopicDetailPage';
import Leaderboard from './components/Leaderboard';
import BadgeGallery from './components/BadgeGallery';
import TagCloud from './components/TagCloud';
import NotificationCenter from './components/notifications/NotificationCenter';
import FriendsPage from './components/social/FriendsPage';
import { CoinNotificationProvider } from './components/CoinNotification';
import { NotificationProvider } from './contexts/NotificationContext';

interface HomePageProps {
  onLogout: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'discover' | 'mycontents'>('discover');

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
          onClick={() => setActiveTab('mycontents')}
          className={`pb-3 px-4 font-bold transition-all ${
            activeTab === 'mycontents'
              ? 'text-[#00BFA5] border-b-2 border-[#00BFA5]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          📝 Benim İçeriklerim
        </button>
      </div>

      {/* Content */}
      {activeTab === 'discover' ? (
        <>
          <ShareBox />
          <DiscoverFeed />
        </>
      ) : (
        <MyContents />
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
            path="/user/:username" 
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <UserProfilePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/faculties" 
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Layout onLogout={handleLogout}>
                  <FacultiesPage />
                </Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SettingsPage onLogout={handleLogout} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/topic/:topicId" 
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <TopicDetailPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/leaderboard" 
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Leaderboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/badges" 
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <BadgeGallery />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/tags" 
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <TagCloud />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/notifications" 
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <NotificationCenter />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/friends" 
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <FriendsPage />
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
          <Route 
            path="/hukuk/:slug" 
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <ContentPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/kampus/:slug" 
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <ContentPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/sosyal/:slug" 
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <ContentPage />
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
